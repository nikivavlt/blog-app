import { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const upload = (request: Request, response: Response): void => {
  if (request.files === null) {
    response.status(400).json('No file uploaded');
    return;
  }

  const { image } = request.files;

  const fileName = Date.now() + (image.name).toLowerCase(); // + '.jpg'
  const __dirname = dirname(fileURLToPath(import.meta.url));
  image.mv(path.join(__dirname, '..', 'uploads', fileName), (error) => {
    if (error !== null) return response.status(400).json('Error');

    return response.status(200).json(fileName);
  });

  // const newArticleWithImage = new Article({ imageUrl: fileName}) // save image in article UPDATE url in frontend or backend
  // or create utils function to handle this

  // return response.status(500).json('File upload failed'); // change this
};

export default upload;
