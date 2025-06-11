"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
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
