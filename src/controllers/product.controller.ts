import { RequestHandler } from "express";
import {Product} from '../models/Product'

export const createProduct: RequestHandler = async (req, res) => {
  const { name, category, price } = req.body;

  if(!name || !category || !price){
    return res.status(400).json({
      success:false,
      message:"All Fields are required"
    })
  }

  if(typeof price !== 'number' || price <= 0){
    return res.status(400).json({
      success:false,
      message:"Price must be a positive number"
    })
  }

  const product = await Product.create({
    name,
    category,
    price
  });

  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    product
  });
};