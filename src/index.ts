import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { getUser, getUsers, postUser } from './controllers/users';
import { assignHabit, getHabit, getHabits, HabitsOnUsers, patchHabit, postHabit } from './controllers/habits';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Hello World! NodeAPI with PostgreSQL is running.');
});

// Get all users
app.get('/users', getUsers);

// Create a new user
app.post('/user',postUser);

// Get user by ID
app.get('/user/:id', getUser);


// Get all habits
app.get('/habits', getHabits);

// Create a new habit
app.post('/habit', postHabit);

// Get habit by ID
app.get('/habit/:id', getHabit);

// Update Habit by ID
app.patch('/habit/:id', patchHabit);

// Assign habit
app.post('/assignHabit', assignHabit);


app.get('/HabitsOnUsers/:id', HabitsOnUsers)

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`NodeAPI with PostgreSQL listening on port ${port}`);
});
