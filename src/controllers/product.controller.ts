import { RequestHandler } from "express";
import { createProductService } from "../services/product.services";

export const createProduct: RequestHandler = async (req, res) => {
  const { name, category, price } = req.body;

  const product = await createProductService(name, category, price);

  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    product
  });
};