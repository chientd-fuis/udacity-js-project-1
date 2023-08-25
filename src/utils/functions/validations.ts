import {
  ImageInformation,
  ImageInformationRequest,
} from '../interfaces/FileInformation';
import fs from 'fs';
import { getImagePath } from './file';
import { Error } from '../interfaces/Error';

export const validateImage = async (
  image: ImageInformationRequest,
): Promise<Error | null> => {
  if (!image.filename) {
    return { code: 404, message: 'filename is missing!!!' };
  }
  if (!image.width) {
    return { code: 404, message: 'width is missing!!!' };
  }
  if (!image.height) {
    return { code: 404, message: 'height is missing!!!' };
  }
  const img = {
    filename: image.filename,
    width: 0,
    height: 0,
  } as ImageInformation;

  const isExist: boolean = await fs.existsSync(getImagePath(img));
  if (!isExist) {
    return { code: 400, message: 'filename is invalid!!!' };
  }

  if (Number.isNaN(Number(image.width))) {
    return { code: 400, message: 'width is invalid!!!' };
  } else if (Number.parseInt(image.width) < 0) {
    return { code: 400, message: 'width must be positive number!!!' };
  }

  if (Number.isNaN(Number(image.height))) {
    return { code: 400, message: 'height is invalid!!!' };
  } else if (Number.parseInt(image.height) < 0) {
    return { code: 400, message: 'height must be positive number!!!' };
  }

  return null;
};
