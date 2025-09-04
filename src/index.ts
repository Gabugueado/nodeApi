import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { getUser, getUsers, postUser } from './controllers/users';
import { assignHabit, getHabit, getHabits, HabitsOnUsers, patchHabit, postHabit } from './controllers/habits';
import { login, register, verifyToken } from './controllers/login';


const app = express();
const prisma = new PrismaClient()
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! NodeAPI with PostgreSQL is running.');
});

app.get('/users', verifyToken, getUsers);
app.post('/user',postUser);
app.get('/user/:id', getUser);

app.get('/habits', verifyToken, getHabits );
app.post('/habit', postHabit);
app.get('/habit/:id', getHabit);
app.patch('/habit/:id', patchHabit);
app.post('/assignHabit', assignHabit);
app.get('/HabitsOnUsers/:id',verifyToken, HabitsOnUsers)

app.post('/login', login)
app.post('/register', register)

process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`NodeAPI with PostgreSQL listening on port ${port}`);
});
