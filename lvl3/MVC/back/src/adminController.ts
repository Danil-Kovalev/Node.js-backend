import { Request, Response, query } from 'express';
import { clientDB } from '../../MySQL_DB/db';
import { DEFAULT_OFFSET } from './constants';

export function getBooks(req: Request, res: Response) {
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let dataReady;

    console.log(JSON.stringify(req.query));
    

    clientDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected to database!");
    })

    let queryStr = "SELECT * FROM books";

    clientDB.query(queryStr, (err: Error, result: Array<object>) => {
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
    })
}

function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

export function addBook(req: Request, res: Response) {
    let data = req.body;

    clientDB.connect(function (error) {
        if (error) throw error;

        let queryStr = 'INSERT INTO books (title, author, description, year, pages) VALUES(?, ?, ?, ?, ?)';

        clientDB.query(queryStr, [data.name, data.firstAuthor, data.description, data.year, data.pages], function (err) {
            if (err) {
                res.send({
                    error: "Can't send data"
                })
                throw err;
            }
            res.send({
                success: true
            })
        })
    })
}

export function deleteBook(req: Request, res: Response) {
    let data = req.body;

    clientDB.connect(function (error) {
        if (error) throw error;

        let queryStr = 'DELETE FROM books WHERE id=?';

        clientDB.query(queryStr, [data.id], function (err) {
            if (err) {
                res.send({
                    error: "Can't send data"
                })
                throw err;
            }
            res.send({
                success: true
            })
        })
    })
}