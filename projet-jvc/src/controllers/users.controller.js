import { User } from "../models/User.js";
import { Game } from "../models/Game.js";

export const getUserProfileWithReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("username email roles createdAt");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const games = await Game.find({ "reviews.user": id }).select(
      "title reviews"
    );

    const reviews = [];

    games.forEach((game) => {
      game.reviews
        .filter((r) => String(r.user) === String(id))
        .forEach((r) => {
          reviews.push({
            gameId: game._id,
            gameTitle: game.title,
            comment: r.comment,
            rating: r.rating,
            createdAt: r.createdAt,
          });
        });
    });

    res.json({ user, reviews });
  } catch (error) {
    next(error);
  }
};
