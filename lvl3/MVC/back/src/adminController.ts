import { Request, Response } from 'express';
import { DEFAULT_OFFSET } from './constants.js';
import { addBook, getAllBooks, markDeletedBook } from './scripts.js';
import { YEAR, MONTH, DAY } from './constants.js';

/**
 * Get books form database and books with sliced params: offset, limit, filter
 * @param req request from client
 * @param res response for client
 */
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

/**
 * Check offset value and return default or number value
 * @param valueReqData value offset from client
 * @returns default offset value or convert value to number
 */
function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

/**
 * Add new book to database, set date adding book and united authors in an array
 * @param req data from client
 * @param res result of adding a book
 */
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

/**
 * Get id book from client and mark deleted book in database
 * @param req id book from client
 * @param res result of deleting a book
 */
export async function deleteBookAdmin(req: Request, res: Response) {
    let data = req.body;

    markDeletedBook(data.id);

    res.send({
        success: true
    })
}