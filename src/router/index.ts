import { Router } from 'express';
import { login, RefreshToken, register, verifyToken } from '../controllers/login';
import { getUser, getUsers, postUser } from '../controllers/users';
import { assignHabit, getHabit, getHabits, HabitsOnUsers, patchHabit, postHabit } from '../controllers/habits';

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World! NodeAPI with PostgreSQL is running.');
});

router.get('/users', verifyToken, getUsers);
router.post('/user',postUser);
router.get('/user/:id', getUser);

router.get('/habits', verifyToken, getHabits );
router.post('/habit', postHabit);
router.get('/habit/:id', getHabit);
router.patch('/habit/:id', patchHabit);
router.post('/assignHabit', assignHabit);
router.get('/HabitsOnUsers/:id',verifyToken, HabitsOnUsers)

router.post('/login', login)
router.post('/register', register)
router.get('/refresh-token', RefreshToken)

export default router