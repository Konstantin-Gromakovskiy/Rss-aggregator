import renderError from './renderError.js';
import renderProcessing from './renderProcessing.js';
import postsRender from './postsRender.js';
import feedsRender from './feedsRender.js';

export default (state, elements) => (path, value) => {
  console.log(path);
  switch (path) {
    case 'errors':
      renderError(state, elements);
      break;
    case 'feeds':
      feedsRender(value, elements);
      break;
    case 'posts':
      postsRender(value, elements);
      break;
    case 'processing':
      renderProcessing(state, elements);
      break;

    default:
  }
};
