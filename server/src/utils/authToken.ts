// src/middleware/authToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extend Express Request to type `user` properly
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        fullname: string;
      };
    }
  }
}

const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ error: 'No token provided. Please log in.' });
      return 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
      fullname: string;
    };

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      fullname: decoded.fullname,
    };

    next();
  } catch (err: any) {
    console.error('[Middleware Error]', err.message || err);
     res.status(401).json({ error: 'Invalid or expired token' });
     return
  }
};

export default authToken;
