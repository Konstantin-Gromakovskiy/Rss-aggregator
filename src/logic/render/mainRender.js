import renderStatuses from './renderStatuses.js';
import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderReadPost from './renderReadPost.js';
import putPostInModal from './putPostInModal.js';

export default (elements, state, i18n) => (path, value, previousValue) => {
  if (path === 'error') return;
  const clickedPost = state.posts.find((post) => Number(post.id) === value);
  const mapping = {
    feeds: () => renderFeeds(value, previousValue, elements.feedsContainer, i18n),
    posts: () => renderPosts(value, previousValue, elements.postsContainer, i18n),
    status: () => renderStatuses(value, elements, state.error, i18n),
    viewedPostId: () => renderReadPost(value, elements.postsContainer),
    openedPostId: () => putPostInModal(clickedPost, elements.modalContainer),
  };

  mapping[path]();
};
