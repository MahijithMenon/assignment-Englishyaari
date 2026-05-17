import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

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

  if (!userId || !products || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "UserId and Products are required to create an order",
    });
  }

  const invalidQuantity = products.some(
  (p) =>
    !Number.isInteger(p.quantity) ||
    p.quantity <= 0
);

if (invalidQuantity) {
  return res.status(400).json({
    success: false,
    message: "Quantity must be a positive integer"
  });
}

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  const productIds = products.map((p) => p.productId);

  const checkedProducts: IProduct[] = await Product.find({
    _id: { $in: productIds },
  });

  if (checkedProducts.length !== productIds.length) {
    return res.status(404).json({
      success: false,
      message: "One or more Products not found",
    });
  }

  const productMap = new Map<string, number>(
  products.map((p): [string, number] => [
    p.productId.toString(),
    p.quantity,
  ])
);

  const totalAmount = checkedProducts.reduce((acc, product) => {
    const quantity = productMap.get(product._id.toString()) ?? 0;
    return acc + product.price * quantity;
  }, 0);

  const order = await Order.create({
    userId,
    products: products.map((p) => ({
      productId: new mongoose.Types.ObjectId(p.productId),
      quantity: p.quantity,
    })),
    totalAmount,
    status: "pending",
  });

  return res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    order,
  });
};