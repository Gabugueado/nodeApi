import {NextFunction, Request, Response, } from 'express'
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();
const SECRET_KEY = 'secret';
const REFRESH_TOKEN_SECRET = 'ultra_secret'


export const login = async (req: Request, res: Response) => {
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

        const token = jwt.sign({ msg: "AT" }, SECRET_KEY, { expiresIn: "1m" });
        const refreshToken = jwt.sign({ msg: "RT" }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Makes the cookie inaccessible to client-side scripts
            secure: true, // Send cookie only over HTTPS in production
            sameSite: 'strict', // Provides protection against CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time in milliseconds (e.g., 7 days)
        });

        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({error: "server error"});
    }
}

export const register = async (req:Request, res: Response) => {
    try {
        
        const { email, password, name = 'usuario' } = req.body

        if (!email || !password) return res.status(400).json({error: "email or password is not provided"});
        
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await prisma.user.create({
            data: {
                name,
                email, 
                password: hashedPassword
            }
        })
        if (!user) return res.status(400).json({error: "error creando el usuario"})
       
        return res.status(200).json({ message: "ok" });

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "server error"});
    }
}



export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  if (!header) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    req.body = payload; // no usar req.body
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};


export const RefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.header("cookie") || "";
  if (!cookie) return res.status(401).json({ message: "Refresh token missing" });
  const refreshToken = cookie.split("=")[1];

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
    const newAccessToken = jwt.sign(
      { email: payload.email },
      SECRET_KEY,
      { expiresIn: "15m" }
    );
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
