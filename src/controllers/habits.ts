import { Prisma, PrismaClient } from '@prisma/client';
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

export const patchHabit = async ( req:Request, res:Response ) => {
    try {
        const { id } = req.params;
        
        if (!req.body) return res.status(400).json({ error: "there isn't data to update" });
        
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
        res.status(500).json({ error: 'Failed to update habit' });
    }

}


export const assignHabit = async ( req: Request, res: Response ) => {
    try {
        const { userId, habitId, assignedBy } = req.body
        
        if (!userId || !habitId) return res.status(400).json({ error: "idHabit and idUser are required" });

        const newHabitOnUser = await prisma.habitsOnUsers.create({
            data: {
                idUser: +userId,
                idHabit: +habitId,
                assignedBy: assignedBy
            }
        })
        if (!newHabitOnUser) return res.status(404).json({ error: 'Habit not found' });

        res.status(201).json(newHabitOnUser);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to assign habit" });
    }
}

export const HabitsOnUsers = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const habits = await prisma.habitsOnUsers.findMany({
            where: {
                idHabit: +id
            },
            include: {
                habit: true,
                user: true
            }
        })
        if (!habits) return res.status(404).json({ error: "habits not founds"})
        
        res.status(200).json(habits)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to found habits on users" });
    }
}

export const HabitsOfUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const habits = await prisma.habitsOnUsers.findMany({
            where: {
                idUser: +id
            },
            include: {
                habit: true,
                user: true
            }
        })
        if (!habits) return res.status(404).json({ error: "habits not founds"})
        
        res.status(200).json(habits)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to found habits on users" });
    }
}

