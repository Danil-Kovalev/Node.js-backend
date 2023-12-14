import express, {Express, Request, Response, json} from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;
const jsonParser = bodyParser.json();

// app.set('view engine', 'ejs');

app.use(express.static(path.join(dirname, '/front')));

app.get('/', jsonParser, (req: Request, res: Response) => {
    res.sendFile(path.join(dirname, '/front/books-page.html'))
});

app.get('/book/:bookID', jsonParser, (req: Request, res: Response) => {
    // console.log("Params1, /book/:bookID --- " + Object.entries(req.params));
    res.sendFile(path.join(dirname, '/front/book-page.html'))
})

app.get('/api/v1/books', (req: Request, res: Response) => {
    // console.log("Params2, /api/v1/books --- " + req.query.action);
})

app.get('/api/v1/book/:bookID', jsonParser, (req: Request, res: Response) => {
//    console.log("Params3, /api/v1/book/:bookID --- " + Object.entries(req.params));
})

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});