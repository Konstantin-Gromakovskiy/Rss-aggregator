export default (error, elements) => {
  const { feedback } = elements;
  const { input } = elements;
  if (error) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = error;
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  }
};
