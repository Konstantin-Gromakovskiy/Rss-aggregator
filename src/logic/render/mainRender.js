import renderError from './renderError.js';
import renderProcessing from './renderProcessing.js';
import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderReadPost from './renderReadPost.js';
import putPostInModal from './putPostInModal.js';

export default (elements, state) => (path, value, previousValue) => {
  switch (path) {
    case 'errors':
      renderError(value, elements);
      break;
    case 'feeds':
      renderFeeds(value, elements.feedsContainer);
      break;
    case 'posts':
      renderPosts(value, previousValue, elements.postsContainer);
      break;
    case 'processing':
      renderProcessing(value, elements);
      break;
    case 'viewedPostId':
      renderReadPost(value, elements.postsContainer);
      break;
    case 'openedPostId': {
      const clickedPost = state.posts.find((post) => Number(post.id) === value);
      putPostInModal(clickedPost, elements.modalContainer);
      break;
    }
    default: throw new Error('Unknown path');
  }
};
