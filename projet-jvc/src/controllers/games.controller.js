import { Game } from "../models/Game.js";

export const getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    next(error);
  }
};

export const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Jeu non trouvé" });
    }
    res.json(game);
  } catch (error) {
    next(error);
  }
};

export const createGame = async (req, res, next) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

export const updateGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!game) {
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
};

export const deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
