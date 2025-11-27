import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import GamesList from "./pages/Games/List.jsx";
import GameCreate from "./pages/Games/Create.jsx";
import GameEdit from "./pages/Games/Edit.jsx";
import SignIn from "./pages/Auth/SignIn/index.jsx";

const Router = () => {
	return (
		<BrowserRouter>
			<div className="container">
				<Routes>
					<Route path="/auth/sign-in" element={<SignIn />} />
					<Route path="/games" element={<GamesList />} />
					<Route path="/games/create" element={<GameCreate />} />
					<Route path="/games/edit/:id" element={<GameEdit />} />
					<Route path="*" element={<Navigate to="/games" replace />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default Router;
