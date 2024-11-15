export default (post, modalContainer) => {
  const modalHeader = modalContainer.querySelector('.modal-header');
  const modalBody = modalContainer.querySelector('.modal-body');
  const readMoreButton = modalContainer.querySelector('a');
  const h5 = document.querySelector('h5');

  h5.textContent = post.title;
  modalHeader.prepend(h5);
  modalBody.textContent = post.description;

  readMoreButton.href = post.link;
};
