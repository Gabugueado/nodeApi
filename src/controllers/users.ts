import { PrismaClient } from '@prisma/client';
import {Request, Response} from 'express'


const prisma = new PrismaClient();

export const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }

}

export const postUser = async (req:Request, res:Response)=> {
    try {
        const { email, name } = req.body;
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}
export const getUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}