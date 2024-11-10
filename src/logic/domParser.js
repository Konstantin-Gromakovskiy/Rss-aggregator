export default (xmlDoc) => {
  console.log(xmlDoc);
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(xmlDoc.data, 'text/html');
  return htmlDocument;
};
