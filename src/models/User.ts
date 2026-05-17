import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique:true
  },
});

export const User: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);