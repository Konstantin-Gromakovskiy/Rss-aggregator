import renderError from './renderError.js';
import renderProcessing from './renderProcessing.js';
import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderReadPost from './renderReadPost.js';
import putPostInModal from './putPostInModal.js';

export default (elements, state, i18n) => (path, value, previousValue) => {
  const clickedPost = state.posts.find((post) => Number(post.id) === value);
  const mapping = {
    feeds: () => renderFeeds(value, previousValue, elements.feedsContainer),
    posts: () => renderPosts(value, previousValue, elements.postsContainer),
    processing: () => renderProcessing(value, elements),
    viewedPostId: () => renderReadPost(value, elements.postsContainer),
    openedPostId: () => putPostInModal(clickedPost, elements.modalContainer),
    error: () => renderError(value, elements, i18n),
  };

  mapping[path]();
};
