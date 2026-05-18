import mongoose, { Types } from "mongoose";
import { Product } from "../models/Product";

type OrderProductInput = {
  productId: string;
  quantity: number;
};

interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
}

export const createProductService = (name: string, category: string, price: number) => {
    return Product.create({
        name,
        category,
        price
    });
}

export const checkEveryProductIdValidity = (productIds: mongoose.Types.ObjectId[]) => {
    return Product.aggregate([
    {
      $match: {
        _id: { $in: productIds },
      }
    }
  ])
};

export const calculateTotalAmountForProducts = (checkedProducts: IProduct[],products:OrderProductInput[]) =>{
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

  return totalAmount;
}