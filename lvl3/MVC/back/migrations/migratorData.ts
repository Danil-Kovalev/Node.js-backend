import {
     createTablesV2, fillDataTablesV2, deleteBooksTableV1,
     createBooksTableV1, fillBooksTableV1, deleteTablesV2
    } from "./scriptsMigration.js";

export async function up() {
    createTablesV2();
    fillDataTablesV2();
    deleteBooksTableV1();
}

export async function down() {
    createBooksTableV1();
    fillBooksTableV1();
    deleteTablesV2();
}