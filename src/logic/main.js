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
    newPosts: [],
  };

  const elements = {
    form: document.querySelector('form'),
    button: document.querySelector('[type="submit"]'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
  };
  console.dir(elements.postsContainer);

  console.dir(Boolean(elements.postsContainer.firstChild));

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    resources,
  });

  const state = onChange(initialState, render(initialState, elements));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');
    state.url = url;

    const urlSchema = yup.string().url().notOneOf(state.feeds.map((feed) => feed.link));

    urlSchema.validate(state.url)
      .then(() => {
        state.processing = 'sending';
        state.errors = '';
        const documentData = rssRequest(state.url)
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
        state.posts = [...state.posts, ...postsWithId];
        state.newPosts = postsWithId;
        console.log(postsWithId);
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
