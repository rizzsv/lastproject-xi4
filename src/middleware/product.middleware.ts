import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const productValidation = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Body diterima:", req.body); // Debug opsional

  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().integer().min(0).required(),
    image: Joi.string().uri().required(),
    stock: Joi.number().integer().min(0).required(),
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
