import { PrismaClient } from '@prisma/client';
import {Request, Response} from 'express'
import bcrypt from "bcrypt"

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
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
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

export const AssignRole = async (req:Request, res:Response) => {
    try {
        if (!req.body) return res.status(404).json("body data not provided")

        const {idUser, idRole} = req.body

        const assignedRole = await prisma.userRole.create({
            data: {
                idUser, idRole, assignedBy: 'admin'
            }
        })
        return res.status(201).json(assignedRole);
    } catch (error) {
        return res.status(500).json("server error")
    }
}