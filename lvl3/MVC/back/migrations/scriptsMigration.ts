import { RowDataPacket } from 'mysql2';
import { db } from '../../MySQL_DB/db.js';
import { readFile } from 'fs/promises';
import { PATH_SQL } from '../src/constants.js';

async function getSqlRequest(fileName: string, type: string): Promise<string> {
    return await readFile(PATH_SQL + '\\' + type + '\\' + fileName + '.sql', 'utf-8')
}

export async function createTablesV2() {
    createBooksTableV2();
    createAuthorsTable();
    createBooksAuthorsTable();
}

export async function fillDataTablesV2() {
    fillBooksTableV2();
    fillAuthorsTable();
    fillBooksAuthorsTable();
}

export async function deleteBooksTableV1() {
    let query = await getSqlRequest('delete-books-table', 'downData');

    await db.execute(query);
}

export async function createBooksTableV1() {
    let query = await getSqlRequest('create-books-table', 'downData')

    await db.execute(query);
}

export async function fillBooksTableV1() {
    let queryGetBooks = await getSqlRequest('get-all-books', 'upData');
    let queryAddBook = await getSqlRequest('add-book', 'downData');

    let result = await db.execute(queryGetBooks);

    result.map(async (element: any) => {
        await db.query(queryAddBook, [element.id, element.title, element.description, element.year, element.pages, element.author])
    })
}

export async function deleteTablesV2() {
    deleteBooksTableV2();
    deleteAuthorsTable();
    deleteBooksAuthorsTable();
}

async function createBooksTableV2() {
    let query = await getSqlRequest('create-books-table', 'upData')

    await db.execute<RowDataPacket[]>(query);
}

async function createAuthorsTable() {
    let query = await getSqlRequest('create-authors-table', 'upData')

    await db.execute<RowDataPacket[]>(query);
}

async function createBooksAuthorsTable() {
    let query = await getSqlRequest('create-books-authors-table', 'upData')

    await db.execute(query);
}

async function fillBooksTableV2() {
    let queryAddBook = await getSqlRequest('add-book', 'upData');

    let result = await getDataBooksTableV1();

    result.map(async (element: any) => {
        await db.query(queryAddBook, [element.id, element.title, element.description, element.year, element.pages])
    })

}

async function getDataBooksTableV1() {
    let queryGetBooks = await getSqlRequest('get-books', 'downData');

    let result = await db.execute(queryGetBooks);

    return result;
}

async function fillAuthorsTable() {  //?
    let queryDown = await getSqlRequest('get-authors', 'downData');
    let queryUp = await getSqlRequest('add-authors', 'upData');

    let result = await db.execute(queryDown);

    result.map(async (element: any) => {
        await db.query(queryUp, [element.id, element.name])
    })
}

async function fillBooksAuthorsTable() {
    let queryGetBooks = await getSqlRequest('get-books', 'downData');
    let queryGetAuthors = await getSqlRequest('get-authors', 'upData');
    let queryAddBooksAuthors = await getSqlRequest('add-books-authors', 'upData');

    let resultGetAuthors = await db.execute(queryGetAuthors);
    resultGetAuthors.map(async (elemAuthor: any) => {
        let idBook = await db.execute(queryGetBooks, [elemAuthor.name]);

        idBook.map(async (elemBook: any) => {
            await db.query(queryAddBooksAuthors, [elemBook.id, elemAuthor.id])
        })
    })
}

async function deleteBooksTableV2() {
    let query = await getSqlRequest('delete-books-tableV2', 'upData')

    await db.execute(query);
}

async function deleteAuthorsTable() {
    let query = await getSqlRequest('delete-authors-table', 'upData')

    await db.execute(query);
}

async function deleteBooksAuthorsTable() {
    let query = await getSqlRequest('delete-books-authors-table', 'upData')

    await db.execute(query);
}