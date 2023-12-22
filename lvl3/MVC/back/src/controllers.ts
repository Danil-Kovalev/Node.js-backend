import dataBooks from '../books.json';
import { Request, Response } from 'express';

const DEFAULT_FILTER = 'new';
const DEFAULT_OFFSET = 0;

export function getBooks(req: Request, res: Response) {
    let dataReady = {
        data: {
            books: dataBooks.data.books.slice(convertOffset(Number(req.query.offset)), Number(req.query.limit) + convertOffset(Number(req.query.offset))),
            total: {
                amount: dataBooks.data.books.length
            },
            filter: convertFilter(String(req.query.filter)),
            offset: convertOffset(Number(req.query.offset))
        },
        success: true
    }    
    res.send(dataReady)
}

function convertFilter(valueReqData: string | undefined): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
}

function convertOffset(valueReqData: number | undefined): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

export function getBook(req: Request, res: Response) {
    let indexBook = Number(Object.values(req.params)) - 1;
    res.send(dataBooks.data.books[indexBook]);
}