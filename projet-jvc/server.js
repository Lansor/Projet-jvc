import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/database.js";
import gamesRouter from "./src/routes/games.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.APP_PORT || 3000;

app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
});

// Routes API
app.use("/api/games", gamesRouter);


app.use((err, req, res, next) => {
	console.error("Erreur API :", err);
	res.status(500).json({ message: "Erreur serveur" });
});

const startServer = async () => {
	await connectDB();

	app.listen(port, () => {
		console.log(`Serveur démarré sur http://localhost:${port}`);
	});
};

startServer().catch((error) => {
	console.error("Erreur au démarrage du serveur :", error);
});

export default app;

