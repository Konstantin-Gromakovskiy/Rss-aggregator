import * as yup from 'yup';
import onChange from 'on-change';
import render from './render.js';

const app = () => {
  const initialState = {
    url: '',
    errors: '',
    processing: 'filling',
    validation: null,
    addedUrl: [],
  };

  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');

  const state = onChange(initialState, render(initialState, input));

  form.addEventListener('submit', (event) => {
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
        form.reset();
        input.focus();
        console.log(initialState.addedUrl);
      })
      .catch((error) => {
        state.errors = error.message;
        state.validation = false;
        console.log(error.message);
      });
  });
};
export default app;
