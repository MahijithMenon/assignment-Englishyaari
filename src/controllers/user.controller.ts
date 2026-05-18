import { RequestHandler } from "express";
import { createUserService } from "../services/user.services";

export const createUser: RequestHandler = async (req, res) => {
  const { name, email } = req.body;

  const user = await createUserService(name, email);

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user,
  });
};