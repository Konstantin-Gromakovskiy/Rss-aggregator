import axios from 'axios';
import domParser from './domParser.js';

const rssRequest = (url) => {
  const proxyUrl = 'https://allorigins.hexlet.app/raw';
  const fullUrl = new URL(proxyUrl);
  fullUrl.search = `?url=${url}`;

  return axios.get(fullUrl)
    .then((response) => {
      if (response.headers['content-type'].includes('xml')) return domParser(response);
      throw new Error('its not rss');
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
export default rssRequest;
