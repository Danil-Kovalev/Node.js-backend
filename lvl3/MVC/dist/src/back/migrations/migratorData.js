import { createTablesV2, fillDataTablesV2, deleteBooksTableV1, createBooksTableV1, fillBooksTableV1, deleteTablesV2 } from "./scriptsMigration.js";
/**
 * Functions, which converting from old database to new version database and add data
 */
export async function up() {
    createTablesV2();
    fillDataTablesV2();
    deleteBooksTableV1();
}
/**
 * Functions, which converting from old database to old version database and add data
 */
export async function down() {
    createBooksTableV1();
    fillBooksTableV1();
    deleteTablesV2();
}
