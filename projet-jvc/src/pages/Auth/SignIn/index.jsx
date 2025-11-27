import React, { useState } from "react";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			setMessage("Merci de remplir les deux champs");
			return;
		}
		setMessage("Connexion non encore implémentée (auth plus tard)");
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
				<button type="submit" className="px-4 py-2 bg-blue-600 text-white mt-4">
					Se connecter
				</button>
				{message && <p className="mt-2">{message}</p>}
			</form>
		</div>
	);
};

export default SignIn;