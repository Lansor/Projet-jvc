import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch (err) {
    console.error("Erreur auth JWT", err);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
