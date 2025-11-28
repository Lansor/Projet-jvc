import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { createUserSchema } from "../dto/user.dto.js";
import { loginSchema } from "../dto/auth.dto.js";

const router = Router();

router.post("/signup", validateBody(createUserSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;
