import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import render from './render/mainRender.js';
import resources from '../i18next/resources.js';
import domParser from './domParser.js';

const addProxy = (url) => {
  const proxy = 'https://allorigins.hexlet.app/raw';
  const urlWithProxy = new URL(proxy);
  urlWithProxy.searchParams.append('url', url);
  return urlWithProxy;
};

const app = () => {
  const initialState = {
    errors: '',
    processing: 'filling', // sending, editing
    feeds: [],
    posts: [],
    openedPostId: null,
    viewedPostId: null,
  };

  const elements = {
    form: document.querySelector('form'),
    button: document.querySelector('[type="submit"]'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modalContainer: document.querySelector('.modal-content'),
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    resources,
  })
    .then(() => {
      const state = onChange(initialState, render(elements, initialState));

      const interval = (f, timer) => {
        setTimeout(() => {
          Promise.resolve().then(() => f())
            .then(() => interval(f, timer));
        }, timer);
      };
      const reWritePosts = () => {
        const addedResources = state.feeds.map((feed) => feed.resource);
        if (addedResources.length === 0) return;
        const requests = addedResources
          .map((resource) => {
            const resourceWithProxy = addProxy(resource);
            return axios.get(resourceWithProxy)
              .then((request) => domParser(request.data, state.posts))
              .catch((error) => {
                throw error;
              });
          });
        Promise.all(requests).then((results) => {
          const allPosts = results.flatMap(({ posts }) => posts);
          const allPostsWithId = allPosts
            .map((post, index) => ({ ...post, id: state.posts.length + index }));
          const newPosts = allPostsWithId
            .filter((post) => !state.posts.find((addedPost) => addedPost.link === post.link));
          state.posts = [...newPosts, ...state.posts];
        })
          .catch((error) => {
            state.errors = i18n.t(error.message);
          });
      };

      interval(reWritePosts, 5000);

      elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const url = formData.get('url');
        const addedResources = state.feeds.map((feed) => feed.resource);
        const urlSchema = yup.string().url().notOneOf(addedResources);

        urlSchema.validate(url)
          .then(() => {
            state.processing = 'sending';
            state.errors = '';
            const urlWithProxy = addProxy(url);
            return axios.get(urlWithProxy);
          })
          .then((response) => {
            const { feed, posts } = domParser(response.data, state.posts);
            feed.resource = url;
            feed.id = state.feeds.length;
            state.feeds = [feed, ...state.feeds];
            const newPostsWithId = posts
              .map((post, index) => ({ ...post, id: state.posts.length + index }));
            state.posts = [...newPostsWithId, ...state.posts];
            state.processing = 'filling';
          })
          .catch((error) => {
            state.processing = 'editing';
            state.errors = error.name === 'ValidationError' ? i18n.t(error.type) : i18n.t(error.message);
          });
      });

      elements.postsContainer.addEventListener('click', (event) => {
        if (!event.target.dataset.id) return;
        const postId = Number(event.target.dataset.id);
        state.viewedPostId = postId;

        if (event.target.type === 'button') {
          state.openedPostId = postId;
        }
      });
    });
};

export default app;
