import dataBooks from '../books.json';
import { Request, Response } from 'express';
import { clientDB } from '../../MySQL_DB/clientDB';

const DEFAULT_FILTER = 'new';
const DEFAULT_OFFSET = 0;

export function getBooks(req: Request, res: Response) {
    let dataReady;
    clientDB.query("SELECT * FROM books", (err: Error, result: Array<object>) => {
        dataReady = {
            data: {
                books: result.slice(convertOffset(Number(req.query.offset)), Number(req.query.limit) + convertOffset(Number(req.query.offset))),
                total: {
                    amount: result.length
                },
                filter: convertFilter(String(req.query.filter)),
                offset: convertOffset(Number(req.query.offset))
            },
            success: true
        }
        res.send(dataReady)
    })
}

function convertFilter(valueReqData: string | undefined): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
}

function convertOffset(valueReqData: number | undefined): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

export function getBook(req: Request, res: Response) {
    let indexBook = Number(Object.values(req.params));
    let dataReady;
    clientDB.query(`SELECT * FROM books WHERE id=${indexBook}`, (err: Error, result: Array<object>) => {
        dataReady = {
            data: {
                book: result[0],
            },
            success: true
        }
        res.send(dataReady)
    })
}