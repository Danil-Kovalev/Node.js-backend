import { Request, Response } from 'express';
import { clientDB } from '../../MySQL_DB/db';
import { DEFAULT_OFFSET } from './constants';
import { RowDataPacket } from 'mysql2';

export function getBooks(req: Request, res: Response) {
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let dataReady;

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
    })

    let queryGetLastIndex = 'SELECT COUNT(*) as count FROM books';

    clientDB.query(queryGetLastIndex, function (err: Error, result: RowDataPacket[]) {
        if (err) throw err;
        let countBooks: number = result[0].count;
        countBooks++;

        let queryAdd = 'INSERT INTO books (id, title, author, description, year, pages) VALUES(?, ?, ?, ?, ?, ?)';

        clientDB.query(queryAdd, [countBooks, data.name, data.firstAuthor, data.description, data.year, data.pages], function (err) {
            if (err) throw err;
            res.send({
                success: true
            })
        })
    })
}

// function getBooksLength(): number {
//     let countBooks: number = 0;

//     clientDB.connect(function (error) {
//         if (error) throw error;
//     })



//     return countBooks;
// }

export function deleteBook(req: Request, res: Response) {
    let data = req.body;

    clientDB.connect(function (error) {
        if (error) throw error;

        let queryStr = 'DELETE FROM books WHERE id=?';

        clientDB.query(queryStr, [data.id], function (err) {
            if (err) {
                throw err;
            }
            res.send({
                success: true
            })
        })
    })
}