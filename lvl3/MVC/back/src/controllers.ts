import { Request, Response } from 'express';
import { db } from '../../MySQL_DB/db.js';
import basicAuth from 'express-basic-auth';
import { DEFAULT_OFFSET } from './constants.js';
import { DEFAULT_FILTER } from './constants.js';
import { getAllBooks, getBookById } from './scripts.js';

export async function getBooks(req: Request, res: Response) {
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let convertedFilter: string = convertFilter(String(req.query.filter));
    let dataReady;

    let result = await getAllBooks();

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
}

function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

function convertFilter(valueReqData: string): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
}

export async function getBook(req: Request, res: Response) {
    let indexBook = Number(Object.values(req.params));
    let dataReady;

    let result = await getBookById(indexBook);

    dataReady = {
        data: {
            book: result[0],
        },
        success: true
    }
    res.send(dataReady)
}

export function authorizer(username: string, password: string) {
    const userMatches = basicAuth.safeCompare(username, 'admin')
    const passwordMatches = basicAuth.safeCompare(password, '1234')

    return userMatches && passwordMatches
}

export function searchBooks(searchText: string) {

}