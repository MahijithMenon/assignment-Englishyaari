import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

type OrderProductInput = {
  productId: string;
  quantity: number;
};

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, products } = req.body as {
    userId?: string;
    products?: OrderProductInput[];
  };

  if (!userId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "UserId and Products are required to create an order",
    });
  }

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

  const invalidProducts = products.some(
    (p) =>
      !p.productId ||
      typeof p.productId !== "string" ||
      !Number.isInteger(p.quantity) ||
      p.quantity <= 0
  );

  if (invalidProducts) {
    return res.status(400).json({
      success: false,
      message: "Each product must have a valid productId and a positive integer quantity",
    });
  }

  next();
};