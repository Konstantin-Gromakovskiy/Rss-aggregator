const renderFeeds = (state, elements, i18n) => {
  const { feeds } = state;
  const { feedsContainer } = elements;
  const feed = feeds[feeds.length - 1];

  if (feedsContainer.innerHTML === '') {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    feedsContainer.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = i18n.t('otherTexts.feeds');
    cardBody.appendChild(cardTitle);

    const feedsList = document.createElement('ul');
    feedsList.classList.add('list-group', 'border-0', 'rounded-0');
    card.appendChild(feedsList);
  }

  const feedsList = feedsContainer.querySelector('ul');
  const feedElem = document.createElement('li');
  feedElem.classList.add('list-group-item', 'border-0', 'border-end-0');
  feedsList.appendChild(feedElem);

  const feedTitle = document.createElement('h3');
  feedTitle.classList.add('h6', 'm-0');
  feedTitle.textContent = feed.title;
  feedElem.appendChild(feedTitle);

  const feedDescription = document.createElement('p');
  feedDescription.classList.add('m-0', 'small', 'text-black-50');
  feedDescription.textContent = feed.description;
  feedElem.appendChild(feedDescription);
};

const renderPosts = (state, elements, i18n) => {
  const { posts } = state;
  const { viewedPostIds } = state;
  const { postsContainer } = elements;

  if (!postsContainer.firstChild) {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    postsContainer.appendChild(card);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = i18n.t('otherTexts.posts');
    cardBody.appendChild(cardTitle);

    const postsList = document.createElement('ul');
    postsList.classList.add('list-group', 'border-0', 'rounded-0');
    card.appendChild(postsList);
  }

  const postsList = document.querySelector('ul');
  postsList.innerHTML = '';
  [...posts].reverse().forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    postsList.prepend(li);

    const href = post.link;
    const link = document.createElement('a');
    link.dataset.id = post.id;

    if (viewedPostIds.includes(post.id)) link.classList.add('fw-normal', 'link-secondary');
    else link.classList.add('fw-bold');

    link.href = href;
    link.target = '_blank';
    link.textContent = post.title;
    li.append(link);

    const alertButton = document.createElement('button');
    alertButton.type = 'button';
    alertButton.dataset.id = post.id;
    alertButton.dataset.bsToggle = 'modal';
    alertButton.dataset.bsTarget = '#modal';
    alertButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    alertButton.textContent = i18n.t('otherTexts.preview');
    li.append(alertButton);
  });
};

const renderStatuses = (state, elements, i18n) => {
  const { input } = elements;
  const { button } = elements;
  const { feedback } = elements;
  const { error } = state;
  const { status } = state;

  switch (status) {
    case 'success':
      elements.form.reset();
      elements.input.focus();
      input.readOnly = false;
      button.disabled = false;
      feedback.textContent = i18n.t('otherTexts.success');
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      break;
    case 'sending':
      input.readOnly = true;
      button.disabled = true;
      break;
    case 'failed':
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = i18n.t(`errors.${error}`);
      input.readOnly = false;
      button.disabled = false;
      elements.input.focus();
      break;
    default: throw new Error('Unknown processing state');
  }
};

const renderReadPost = (state, elements) => {
  const { viewedPostIds } = state;
  const { postsContainer } = elements;
  viewedPostIds.forEach((id) => {
    const post = postsContainer.querySelector(`[data-id="${id}"]`);
    post.classList.remove('fw-bold');
    post.classList.add('fw-normal', 'link-secondary');
  });
};

const putPostInModal = (state, elements) => {
  const { modalContainer } = elements;
  const { modalPostId } = state;
  const post = state.posts.find((p) => p.id === modalPostId);

  const modalHeader = modalContainer.querySelector('.modal-header');
  const modalBody = modalContainer.querySelector('.modal-body');
  const readMoreButton = modalContainer.querySelector('a');
  const h5 = document.querySelector('h5');

  h5.textContent = post.title;
  modalHeader.prepend(h5);
  modalBody.textContent = post.description;

  readMoreButton.href = post.link;
};

export default (elements, state, i18n) => (path) => {
  if (path === 'error') return;

  const mapping = {
    feeds: () => renderFeeds(state, elements, i18n),
    posts: () => renderPosts(state, elements, i18n),
    status: () => renderStatuses(state, elements, i18n),
    viewedPostIds: () => renderReadPost(state, elements),
    modalPostId: () => putPostInModal(state, elements),
  };

  mapping[path]();
};
