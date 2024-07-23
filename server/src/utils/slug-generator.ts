const generateUrlSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim() // Remove whitespace from both sides of the string
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphen
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters hyphen
    .replace(/_/g, '-') // Replace underscore (_) with hyphen
    .replace(/--+/g, '-'); // Replace multiple hyphen (-) with single hyphen
};

export default generateUrlSlug;
