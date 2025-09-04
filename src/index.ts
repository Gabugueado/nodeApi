import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import router from "./router/index" ;


const app = express();

const prisma = new PrismaClient()
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! NodeAPI with PostgreSQL is running.');
});

app.use(router);



process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`NodeAPI with PostgreSQL listening on port ${port}`);
});


