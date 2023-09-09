import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import {
  FULL_IMAGES_PATH,
  THUMB_IMAGES_PATH,
  JPG_EXTENSION,
} from '../constants/constants';
import { ImageInformation } from '../interfaces/FileInformation';

export const resize = async (image: ImageInformation): Promise<Buffer> => {
  const fullPath = `${path.resolve(
    __dirname,
    `${FULL_IMAGES_PATH}/${image.filename}.jpg`,
  )}`;
  const thumbPath = `${path.resolve(
    __dirname,
    `${THUMB_IMAGES_PATH}/${image.filename}-${image.height}x${image.width}.jpg`,
  )}`;

  const file: Buffer | null = await fs.readFile(fullPath).catch(() => null);

  if (!file) {
    return Promise.reject('file not found!!');
  }

  const imageBuffer: Buffer | null = await sharp(file)
    .resize(image.width, image.height)
    .toFormat('jpg')
    .toBuffer()
    .catch(() => null);

  if (!imageBuffer) {
    return Promise.reject('Can not resize image!!');
  }

  return fs
    .writeFile(thumbPath, imageBuffer)
    .then(() => imageBuffer)
    .catch(() => Promise.reject('Can not write file!!'));
};

export const getImagePath = (image: ImageInformation): string => {
  if (!image) {
    return '';
  }
  return `${path.resolve(
    __dirname,
    `${FULL_IMAGES_PATH}/${image.filename}${JPG_EXTENSION}`,
  )}`;
};
