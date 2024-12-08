import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import uniqueId from 'lodash.uniqueid';
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
    error: {
      notOneOf: false,
      url: false,
      networkError: false,
      AxiosError: false,
      ParseError: false,
      unknownError: false,
    },
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
  }).then(() => {
    const state = onChange(initialState, render(elements, initialState, i18n));

    const interval = () => {
      setTimeout(() => {
        const addedResources = state.feeds.map((feed) => feed.resource);
        if (addedResources.length === 0) interval();
        else {
          const axiosRequests = addedResources.map((resource) => {
            const resourceWithProxy = addProxy(resource);
            return axios.get(resourceWithProxy);
          });
          Promise.all(axiosRequests)
            .then((requests) => {
              const results = requests.map((request) => domParser(request.data));
              const allPosts = results.flatMap(({ posts }) => posts);
              const newPosts = allPosts
                .filter((post) => !state.posts.find((addedPost) => addedPost.link === post.link));
              const newPostsWithId = newPosts.map((post) => ({ ...post, id: uniqueId() }));
              state.posts = [...newPostsWithId, ...state.posts];
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => interval());
        }
      }, 5000);
    };

    interval();

    elements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const url = formData.get('url');
      const urlSchema = yup.string().url().notOneOf(state.feeds.map((feed) => feed.resource));

      urlSchema.validate(url)
        .then(() => {
          state.processing = 'sending';
          Object.keys(state.error).forEach((key) => { state.error[key] = false; });
          const urlWithProxy = addProxy(url);
          return axios.get(urlWithProxy);
        })
        .then((response) => {
          const { feed, posts } = domParser(response.data);
          feed.resource = url;
          feed.id = uniqueId();
          state.feeds = [feed, ...state.feeds];
          const newPostsWithId = posts
            .map((post) => ({ ...post, id: uniqueId() }));
          state.posts = [...newPostsWithId, ...state.posts];
          state.processing = 'filling';
        })
        .catch((error) => {
          state.processing = 'editing';
          if (error.name === 'ValidationError') state.error[error.type] = true;
          else if (['networkError', 'AxiosError', 'ParseError'].includes(error.name)) state.error[error.name] = true;
          else state.error.unknownError = true;
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
