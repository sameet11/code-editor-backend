import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: "Inavlid request" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({ error: "verify error" });
    }
};
export default authMiddleware;
