import renderError from './renderError.js';
import renderProcessing from './renderProcessing.js';
import dataRender from './dataRender.js';

export default (state, elements) => (path) => {
  switch (path) {
    case 'errors':
      renderError(state, elements);
      break;
    case 'resources':
      dataRender(state, elements);
      break;
    case 'processing':
      renderProcessing(state, elements);
      break;
    default:
  }
};
