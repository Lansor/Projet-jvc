import { User } from "../models/User.js";

// Retourne un profil utilisateur simple, sans reviews
export const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("username email");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
