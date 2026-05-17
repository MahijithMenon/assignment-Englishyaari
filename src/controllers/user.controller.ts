import { RequestHandler } from "express";
import {User} from '../models/User'

export const createUser: RequestHandler = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.create({
    name,
    email,
  });

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user,
  });
};