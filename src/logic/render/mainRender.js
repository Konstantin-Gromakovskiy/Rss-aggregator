import renderError from './renderError.js';
import renderProcessing from './renderProcessing.js';
import postsRender from './postsRender.js';
import feedsRender from './feedsRender.js';

export default (elements) => (path, value, previousValue) => {
  switch (path) {
    case 'errors':
      renderError(value, elements);
      break;
    case 'feeds':
      feedsRender(value, elements);
      break;
    case 'posts':
      postsRender(value, previousValue, elements);
      break;
    case 'processing':
      renderProcessing(value, elements);
      break;

    default:
  }
};
