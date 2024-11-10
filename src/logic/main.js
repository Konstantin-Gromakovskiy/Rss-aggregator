import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render/mainRender.js';
import resources from '../i18next/resources.js';
import rssRequest from './rssRequest.js';

const app = () => {
  const initialState = {
    url: '',
    errors: '',
    processing: 'filling', // sending, sent
    validation: null,
    addedUrl: [],
    addedDocuments: [],
    rssList: '',
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

  const state = onChange(initialState, render(initialState, elements));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get('url');
    state.url = url;
    const urlSchema = yup.string().url().notOneOf(initialState.addedUrl);
    urlSchema.validate(state.url)
      .then(() => {
        state.processing = 'sending';
        state.errors = '';
        return rssRequest(state.url)
          .catch((error) => {
            throw new Error(error.message);
          });
      })
      .then((documentData) => {
        state.addedUrl.push(url);
        state.addedDocuments.push(documentData);
        state.processing = 'filling';
      })
      .catch((error) => {
        state.processing = 'editing';
        state.errors = error.name === 'ValidationError' ? i18n.t(error.type) : i18n.t(error.message);
        state.validation = false;
      });
  });
};
export default app;
