import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const registerValidation = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Body diterima:", req.body); // ← tambahkan ini

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('USER', 'ADMIN').optional(),
    phone: Joi.string().min(10).max(15).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return; 
  }

  return next();
};


export const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return; 
  }

  return next();
};
