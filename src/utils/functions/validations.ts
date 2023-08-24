import { ImageInformation } from "../interfaces/FileInformation"
import fs from 'fs/promises';
import { Stats } from "fs";
import { getImagePath } from "./file";
import { Error } from "../interfaces/Error";

export const validateImage = async (image: ImageInformation): Promise<Error | null> => {
    if(!image.filename){
        return {code: 404, message: "filename is missing!!!"};
    } 
    if(!image.width){
        return {code: 404, message: "width is missing!!!"};
    } 
    if(!image.height){
        return {code: 404, message: "height is missing!!!"};
    } 
    console.log(getImagePath(image))
    const fullImage: Error | Stats = await fs.stat(getImagePath(image)).catch(() => {
        return {code: 400, message: "filename is invalid!!!"};
    });
    if(!fullImage){
        return {code: 400, message: "filename is invalid!!!"};
    }

    if(Number.isNaN(image.width) || image.width <0) {
        return {code: 400, message: "width is invalid!!!"};
    }

    if(Number.isNaN(image.height) || image.height <0) {
        return {code: 400, message: "height is invalid!!!"};
    }
    
    return null;
}