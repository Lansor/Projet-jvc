import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ game, onDelete }) => {
	return (
		<div className="game-card">
			<div className="game-card-main">
				{/* Colonne gauche : image ou placeholder */}
				<div className="game-card-cover" aria-hidden="true">
					<span className="game-card-cover-title">
						{game.title?.[0] || "?"}
					</span>
				</div>
				{/* Colonne droite : infos du jeu */}
				<div className="game-card-content">
					<div className="game-card-header">
						<h2 className="game-card-title">{game.title}</h2>
						{game.platforms && (
							<div className="game-card-platforms">{game.platforms}</div>
						)}
					</div>
					<p className="game-card-description">{game.description}</p>
					<div className="game-card-meta">
						{game.price && <span>Prix : {game.price} €</span>}
						{game.rating && <span>Note : {game.rating} / 5</span>}
						{game.genre && <span>Genre : {game.genre}</span>}
						{game.releaseYear && <span>Année : {game.releaseYear}</span>}
					</div>
				</div>
			</div>
			<div className="game-card-footer">
				<div className="game-card-footer-item game-card-footer-main">
					<div className="game-card-score">{game.rating ? `${game.rating * 4}/20` : "-"}</div>
					<small>Note globale</small>
				</div>
				<div className="game-card-footer-actions">
					{game.createdBy?.username && (
						<span
							className="game-card-added-by"
							style={{ flex: 1, textAlign: "center" }}
						>
							Ajouté par : {game.createdBy.username}
						</span>
					)}
					<Link to={`/games/edit/${game._id}`} className="game-card-footer-link">
						Modifier
					</Link>
					<button
						 type="button"
						 className="game-card-footer-link game-card-footer-danger"
						 onClick={() => onDelete(game._id)}
					>
						Supprimer
					</button>
				</div>
			</div>
		</div>
	);
};

export default GameCard;
