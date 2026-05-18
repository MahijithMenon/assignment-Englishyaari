import { Request, Response, NextFunction } from "express";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body as {
    name?: string;
    email?: string;
  };

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    });
  }

  if (name.trim().length === 0 || email.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Name and email cannot be empty",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  next();
};