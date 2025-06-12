"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            username
        }
    });
    if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = await prisma_1.default.user.create({
        data: {
            username: username,
            hashedPassword: hashedPassword,
        }
    });
    res.status(200).json({ message: "User Created: ", userId: newUser.id });
    return;
}
async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password required" });
            return;
        }
        const user = await prisma_1.default.user.findUnique({ where: { username } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "testSecret", { expiresIn: "1h" });
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
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}
async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
}
