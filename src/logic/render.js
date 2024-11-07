const renderError = (state, input) => {
  const errorMessage = state.errors;
  if (errorMessage) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
};

export default (state, input) => (path, value, previosValue) => {
  switch (path) {
    case 'errors':
      renderError(state, input);
      break;
    default:
  }
};
