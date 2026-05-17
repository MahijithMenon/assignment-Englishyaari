import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);