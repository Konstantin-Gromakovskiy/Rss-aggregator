import renderError from './renderError.js';
import renderDocuments from './dataRender.js';
import renderProcessing from './renderProcessing.js';

export default (state, elements) => (path) => {
  switch (path) {
    case 'errors':
      renderError(state, elements);
      break;
    case 'addedDocuments':
      renderDocuments(state, elements);
      break;
    case 'processing':
      renderProcessing(state, elements);
      break;
    default:
  }
};
