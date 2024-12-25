export default (status, elements, error, i18n) => {
  const { input } = elements;
  const { button } = elements;
  const { feedback } = elements;

  switch (status) {
    case 'success':
      elements.form.reset();
      elements.input.focus();
      input.readOnly = false;
      button.disabled = false;
      feedback.textContent = i18n.t('otherTexts.success');
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      break;
    case 'sending':
      input.readOnly = true;
      button.disabled = true;
      break;
    case 'failed':
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = i18n.t(`errors.${error}`);
      input.readOnly = false;
      button.disabled = false;
      elements.input.focus();
      break;
    default: throw new Error('Unknown processing state');
  }
};
