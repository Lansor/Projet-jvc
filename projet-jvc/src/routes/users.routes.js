import { Router } from "express";
import { getUserProfileWithReviews } from "../controllers/users.controller.js";

const router = Router();

router.get("/:id/profile", getUserProfileWithReviews);

export default router;
