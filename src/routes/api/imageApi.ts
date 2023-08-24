import { Request, Response, Router } from "express";
import express from 'express';
import { ImageInformation } from "../../utils/interfaces/FileInformation";
import { validateImage } from "../../utils/functions/validations";
import { resize } from "../../utils/functions/file";

const imageApi: Router = express.Router();

imageApi.get('/', async (req: Request, res: Response) => {

    const image: ImageInformation = req.query;
    const error = await validateImage(image);
    if(error != null) {
        res.status(error.code).send(error.message);
    }
    await resize(image).then((resizedImage: Buffer) => {
        console.log(resizedImage)
        res.status(200).contentType('jpg').send(resizedImage);
    })
    .catch(() => {
        res.status(500).send('Error occured processing the image');
    });


})

export default imageApi;