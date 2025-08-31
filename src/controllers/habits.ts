import { PrismaClient } from '@prisma/client';
import {Request, Response} from 'express'

const prisma = new PrismaClient();

export const getHabits = async (req:Request, res:Response) => {
    try {
        const habits = await prisma.habit.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }

}

export const postHabit = async (req:Request, res:Response)=> {
    try {
        const { title, description } = req.body;
        const habit = await prisma.habit.create({
            data: {
                title,
                description,
            },
        });
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
}

export const getHabit = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const habit = await prisma.habit.findUnique({
            where: { id: parseInt(id) },
        });
        if (habit) {
            res.json(habit);
        } else {
            res.status(404).json({ error: 'Habit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habit' });
    }
}

export const putHabit = async ( req:Request, res:Response ) => {
    try {
        const { id } = req.params;
        const { newTitle, newDescription } = req.body;
        const updateHabit = await prisma.habit.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: newTitle,
                description: newDescription,
                updatedAt: new Date(),
            },
        })

        if (updateHabit) {
            res.status(201).json(updateHabit);
        } else {
            res.status(404).json({ error: 'Habit not found' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habit' });
    }

}