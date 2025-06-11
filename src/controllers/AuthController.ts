import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

async function register(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if (existingUser) {
        res.status(400).json({ error: "User already exists" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            username: username,
            hashedPassword: hashedPassword,
        }
    })
    res.status(200).json({ message: "User Created: ", userId: newUser.id });
    return;
}

export { register };