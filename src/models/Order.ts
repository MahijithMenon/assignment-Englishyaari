import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;

  products: IOrderProduct[];

  totalAmount: number;

  status: string;

  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "completed",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order: Model<IOrder> = mongoose.model<IOrder>(
  "Order",
  orderSchema
);