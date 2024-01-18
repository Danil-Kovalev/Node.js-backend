import { Request, Response } from 'express';
import { DEFAULT_OFFSET } from './constants.js';
import { addBook, getAllBooks, deleteBook } from './scripts.js';

export async function getBooks(req: Request, res: Response) {
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let dataReady;

    let result = await getAllBooks();

    dataReady = {
        data: {
            books: result.slice(convertedOffset, Number(req.query.limit) + convertedOffset),
            total: {
                amount: result.length
            },
            offset: convertedOffset
        },
        success: true
    }

    res.send(dataReady);
}

function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

export async function addBookAdmin(req: Request, res: Response) {
    let data = req.body;

    addBook(data.name, data.firstAuthor, data.description, data.year, data.pages);

    res.send({
        success: true
    })
}

export async function deleteBookAdmin(req: Request, res: Response) {
    let data = req.body;

    deleteBook(data.id);

    res.send({
        success: true
    })
}