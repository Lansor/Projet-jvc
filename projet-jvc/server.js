import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.APP_PORT || 3000;

// TODO: ajouter les routes (games, auth, etc.)

app.get("/api/health", (req, res) => {
	res.json({ status: "ok" });
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

