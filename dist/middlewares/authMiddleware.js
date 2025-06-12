"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    console.log(req.cookies);
    const token = req.cookies.token;
    console.log("Token in auth middleware: ", token);
    // No token provided
    if (!token) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }
    try {
        // Verify token and attach user data to the request
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallbackSecret");
        req.user = { id: Number(decoded.userId) };
        next();
    }
    catch (error) {
        // Token invalid/expired
        res.status(403).json({ error: "Forbidden: Invalid/expired token" });
        return;
    }
}
exports.default = authMiddleware;
