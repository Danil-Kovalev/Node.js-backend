"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const dirname = path.resolve();
const PORT = 3000;
const jsonParser = body_parser_1.default.json();
app.use(express_1.default.static(dirname.concat('\\front\\all-books-page')));
app.use(express_1.default.static(dirname.concat('\\front\\book-page')));
app.get('/', jsonParser, (req, res) => {
    res.sendFile(dirname.concat('\\front\\all-books-page\\', 'books-page.html'));
});
app.get('/book/:bookID', jsonParser, (req, res) => {
    console.log("Params1: " + Object.values(req.params));
    res.sendFile(dirname.concat('\\front\\book-page\\', 'book-page.html'));
});
app.get('/api/v1/books', jsonParser, (req, res) => {
    console.log(1);
});
app.get('/api/v1/books/:bookID', (req, res) => {
    console.log("Params2: " + Object.entries(req.params));
});
app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});
