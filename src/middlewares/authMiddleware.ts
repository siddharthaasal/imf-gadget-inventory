
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbackSecret") as { userId: string };
        req.user = { id: Number(decoded.userId) };
        next();
    } catch (error) {
        // Token invalid/expired
        res.status(403).json({ error: "Forbidden: Invalid/expired token" });
        return;
    }
}

export default authMiddleware;