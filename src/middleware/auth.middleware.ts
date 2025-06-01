import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = decoded; // <== hanya ubah di sini jika tidak extend Request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = (req as any).user; // <== pakai `as any` agar tidak perlu extend Request

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ message: 'Forbidden: Admins only' });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
