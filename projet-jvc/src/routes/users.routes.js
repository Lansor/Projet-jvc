import { Router } from "express";
import { getUserProfile} from "../controllers/users.controller.js";

const router = Router();

router.get("/:id/profile", getUserProfile);

export default router;
