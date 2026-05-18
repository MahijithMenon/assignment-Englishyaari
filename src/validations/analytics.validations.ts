import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateUserIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params as { userId?: string };

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId",
    });
  }

  next();
};