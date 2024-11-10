export default (state, elements) => {
  const { processing } = state;
  const { input } = elements;
  const { button } = elements;

  switch (processing) {
    case 'filling':
      elements.form.reset();
      elements.input.focus();
      input.readOnly = false;
      button.disabled = false;
      break;
    case 'sending':
      input.readOnly = true;
      button.disabled = true;
      break;
    case 'editing':
      input.readOnly = false;
      button.disabled = false;
      elements.input.focus();
      break;
    default: throw new Error('Unknown processing state');
  }
};
