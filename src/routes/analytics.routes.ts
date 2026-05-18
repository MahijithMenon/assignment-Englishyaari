import { Router } from "express";
import {monthlyRevenue, topSellingProducts, userPurchaseSummary} from '../controllers/analytics.controller';
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateUserIdParam } from "../validations/analytics.validations";

const router = Router();

router.get('/top-products',asyncHandler(topSellingProducts))
router.get('/monthly-revenue',asyncHandler(monthlyRevenue))
router.get('/user-purchase-summary/:userId',validateUserIdParam,asyncHandler(userPurchaseSummary))

export default router;