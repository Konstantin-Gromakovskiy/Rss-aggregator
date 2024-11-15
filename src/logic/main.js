import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render/mainRender.js';
import resources from '../i18next/resources.js';
import rssRequest from './rssRequest.js';
import domParser from './domParser.js';

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
  });

  const state = onChange(initialState, render(elements, initialState));

  const interval = (f, timer) => {
    setTimeout(() => {
      f();
      interval(f, timer);
    }, timer);
  };
  const reWritePosts = () => {
    const addedResources = state.feeds.map((feed) => feed.resource);
    if (addedResources.length === 0) return;
    const requests = addedResources
      .map((resource) => rssRequest(resource).then((xmlDoc) => domParser(xmlDoc, state.posts)));
    Promise.all(requests).then((results) => {
      const posts = results.flatMap(({ newPosts }) => newPosts);
      state.posts = [...posts, ...state.posts];
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
        return rssRequest(url);
      })
      .then((documentData) => {
        const { feed, newPosts } = domParser(documentData, state.posts, state.feeds, url);
        state.feeds = [feed, ...state.feeds];
        state.posts = [...newPosts, ...state.posts];
        state.processing = 'filling';
      })
      .catch((error) => {
        console.log(error);
        state.processing = 'editing';
        state.errors = error.name === 'ValidationError' ? i18n.t(error.type) : i18n.t(error.message);
        state.validation = false;
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
};

export default app;
