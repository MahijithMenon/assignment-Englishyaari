import { Router } from "express";
import {createOrder} from '../controllers/order.controller';
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.post('/create-order',asyncHandler(createOrder))

export default router;