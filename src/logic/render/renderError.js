export default (error, elements, i18n) => {
  const { feedback } = elements;
  const { input } = elements;
  if (error) {
    const errorMassage = error.name === 'ValidationError' ? error.type : error.name;
    const i18 = i18n.t(errorMassage);
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = i18;
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  }
};
