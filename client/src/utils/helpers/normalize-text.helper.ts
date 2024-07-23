const normalizeText = (htmlText: string): string | null => {
  const document = new DOMParser().parseFromString(htmlText, 'text/html');

  return document.body.textContent;
};

export default normalizeText;
