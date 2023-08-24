import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { FULL_IMAGES_PATH, THUMB_IMAGES_PATH } from '../constants/constants';
import { ImageInformation } from '../interfaces/FileInformation';


export const resize = async (image: ImageInformation): Promise<Buffer> => {
    const fullPath = `${path.resolve(__dirname, `${FULL_IMAGES_PATH}/${image.filename}.jpg`)}`;
    const thumbPath = `${path.resolve(__dirname, `${THUMB_IMAGES_PATH}/${image.filename}-${image.height}x${image.width}.jpg`)}`;
    console.log(fullPath);
    console.log(thumbPath);
    const file: Buffer | null = await fs.readFile(fullPath).catch(() => null);

    if (!file) {
        return Promise.reject();
    }
    const imageBuffer: Buffer | null = await sharp(file)
        .resize(image.width, image.height)
        .toBuffer()
        .catch(() => null);
        
    if (!imageBuffer) {
        return Promise.reject();
    }
    
    return fs.writeFile(thumbPath, imageBuffer).then(() =>  imageBuffer).catch(() => Promise.reject());
};

export const getImagePath = (image: ImageInformation): string => {
    return image.width && image.height
    ? `${path.resolve(__dirname, `${THUMB_IMAGES_PATH}/${image.filename}-${image.height}x${image.width}.jpg`)}`
    : `${path.resolve(__dirname, `${FULL_IMAGES_PATH}/${image.filename}.jpg`)}`;
}