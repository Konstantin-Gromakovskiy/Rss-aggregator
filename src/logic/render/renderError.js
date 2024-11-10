export default (state, elements) => {
  const { feedback } = elements;
  const { input } = elements;
  const { errors } = state;
  if (errors) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = state.errors;
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  }
};
