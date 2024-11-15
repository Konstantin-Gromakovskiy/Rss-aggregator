export default (postId, postsContainer) => {
  const post = postsContainer.querySelector(`[data-id="${postId}"]`);
  post.classList.add('fw-normal', 'link-secondary');
  post.classList.remove('fw-bold');
};
