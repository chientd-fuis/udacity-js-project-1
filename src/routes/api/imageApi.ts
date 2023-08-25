import { Request, Response, Router } from 'express';
import express from 'express';
import {
  ImageInformation,
  ImageInformationRequest,
} from '../../utils/interfaces/FileInformation';
import { validateImage } from '../../utils/functions/validations';
import { resize } from '../../utils/functions/file';

const imageApi: Router = express.Router();

imageApi.get('/', async (req: Request, res: Response) => {
  const imageReq: ImageInformationRequest = req.query;
  const error = await validateImage(imageReq);
  if (error != null) {
    res.status(error.code).send(error.message);
    return;
  }
  const img = {
    filename: imageReq.filename,
    width: Number.parseInt(imageReq.width || '0'),
    height: Number.parseInt(imageReq.height || '0'),
  } as ImageInformation;

  await resize(img as ImageInformation)
    .then((resizedImage: Buffer) => {
      res.status(200).contentType('jpg').send(resizedImage);
    })
    .catch((e) => {
      console.log('ERROR: ' + e);
      res.status(500).send('Error occured when processing the image');
    });
});

export default imageApi;
