import { Request, Response, NextFunction } from "express";

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, price } = req.body as {
    name?: string;
    category?: string;
    price?: number;
  };

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (
    name.trim().length === 0 ||
    category.trim().length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and category cannot be empty",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a positive number",
    });
  }

  next();
};