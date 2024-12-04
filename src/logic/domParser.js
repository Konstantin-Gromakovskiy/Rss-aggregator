export default (document) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(document, 'text/xml');
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.name = 'ParseError';
    throw error;
  }
  const feed = {};

  const channelTitle = xmlDoc.querySelector('channel > title').textContent;
  const channelDescription = xmlDoc.querySelector('channel > description')?.textContent || '';
  feed.title = channelTitle;
  feed.description = channelDescription;

  const items = xmlDoc.querySelectorAll('item');
  const newPostsElems = Array.from(items);

  const posts = newPostsElems.map((item) => {
    const post = {
      title: item.querySelector('title').textContent,
      description: item.querySelector('description') ? item.querySelector('description').textContent : '',
      link: item.querySelector('link').textContent,
      pubDate: item.querySelector('pubDate').textContent,
    };
    return post;
  });

  return { feed, posts };
};
