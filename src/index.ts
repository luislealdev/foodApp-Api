import express, { Request, Response } from 'express';
import { deleteAllData } from './db';
const prisma = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const auth = require('./api/auth');

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/seed', async (req: Request, res: Response) => {
    try {
        await deleteAllData();
        res.status(200).json('Seeded!');
    } catch (error) {
        console.error(error);
        console.log(error);

        let statusCode = 500;
        let errorMessage = 'Internal server error';

        res.status(statusCode).json(errorMessage);
    }
});

app.use('/api/auth', auth);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});