import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
import { checkUserExistence } from "../services/user.services";
import { calculateTotalAmountForProducts, checkEveryProductIdValidity } from "../services/product.services";
import { orderCreationService } from "../services/order.services";

type OrderProductInput = {
  productId: string;
  quantity: number;
};


interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
}


export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products } = req.body as {
    userId: string;
    products: OrderProductInput[];
  };

  const existingUser = await checkUserExistence(userId);
  

  if (!existingUser.length) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  const productIds = products.map((p) => new mongoose.Types.ObjectId(p.productId));
  
  const checkedProducts: IProduct[] = await checkEveryProductIdValidity(productIds);

  if (checkedProducts.length !== productIds.length) {
    return res.status(404).json({
      success: false,
      message: "One or more Products not found",
    });
  }

  const totalAmount = calculateTotalAmountForProducts(checkedProducts, products);

  const order = await orderCreationService(userId,products,totalAmount);

  return res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    order,
  });
};