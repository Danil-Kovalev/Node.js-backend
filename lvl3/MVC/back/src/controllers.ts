import { Request, Response } from 'express';
import basicAuth from 'express-basic-auth';
import { DEFAULT_OFFSET } from './constants.js'
import { DEFAULT_FILTER } from './constants.js'
import { getAllBooks, getBookById, getNewBooks, getPopularBooks, increaseClick, increaseViews, searchItems } from './scripts.js';

/**
 * If there is no book search request, then it sends books according to the parameters
 * If there is a book search request, it sends books by name
 * @param req data from client
 * @param res books by parameters from client
 */
export async function getBooks(req: Request, res: Response) {
    if (req.query.search === undefined) {
        let data = await requestBooks(req);
        res.send(data);
    }
    else {
        let data = await requestSearchBooks(String(req.query.search));
        res.send(data);
    }
}

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
async function requestBooks(req: Request): Promise<object> {
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let convertedFilter: string = convertFilter(String(req.query.filter));
    let result;
    let dataReady;
    if (convertedFilter === 'new') {
        result = await getNewBooks();
    }
    else if (convertedFilter === 'popular') {
        result = await getPopularBooks();
    }
    else {
        result = await getAllBooks();
    }

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
    return dataReady;
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
 * Check filter value and return default or number value
 * @param valueReqData value filter from client
 * @returns default filter value or convert value to number
 */
function convertFilter(valueReqData: string): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
}

/**
 * Get books by name in search line
 * @param text form client for search book
 * @returns books by name
 */
async function requestSearchBooks(text: string): Promise<object> {
    let result;
    let dataReady;

    result = await searchItems(text);

    dataReady = {
        data: {
            books: result,
            total: {
                amount: result.length
            }
        },
        success: true
    }
    
    return dataReady;
}

/**
 * Get book by id
 * @param req id book
 * @param res book by id
 */
export async function getBook(req: Request, res: Response) {
    let indexBook = Number(Object.values(req.params));
    let dataReady;

    let result = await getBookById(indexBook);

    await increaseViews(indexBook);

    dataReady = {
        data: {
            book: result[0],
        },
        success: true
    }
    res.send(dataReady)
}

/**
 * Increases the number of clicks by one
 * @param req id book
 * @param res the result of successful execution
 */
export async function addClick(req: Request, res: Response) {
    let idBook = Number(Object.values(req.params));
    let result = await increaseClick(idBook);

    res.send({ "success": result });
}

/**
 * Check correctly data for login admin
 * @param username admin
 * @param password admin
 * @returns match result
 */
export function authorizer(username: string, password: string) {
    const userMatches = basicAuth.safeCompare(username, 'admin')
    const passwordMatches = basicAuth.safeCompare(password, '1234')

    return userMatches && passwordMatches
}