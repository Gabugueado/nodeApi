import {NextFunction, Request, Response, } from 'express'
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();
const secretKey = "secret";

export const login = async (req: Request, res: Response) =>{
    try {

        if (!req.body) return res.status(400).json({error: "body is empty"});
        
        const { email, password } = req.body

        if (!email) return res.status(400).json({error: "email is not provided"});
        
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) return res.status(404).json({error: "usuario no encontrado"})

        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ msg: "ok" }, secretKey, { expiresIn: "1h" });

        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({error: "server error"});
    }
}

export const register = async (req:Request, res: Response) => {
    try {
        
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({error: "email or password is not provided"});
        
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await prisma.user.create({
            data: {
                email, 
                password: hashedPassword
            }
        })

        if (!user) return res.status(400).json({error: "error creando el usuario"})
        
        return res.status(200).json({ message: "ok" });

    } catch (error) {
        res.status(500).json({error: "server error"});
    }
}



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, secretKey) as { email: string };
    req.body = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token invalid or expired" });
  }
};
