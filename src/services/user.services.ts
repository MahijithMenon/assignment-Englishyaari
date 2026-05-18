import mongoose from "mongoose";
import { User } from "../models/User";

export const createUserService = (name: string, email: string) => {
    return User.create({
        name,
        email,
    });
};

export const checkUserExistence = (userId: string) => {
    return User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
            }
        }
    ]);
}