// import { Request, Response } from 'express';
// import { getBooks, searchBooks } from './controllers'

// export function checkAction(req: Request, res: Response) {
//     if (req.query.search !== undefined) {
//         let result = searchBooks(String(req.query.search))
//         res.send(result);
//     }
//     else {
//         let result = getBooks(Number(req.query.offset), Number(req.query.limit), String(req.query.filter));
//         res.send(result)
//     }
// }