import { Router } from "express";
import {createUser} from '../controllers/user.controller';
import { asyncHandler } from "../middlewares/asyncHandler";
import { validateCreateUser } from "../validations/user.validations";

const router = Router();

router.post('/signup',validateCreateUser,asyncHandler(createUser))

export default router;