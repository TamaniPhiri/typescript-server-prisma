import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtSecret } from "../config/config";


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, jwtSecret);
        req.user = user;
        next()
    } catch (error) {
        res.clearCookie("token")
        res.status(400).json(error);
    }
}

export default cookieJwtAuth;