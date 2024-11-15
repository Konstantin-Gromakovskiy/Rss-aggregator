import axios from 'axios';

export default (url) => {
  const proxyUrl = 'https://allorigins.hexlet.app/raw';
  const fullUrl = new URL(proxyUrl);
  fullUrl.search = `?url=${url}`;
  return axios.get(fullUrl)
    .then((response) => {
      const xmlDocument = response.data;
      if (response.headers['content-type'].includes('xml')) return xmlDocument;
      throw new Error('its not rss');
    })
    .catch((error) => {
      throw error;
    });
};
