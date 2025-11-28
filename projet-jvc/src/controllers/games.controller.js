import { Game } from "../models/Game.js";

export const getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find()
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });
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
    const payload = { ...req.body };
    if (req.user?.id) {
      payload.createdBy = req.user.id;
    }

    // Empêche la création de doublons par titre (insensible à la casse)
    const existing = await Game.findOne({
      title: new RegExp(`^${payload.title}$`, "i"),
    });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Un jeu avec ce titre existe déjà." });
    }

    const game = new Game(payload);
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
