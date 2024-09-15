import fs from 'fs';
import path from 'path';

export const PATH_FOLDER = path.resolve('./front/images'); //path to images folder

/**
 * Get id image and delete file from images folder
 * @param id for delete image by id
 */
export function deleteFile(id: number) {
    fs.unlink(`${PATH_FOLDER}\\${id}.jpg`, (err => {
        if(err) console.log(err);
        console.log("File deleted");
    }))
}