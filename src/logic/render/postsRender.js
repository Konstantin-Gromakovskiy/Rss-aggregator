export default (state, elements) => {
  const { postsContainer } = elements;
  postsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  postsContainer.appendChild(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const cardTitle = document.createElement('h4');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Посты';
  cardBody.appendChild(cardTitle);

  const postsList = document.createElement('ul');
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  card.appendChild(postsList);

  state.addedDocuments.forEach((rssDocument) => {
    const items = rssDocument.querySelectorAll('item');

    items.forEach((item) => {
      const post = document.createElement('li');
      post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      postsList.appendChild(post);

      const href = item.querySelector('link').nextSibling.textContent;
      const linkText = item.querySelector('title').textContent;
      const link = document.createElement('a');
      link.classList.add('fw-bold');
      link.href = href;
      link.textContent = linkText;
      post.appendChild(link);

      const alertButton = document.createElement('button');
      alertButton.type = 'button';
      alertButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      alertButton.textContent = 'Просмотр';
      post.appendChild(alertButton);
    });
  });
};
