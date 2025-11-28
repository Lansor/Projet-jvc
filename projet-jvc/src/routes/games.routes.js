import { Router } from "express";
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/games.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../dto/game.dto.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.post("/", authMiddleware, validateBody(createGameSchema), createGame);
router.put("/:id", authMiddleware, validateBody(updateGameSchema), updateGame);
router.delete("/:id", authMiddleware, deleteGame);

export default router;
