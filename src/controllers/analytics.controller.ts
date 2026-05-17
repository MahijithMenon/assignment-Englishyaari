import { RequestHandler } from "express";
import { Order } from "../models/Order";
import mongoose from "mongoose";

export const topSellingProducts: RequestHandler = async (req, res) => {
  const topProducts = await Order.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.productId",
      totalQuantitySold: { $sum: "$products.quantity" },
    },
  },
  { $sort: { totalQuantitySold: -1 } },
  { $limit: 5 },
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
  res.status(200).json({success:true, data: topProducts});

};

export const monthlyRevenue: RequestHandler = async (req, res) => {
  const revenue = await Order.aggregate([
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
  ]);

  return res.status(200).json({
    success: true,
    message: "Monthly revenue fetched successfully",
    data: revenue,
  });
};

export const userPurchaseSummary: RequestHandler = async (req, res) => {
  const { userId } = req.params as { userId: string };

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId",
    });
  }

  const purchaseHistory = await Order.aggregate([
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

  if (!purchaseHistory.length) {
    return res.status(404).json({
      success: false,
      message: "No purchase history found"
    });
  }

  return res.status(200).json({
    success: true,
    data: purchaseHistory[0],
  });
};