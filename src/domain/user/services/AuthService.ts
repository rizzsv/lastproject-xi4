import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/entities";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "RAHMATBUSUK2025";

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async comaparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static generateToken(user: User): string {
        return jwt.sign(
            {
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            {expiresIn: "1h"}
        );
    }

    static verifyToken(token: string){
        return jwt.verify(token, JWT_SECRET);
    }
}