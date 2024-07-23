import * as DOMPurify from 'dompurify';

const cleanHTML = (rawHTML: string): string => DOMPurify.sanitize(rawHTML);

export default cleanHTML;
