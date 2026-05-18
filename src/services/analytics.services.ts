import mongoose from "mongoose";
import { Order } from "../models/Order";

export const topSellingProductsService = () => {
    return Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 100 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: { $arrayElemAt: ["$productDetails.name", 0] },
          totalQuantitySold: 1,
          totalRevenueGenerated: {
            $multiply: [
              "$totalQuantitySold",
              { $arrayElemAt: ["$productDetails.price", 0] },
            ],
          },
        },
      },
    ]);
}

export const userPurchaseSummaryService = (userId: string) => {
  // Aggregation pipeline to calculate total amount spent and total orders for a user
    return Order.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$userId",
        totalSpent: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        userName: "$userDetails.name",
        totalSpent: 1,
        totalOrders: 1,
      },
    },
  ]);
}