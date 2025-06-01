import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {verify} from 'jsonwebtoken'

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }



export class Jwt {
static allowedRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.body.user;
    
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    return next(); // ✅ return ini penting
  };
}

}   

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    res.status(403).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || "";
    const decoded = verify(token, secretKey);

    req.user = decoded; // ✅ Simpan hasil decoding JWT ke req.user

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
    return;
  }
};


