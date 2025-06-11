import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { error } from "console";

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

async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: "Username and password required" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "testSecret",
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 3600000,
            path: "/",
        });

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, username: user.username }
        });
        return;

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
        return
    }
}

export { register, login };