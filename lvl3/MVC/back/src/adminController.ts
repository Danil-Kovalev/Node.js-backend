import { Request, Response } from 'express';
import { DEFAULT_OFFSET } from './constants.js';
import { addBook, getAllBooks, deleteBook } from './scripts.js';
import { YEAR, MONTH, DAY } from './constants.js';

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
    let date: string = `${YEAR}-${MONTH}-${DAY}`;
    let authors: Array<string> = [];

    authors.push(data.firstAuthor);
    if (data.secondAuthor !== null) authors.push(data.secondAuthor);
    if (data.thirdAuthor !== null) authors.push(data.thirdAuthor);
        
    addBook(data.name, authors, data.description, data.year, data.pages, date);

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