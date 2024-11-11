export default (state, elements) => {
  const { postsContainer } = elements;
  const { resources } = state;
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

  resources.forEach((resource) => resource.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    postsList.appendChild(li);

    const href = post.link;
    const link = document.createElement('a');
    link.classList.add('fw-bold');
    link.href = href;
    link.target = '_blank';
    link.textContent = post.title;
    li.appendChild(link);

    const alertButton = document.createElement('button');
    alertButton.type = 'button';
    alertButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    alertButton.textContent = 'Просмотр';
    li.appendChild(alertButton);
  }));
};
