import jwt from 'jsonwebtoken';
import { jwtSecret, accessTokenExpiresIn, refreshTokenExpiresIn } from '../config/config';

export function generateAccessToken(payload: any): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: accessTokenExpiresIn });
}

export function generateRefreshToken(payload: any): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: refreshTokenExpiresIn });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error("Token verification failed");
    }
}