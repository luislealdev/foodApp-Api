import express, { Request, Response } from 'express';
const prisma = require('./db/prisma');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/seed', (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});