import { db } from '../../MySQL_DB/db.js';
import { readFile } from 'fs/promises';
import { PATH_SQL } from '../src/constants.js';
/**
 * Get sql request from sql file and return him
 * @param fileName name sql file
 * @param type version database
 * @returns sql request
 */
async function getSqlRequest(fileName, type) {
    return await readFile(PATH_SQL + '\\' + type + '\\' + fileName + '.sql', 'utf-8');
}
/**
 * Create 3 tables with columns for new version database
 * booksV2 table: id, title, description, year, pages, clicks, views, date, deleted
 * authors: id, name
 * books-authors: idBook, idAuthor
 */
export async function createTablesV2() {
    createBooksTableV2();
    createAuthorsTable();
    createBooksAuthorsTable();
}
/**
 * Fill tables with data
 */
export async function fillDataTablesV2() {
    fillBooksTableV2();
    fillAuthorsTable();
    fillBooksAuthorsTable();
}
/**
 * Delete version V2 tables
 */
export async function deleteTablesV2() {
    deleteBooksTableV2();
    deleteAuthorsTable();
    deleteBooksAuthorsTable();
}
/**
 * Create table booksV2
 */
async function createBooksTableV2() {
    let query = await getSqlRequest('create-books-table', 'upData');
    await db.execute(query);
}
/**
 * Create author table
 */
async function createAuthorsTable() {
    let query = await getSqlRequest('create-authors-table', 'upData');
    await db.execute(query);
}
/**
 * Create books-authors table
 */
async function createBooksAuthorsTable() {
    let query = await getSqlRequest('create-books-authors-table', 'upData');
    await db.execute(query);
}
/**
 * Fill booksV2 table from old table
 */
async function fillBooksTableV2() {
    let queryAddBook = await getSqlRequest('add-book', 'upData');
    let result = await getDataBooksTableV1();
    result.map(async (element) => {
        await db.query(queryAddBook, [element.id, element.title, element.description, element.year, element.pages]);
    });
}
/**
 * Get all data from booksV1 table
 * @returns data from old table
 */
async function getDataBooksTableV1() {
    let queryGetBooks = await getSqlRequest('get-books', 'downData');
    let result = await db.execute(queryGetBooks);
    return result;
}
/**
 * Fill authors table from old table
 */
async function fillAuthorsTable() {
    let queryGetAuthors = await getSqlRequest('get-authors', 'downData');
    let queryAddAuthors = await getSqlRequest('add-authors', 'upData');
    let result = await db.execute(queryGetAuthors);
    result.map(async (element) => {
        let countAuthors = await getCountAuthors();
        let idAuthor = countAuthors[0].count;
        idAuthor++;
        await db.query(queryAddAuthors, [idAuthor, element.name]);
    });
}
/**
 * Get number authors
 * @returns number of authors
 */
async function getCountAuthors() {
    let query = await getSqlRequest('get-count-authors', 'upData');
    let result = await db.execute(query, []);
    return result[0];
}
/**
 * Fill books-authors table
 */
async function fillBooksAuthorsTable() {
    let queryGetBooks = await getSqlRequest('get-books-by-author', 'downData');
    let queryGetAuthors = await getSqlRequest('get-authors', 'upData');
    let queryAddBooksAuthors = await getSqlRequest('add-books-authors', 'upData');
    let resultGetAuthors = await db.execute(queryGetAuthors);
    resultGetAuthors.map(async (elemAuthor) => {
        let idBook = await db.execute(queryGetBooks, [elemAuthor.name]);
        idBook.map(async (elemBook) => {
            await db.query(queryAddBooksAuthors, [elemBook.id, elemAuthor.id]);
        });
    });
}
/**
 * Create table with columns: id, title, description, year, pages, authors, clicks, views, date, deleted
 */
export async function createBooksTableV1() {
    let query = await getSqlRequest('create-books-table', 'downData');
    await db.execute(query);
}
/**
 * Fill booksV1 table with data
 */
export async function fillBooksTableV1() {
    let queryGetBooks = await getSqlRequest('get-all-books', 'upData');
    let queryAddBook = await getSqlRequest('add-book', 'downData');
    let result = await db.execute(queryGetBooks);
    result.map(async (element) => {
        await db.query(queryAddBook, [element.id, element.title, element.description, element.year, element.pages, element.author]);
    });
}
/**
 * Delete old version table
 */
export async function deleteBooksTableV1() {
    let query = await getSqlRequest('delete-books-table', 'downData');
    await db.execute(query);
}
/**
 * Delete booksV2 table
 */
async function deleteBooksTableV2() {
    let query = await getSqlRequest('delete-books-tableV2', 'upData');
    await db.execute(query);
}
/**
 * Delete authors table
 */
async function deleteAuthorsTable() {
    let query = await getSqlRequest('delete-authors-table', 'upData');
    await db.execute(query);
}
/**
 * Delete books authors table
 */
async function deleteBooksAuthorsTable() {
    let query = await getSqlRequest('delete-books-authors-table', 'upData');
    await db.execute(query);
}
