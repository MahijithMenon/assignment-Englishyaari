import { Router } from "express";
import {createProduct} from '../controllers/product.controller';
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.post('/create-product',asyncHandler(createProduct))

export default router;