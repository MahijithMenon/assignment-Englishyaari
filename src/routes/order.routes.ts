import { Router } from "express";
import {createOrder} from '../controllers/order.controller';
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateCreateOrder } from "../validations/order.validations";

const router = Router();

router.post('/create-order',validateCreateOrder,asyncHandler(createOrder))

export default router;