export default (xmlDoc) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlDoc, 'text/xml');

  const channelTitle = document.querySelector('channel > title').textContent.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, '');
  const channelDescription = document.querySelector('channel > description') ? document.querySelector('channel > description').textContent : '';
  const channelLink = document.querySelector('channel > link').textContent;
  const feed = {
    title: channelTitle,
    description: channelDescription,
    link: channelLink,
  };

  const items = document.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
    const title = item.querySelector('title');
    const description = item.querySelector('description') ? item.querySelector('description').textContent : '';
    const link = item.querySelector('link');
    const pubDate = item.querySelector('pubDate');

    return {
      title: title.textContent.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, ''),
      description: description.textContent,
      link: link.textContent,
      pubDate: pubDate.textContent,
    };
  });

  return { feed, posts };
};
