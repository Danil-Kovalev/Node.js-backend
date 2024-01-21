import { FieldPacket, RowDataPacket } from 'mysql2';
import { db } from '../../MySQL_DB/db.js';
import { readFile, writeFile } from 'fs/promises';
import { PATH_SQL } from './constants.js';

async function getSqlRequest(fileName: string, type: string): Promise<string> {
    return await readFile(PATH_SQL + '\\' + type + '\\' + fileName + '.sql', 'utf-8')
}

export async function getAllBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-all-books', 'upData');
    
    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

export async function getBookById(index: number): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-book', 'upData');

    let result = await db.execute<RowDataPacket[]>(query, [index]);
    return result[0];
}

export async function addBook(name:string, author: string, description: string, year: string, pages: string) {
    let queryAddBook = await getSqlRequest('add-book', 'upData')

    let countBooks = await getCountBooks();
    let countAuthors = await getCountAuthors();

    let idBook = countBooks[0].count;
    idBook++;

    let idAuthor = countAuthors[0].count;
    idAuthor++;

    await addAuthors(idAuthor, author);

    await db.execute<RowDataPacket[]>(queryAddBook, [idBook, name, description, year, pages]);
    await addBooksAuthors(idBook, idAuthor);
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

export async function createBooksTable() {
    let query = await getSqlRequest('create-books-table', 'upData')

    await db.execute<RowDataPacket[]>(query);
}

export async function createAuthorsTable() {
    let query = await getSqlRequest('create-authors-table', 'upData')

    await db.execute<RowDataPacket[]>(query);
}

export async function createBooksAuthorsTable() {
    let query = await getSqlRequest('create-books-authors-table', 'upData')

    await db.execute(query);
}

export async function deleteBooksTable() {
    let query = await getSqlRequest('delete-books-table', 'downData')

    await db.execute(query);
}

export async function deleteAuthorsTable() {
    let query = await getSqlRequest('delete-authors-table', 'downData')

    await db.execute(query);
}

export async function deleteBooksAuthorsTable() {
    let query = await getSqlRequest('delete-books-authors-table', 'downData')

    await db.execute(query);
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
