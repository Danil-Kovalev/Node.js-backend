import { Request, Response } from 'express';
import { clientDB } from '../../MySQL_DB/clientDB';
import basicAuth, { IBasicAuthedRequest } from 'express-basic-auth';
import { DEFAULT_OFFSET } from './constants';
import { DEFAULT_FILTER } from './constants';

export function getBooks(req: Request, res: Response) {
    let convertedOffset = convertOffset(Number(req.query.offset));
    let convertedFilter = convertFilter(String(req.query.filter));
    let dataReady;
    
    clientDB.query("SELECT * FROM books", (err: Error, result: Array<object>) => {
        dataReady = {
            data: {
                books: result.slice(convertedOffset, Number(req.query.limit) + convertedOffset),
                total: {
                    amount: result.length
                },
                filter: convertedFilter,
                offset: convertedOffset
            },
            success: true
        }
        res.send(dataReady);
    })
}

function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

function convertFilter(valueReqData: string): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
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

export function myAuthorizer(username: string, password: string) {
    const userMatches = basicAuth.safeCompare(username, '')
    const passwordMatches = basicAuth.safeCompare(password, '')
    
    return userMatches && passwordMatches
}

export function searchBooks(searchText: string) {

}