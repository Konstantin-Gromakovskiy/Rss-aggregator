export default (errorText, elements, value) => {
  const { feedback } = elements;
  const { input } = elements;

  if (value) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = errorText;
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  }
};
