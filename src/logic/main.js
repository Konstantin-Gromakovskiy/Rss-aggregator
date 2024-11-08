import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render.js';
import resources from '../i18next/resources.js';

const app = () => {
  const initialState = {
    url: '',
    errors: '',
    processing: 'filling',
    validation: null,
    addedUrl: [],
  };

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
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
        state.errors = '';
        state.addedUrl.push(url);
        state.validation = true;
        elements.form.reset();
        elements.input.focus();
        console.log(initialState.addedUrl);
      })
      .catch((error) => {
        state.errors = i18n.t(error.type);
        state.validation = false;
      });
  });
};
export default app;
