export default (value, elements, i18n) => {
  const { feedback } = elements;
  const { input } = elements;

  if (value) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = i18n.t(value);
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  }
};
