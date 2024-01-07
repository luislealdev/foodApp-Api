import express, { Request, Response } from 'express';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const auth = require('./api/auth');

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

// app.get('/seed', async (req: Request, res: Response) => {
//     try {
//         await prisma.state.deleteMany({});
//         res.send('Seeded!');
//     } catch (error) {

//     }
// });

app.use('/api/auth', auth);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});