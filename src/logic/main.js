import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render/mainRender.js';
import resources from '../i18next/resources.js';
import rssRequest from './rssRequest.js';
import domParser from './domParser.js';

const app = () => {
  const initialState = {
    url: '',
    errors: '',
    processing: 'filling', // sending, sent, editing
    validation: null,
    feeds: [],
    posts: [],
    addedResources: [],
  };

  const elements = {
    form: document.querySelector('form'),
    button: document.querySelector('[type="submit"]'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    resources,
  });

  const state = onChange(initialState, render(elements));

  const interval = (f, timer) => {
    setTimeout(() => {
      f();
      interval(f, timer);
    }, timer);
  };
  const reWritePosts = () => {
    const { addedResources } = state;
    if (addedResources.length === 0) return;
    addedResources.forEach((resource) => {
      rssRequest(resource)
        .then((xmlDoc) => {
          const { posts: newPosts } = domParser(xmlDoc);
          state.posts = [...state.posts, ...newPosts];
        });
    });
  };
  interval(reWritePosts, 5000);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');

    const urlSchema = yup.string().url().notOneOf(state.addedResources);

    urlSchema.validate(url)
      .then(() => {
        state.processing = 'sending';
        state.errors = '';
        state.addedResources.push(url);
        const documentData = rssRequest(url)
          .catch((error) => {
            console.log(error);
            throw new Error(error.message);
          });
        return documentData;
      })
      .then((documentData) => {
        const { feed, posts } = domParser(documentData);
        const feedWithId = { ...feed, id: state.feeds.length };
        state.feeds = [feedWithId, ...state.feeds];
        const postsWithId = posts
          .map((post) => ({ ...post, id: state.posts.length, feedId: feedWithId.id }));
        state.posts = [...postsWithId, ...state.posts];
        state.processing = 'filling';
      })
      .catch((error) => {
        console.log(error);
        state.processing = 'editing';
        state.errors = error.name === 'ValidationError' ? i18n.t(error.type) : i18n.t(error.message);
        state.validation = false;
      });
  });
};
export default app;
