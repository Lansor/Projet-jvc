import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../../../main";

const SignIn = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Merci de remplir les deux champs");
			return;
		}

		try {
			setLoading(true);
			const res = await apiService.post("/api/auth/login", {
				email,
				password,
			});

			if (res.error) {
				setError(res.message || "Identifiants invalides");
				return;
			}

			const { token, user } = res.data;
			if (token) {
				localStorage.setItem("accessToken", token);
				apiService.setToken(token);
			}
			if (user) {
				localStorage.setItem("currentUser", JSON.stringify(user));
			}

			navigate("/games");
		} catch (err) {
			console.error(err);
			setError("Erreur lors de la connexion");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold text-center">Connexion</h1>
			<form
				className="mt-8 max-w-lg flex flex-col gap-2 mx-auto w-full"
				onSubmit={handleSubmit}
			>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <p className="mt-2" style={{ color: "red" }}>{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 bg-blue-600 text-white mt-4"
				>
					{loading ? "Connexion..." : "Se connecter"}
				</button>
			</form>
			<Link
				to="/auth/sign-up"
				className="text-white/75 text-bold mt-4 w-fit mx-auto underline"
			>
				Je n'ai pas de compte
			</Link>
		</div>
	);
};

export default SignIn;

