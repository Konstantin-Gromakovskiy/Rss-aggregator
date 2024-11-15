export default (xmlDoc, addedPosts, addedFeeds = null, url = null) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlDoc, 'text/xml');
  const feed = {};

  if (addedFeeds) {
    const feedId = addedFeeds.length;
    const channelTitle = document.querySelector('channel > title').textContent.replace(/((<!)?\[CDATA\[)| ?(\]\]>?$)/mg, '');
    const channelDescription = document.querySelector('channel > description') ? document.querySelector('channel > description').textContent : '';
    const channelLink = document.querySelector('channel > link').textContent;
    feed.title = channelTitle;
    feed.description = channelDescription;
    feed.link = channelLink;
    feed.resource = url;
    feed.id = feedId;
  }

  const items = document.querySelectorAll('item');
  const itemsArr = Array.from(items);
  const newPostsElems = itemsArr
    .filter((post) => !addedPosts.find((addedPost) => addedPost.link === post.querySelector('link').textContent));

  if (newPostsElems.length === 0) return { feed, newPosts: [] };
  const newPosts = newPostsElems.map((item, index) => {
    const title = item.querySelector('title');
    console.dir(item);
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

  return { feed, newPosts };
};
