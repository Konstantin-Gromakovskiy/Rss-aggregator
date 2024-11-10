export default (state, elements) => {
  const feedbackElem = elements.feedback;
  const inputElem = elements.input;
  const errorMessage = state.errors;
  if (errorMessage) {
    inputElem.classList.add('is-invalid');
    feedbackElem.textContent = state.errors;
  } else {
    inputElem.classList.remove('is-invalid');
    feedbackElem.textContent = '';
  }
};
