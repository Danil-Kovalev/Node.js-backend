import { RowDataPacket } from 'mysql2';
import { db } from '../../MySQL_DB/db.js';
import { readFile } from 'fs/promises';
import { PATH_SQL } from './constants.js';

async function getSqlRequest(fileName: string, type: string): Promise<string> {
    return await readFile(PATH_SQL + '\\' + type + '\\' + fileName + '.sql', 'utf-8')
}

export async function getAllBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-all-books', 'upData');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

export async function getPopularBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-popular-books', 'upData');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

export async function getNewBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-new-books', 'upData');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

export async function getBookById(index: number): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-book', 'upData');

    let result = await db.execute<RowDataPacket[]>(query, [index]);
    return result[0];
}

export async function addBook(name: string, author: Array<string>, description: string, year: string, pages: string, date: string) {
    let queryAddBook = await getSqlRequest('add-book', 'upData')

    let countBooks = await getCountBooks();

    let idBook = countBooks[0].count;
    idBook++;

    await db.execute<RowDataPacket[]>(queryAddBook, [idBook, name, description, year, pages, date]);

    let countAuthors = await getCountAuthors();
    let idAuthor: number = countAuthors[0].count;

    author.map((el: string) => {
        idAuthor++;
        addAuthors(idAuthor, el);
        addBooksAuthors(idBook, idAuthor);
    })
}

async function getCountBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-count-books', 'upData')

    let result = await db.execute<RowDataPacket[]>(query, []);
    return result[0];
}

async function getCountAuthors(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-count-authors', 'upData')

    let result = await db.execute<RowDataPacket[]>(query, []);
    return result[0];
}

async function addAuthors(id: number, name: string) {
    let query = await getSqlRequest('add-authors', 'upData')

    await db.execute<RowDataPacket[]>(query, [id, name]);
}

async function addBooksAuthors(idBook: number, idAuthor: number) {
    let query = await getSqlRequest('add-books-authors', 'upData')

    await db.execute<RowDataPacket[]>(query, [idBook, idAuthor]);
}

export async function deleteBook(id: number) {
    let query = await getSqlRequest('delete-book', 'upData')

    await db.execute<RowDataPacket[]>(query, [id]);
    await deleteBooksAuthors(id);
}

async function deleteBooksAuthors(idBook: number) {
    let query = await getSqlRequest('delete-books-authors', 'upData')

    await db.execute<RowDataPacket[]>(query, [idBook]);
}

export async function increaseClick(idBook: number): Promise<boolean> {
    let result = false;
    let query = await getSqlRequest('increase-clicks-book', 'upData')

    if (await db.execute(query, [idBook])) {
        result = true;
    };

    return result;
}

export async function increaseViews(idBook: number): Promise<boolean> {
    let result = false;
    let query = await getSqlRequest('increase-views-book', 'upData')

    if (await db.execute(query, [idBook])) {
        result = true;
    };

    return result;
}

