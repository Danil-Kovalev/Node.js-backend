import { FieldPacket, RowDataPacket } from 'mysql2';
import { db } from '../../MySQL_DB/db.js';
import { readFile, writeFile } from 'fs/promises';
import { PATH_SQL } from './constants.js';

async function getSqlRequest(fileName: string): Promise<string> {
    return await readFile(PATH_SQL + fileName + '.sql', 'utf-8')
}

export async function getAllBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-all-books');
    
    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

export async function getBookById(index: number): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-book');

    let result = await db.execute<RowDataPacket[]>(query, [index]);
    return result[0];
}

export async function addBook(name:string, author: string, description: string, year: string, pages: string) {
    let query = await getSqlRequest('add-book')

    let countBooks = await getCountBooks();
    let id = countBooks[0].count;
    id++;

    await db.execute<RowDataPacket[]>(query, [id, name, author, description, year, pages]);
}

async function getCountBooks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-count-books')

    let result = await db.execute<RowDataPacket[]>(query, []);
    return result[0];
}

export async function deleteBook(id: number) {
    let query = await getSqlRequest('delete-book')

    let result = await db.execute<RowDataPacket[]>(query, [id]);
    return result[0];
}