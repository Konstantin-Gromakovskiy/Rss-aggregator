export default (document, addedPosts) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(document, 'text/xml');
  if (xmlDoc.querySelector('parsererror')) throw new Error('its not rss');
  const feed = {};

  const channelTitle = xmlDoc.querySelector('channel > title').textContent.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, '');
  const channelDescription = xmlDoc.querySelector('channel > description') ? xmlDoc.querySelector('channel > description').textContent : '';
  const channelLink = xmlDoc.querySelector('channel > link').textContent;
  feed.title = channelTitle;
  feed.description = channelDescription;
  feed.link = channelLink;

  const items = xmlDoc.querySelectorAll('item');
  const itemsArr = Array.from(items);
  const newPostsElems = itemsArr;

  const posts = newPostsElems.map((item, index) => {
    const title = item.querySelector('title');
    const description = item.querySelector('description') ? item.querySelector('description').textContent : '';
    const link = item.querySelector('link');
    const pubDate = item.querySelector('pubDate');
    const postId = addedPosts.length + index;

    const post = {
      title: title.textContent.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, ''),
      description: description.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, ''),
      link: link.textContent,
      pubDate: pubDate.textContent,
      id: postId,
    };
    return post;
  });

  return { feed, posts };
};
