import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connection à la base de données effectuée.");
	} catch (error) {
		console.error("Erreur de connexion à la base de données : ", error);
		process.exit(1);
	}
};