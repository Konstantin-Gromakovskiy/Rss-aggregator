import feedsRender from './feedsRender.js';
import postsRender from './postsRender.js';

export default (state, elements) => {
  feedsRender(state, elements);
  postsRender(state, elements);
};
