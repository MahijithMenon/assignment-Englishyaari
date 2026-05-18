import { Router } from "express";
import {createProduct} from '../controllers/product.controller';
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateCreateProduct } from "../validations/product.validations";

const router = Router();

router.post('/create-product',validateCreateProduct,asyncHandler(createProduct))

export default router;