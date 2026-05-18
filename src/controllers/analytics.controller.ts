import { RequestHandler } from "express";
import { topSellingProductsService, userPurchaseSummaryService } from "../services/analytics.services";
import { MonthlyRevenueCalculationService } from "../services/order.services";

export const topSellingProducts: RequestHandler = async (req, res) => {
  // Aggregation pipeline to calculate top selling products with limit 100
  const topProducts = await topSellingProductsService();
  if (!topProducts.length) {
    return res.status(404).json({
      success: false,
      message: "No products found"
    })
  }

  return res.status(200).json({ success: true, data: topProducts });

};

export const monthlyRevenue: RequestHandler = async (req, res) => {
  const revenue = await MonthlyRevenueCalculationService();

  if (!revenue.length) {
    return res.status(404).json({
      success: false,
      message: "No revenue data found"
    })
  }

  return res.status(200).json({
    success: true,
    message: "Monthly revenue fetched successfully",
    data: revenue,
  });
};

export const userPurchaseSummary: RequestHandler = async (req, res) => {
  const { userId } = req.params as { userId: string };

  const purchaseHistory = await userPurchaseSummaryService(userId);

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