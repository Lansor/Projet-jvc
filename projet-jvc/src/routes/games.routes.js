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

const router = Router();

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.post("/", validateBody(createGameSchema), createGame);
router.put("/:id", validateBody(updateGameSchema), updateGame);
router.delete("/:id", deleteGame);

export default router;
