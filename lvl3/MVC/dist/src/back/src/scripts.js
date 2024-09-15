import { db } from '../../MySQL_DB/db.js';
import { readFile } from 'fs/promises';
import { PATH_SQL } from './constants.js';
import { deleteFile } from './handlerFiles.js';
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
 * Get all books from database and sorts them by id
 * @returns all books from books database
 */
export async function getAllBooks() {
    let query = await getSqlRequest('get-all-books', 'upData');
    let result = await db.execute(query);
    return result[0];
}
/**
 * Get popular books from database and sorts them by popular
 * @returns popular books by clicks from books database
 */
export async function getPopularBooks() {
    let query = await getSqlRequest('get-popular-books', 'upData');
    let result = await db.execute(query);
    return result[0];
}
/**
 * Get new books from database and sorts them by date
 * @returns new books by date from books database
 */
export async function getNewBooks() {
    let query = await getSqlRequest('get-new-books', 'upData');
    let result = await db.execute(query);
    return result[0];
}
/**
 * Get book by id and sort by id
 * @param index book
 * @returns book by id
 */
export async function getBookById(index) {
    let query = await getSqlRequest('get-book', 'upData');
    let result = await db.execute(query, [index]);
    return result[0];
}
/**
 * Add book to database. Get number books and authors for set new id for them and send request to database with data from client.
 * First adding data to books table, second adding author to authors table, third adding id book and id author to books-authors table
 * @param name book
 * @param author book
 * @param description book
 * @param year book
 * @param pages book
 * @param date adding book
 */
export async function addBook(name, author, description, year, pages, date) {
    let queryAddBook = await getSqlRequest('add-book', 'upData');
    let idBook = await getNewID();
    await db.execute(queryAddBook, [idBook, name, description, year, pages, date]);
    let countAuthors = await getCountAuthors();
    let idAuthor = countAuthors[0].count;
    author.map((el) => {
        idAuthor++;
        addAuthors(idAuthor, el);
        addBooksAuthors(idBook, idAuthor);
    });
}
/**
 * Get last id for book and increase by one
 * @returns new id for book
 */
export async function getNewID() {
    let countBooks = await getCountBooks();
    let idBook = countBooks[0].count;
    idBook++;
    return idBook;
}
/**
 * Get last id book from database
 * @returns last id book
 */
async function getCountBooks() {
    let query = await getSqlRequest('get-count-books', 'upData');
    let result = await db.execute(query, []);
    return result[0];
}
/**
 * Get last id author from database
 * @returns last id author
 */
async function getCountAuthors() {
    let query = await getSqlRequest('get-count-authors', 'upData');
    let result = await db.execute(query, []);
    return result[0];
}
/**
 * Add id and name author to authors table
 * @param id author
 * @param name author
 */
async function addAuthors(id, name) {
    let query = await getSqlRequest('add-authors', 'upData');
    await db.execute(query, [id, name]);
}
/**
 * Add id book and id author to books-authors table
 * @param idBook
 * @param idAuthor
 */
async function addBooksAuthors(idBook, idAuthor) {
    let query = await getSqlRequest('add-books-authors', 'upData');
    await db.execute(query, [idBook, idAuthor]);
}
/**
 * Get all marked deleted book
 * @returns all marked deleted book with data
 */
export async function getMarkedBook() {
    let query = await getSqlRequest('get-marked-book', 'upData');
    let result = await db.execute(query);
    return result[0];
}
/**
 * Marks book for deletion
 * @param id book
 */
export async function markDeletedBook(id) {
    let query = await getSqlRequest('mark-deleted-book', 'upData');
    await db.execute(query, [id]);
}
/**
 * Delete book by id and delete connection between book and author
 * @param id book
 */
export async function deleteBook(id) {
    let query = await getSqlRequest('delete-book', 'upData');
    await db.execute(query, [id]);
    await deleteBooksAuthors(id);
    deleteFile(id);
}
/**
 * Delete connection between book and author by id book
 * @param idBook
 */
async function deleteBooksAuthors(idBook) {
    let query = await getSqlRequest('delete-books-authors', 'upData');
    await db.execute(query, [idBook]);
}
/**
 * Inscrease cliks on book
 * @param idBook
 * @returns execution result
 */
export async function increaseClick(idBook) {
    let result = false;
    let query = await getSqlRequest('increase-clicks-book', 'upData');
    if (await db.execute(query, [idBook])) {
        result = true;
    }
    ;
    return result;
}
/**
 * Inscrease views on book
 * @param idBook
 * @returns execution result
 */
export async function increaseViews(idBook) {
    let result = false;
    let query = await getSqlRequest('increase-views-book', 'upData');
    if (await db.execute(query, [idBook])) {
        result = true;
    }
    ;
    return result;
}
/**
 * Search books by text from user
 * @param text from user for search book
 * @returns books with data by search text
 */
export async function searchItems(text) {
    let query = await getSqlRequest('search-books', 'upData');
    text = `%${text}%`;
    let result = await db.execute(query, [text]);
    return result[0];
}
