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
    if(!token){
        return res.status(400).json("No token found")
    }
    try {
        const user = jwt.verify(token, "a765s76g!@#$%7sa8f7sct");
        req.user = user;
        next()
    } catch (error) {
        res.clearCookie("token")
        res.status(400).json(error);
    }
}

export default cookieJwtAuth;