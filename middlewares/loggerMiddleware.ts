import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${res.statusCode} ${req.url}`);
    });
    next();
};