import { Router } from "express";
import {createUser} from '../controllers/user.controller';
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.post('/signup',asyncHandler(createUser))

export default router;