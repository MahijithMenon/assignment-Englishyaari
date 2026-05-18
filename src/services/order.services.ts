import mongoose from "mongoose";
import { Order } from "../models/Order";

interface OrderProductInput {
  productId: string;
  quantity: number;
}

export const orderCreationService = (
  userId: string,
  products: OrderProductInput[],
  totalAmount: number
) => {
  return Order.create({
    userId: new mongoose.Types.ObjectId(userId),

    products: products.map((p) => ({
      productId: new mongoose.Types.ObjectId(p.productId),
      quantity: p.quantity,
    })),

    totalAmount,

    status: "pending",
  });
};

export const MonthlyRevenueCalculationService = () => {
  return Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          revenue: 1,
        },
      },
    ])
  };