export default (state, elements) => {
  const { feedsContainer } = elements;
  feedsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  feedsContainer.appendChild(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const cardTitle = document.createElement('h4');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';
  cardBody.appendChild(cardTitle);

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  card.appendChild(feedsList);

  state.addedDocuments.forEach((rssDocument) => {
    const feedElem = document.createElement('li');
    feedElem.classList.add('list-group-item', 'border-0', 'border-end-0');
    feedsList.appendChild(feedElem);

    const channelTitle = rssDocument.querySelector('channel > title').textContent;
    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = channelTitle.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, '');
    feedElem.appendChild(feedTitle);

    const channelDescription = rssDocument.querySelector('channel > description').firstChild.textContent;
    console.dir(rssDocument.querySelector('channel > description').firstChild);
    const feedDescription = document.createElement('p');
    feedDescription.classList.add('m-0', 'small', 'text-black-50');
    feedDescription.textContent = channelDescription.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, '');
    feedElem.appendChild(feedDescription);
  });
};