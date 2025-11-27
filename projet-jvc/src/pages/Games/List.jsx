import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../main";
import GameCard from "../../components/Card/GameCard.jsx";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await apiService.get("/api/games");

      if (res.error) {
        setError(res.message || "Une erreur est survenue");
        return;
      }

      setGames(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les jeux");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        await fetchGames();
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce jeu ?")) return;

    try {
      const res = await apiService.delete(`/api/games/${id}`);
      if (res.error) {
        alert(res.message || "Erreur lors de la suppression");
        return;
      }
      // recharger la liste
      fetchGames();
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors de la suppression");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Liste des jeux vidéo</h1>
        <Link to="/games/create">
          <button type="button">Créer un jeu vidéo</button>
        </Link>
      </div>

      <p>
        Affichage des jeux récupérés depuis l'API (
        {import.meta.env.VITE_API_BASE_URL})
      </p>

      {loading && <p>Chargement des jeux...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-6 mt-8 max-w-3xl mx-auto w-full">
          {games?.length ? (
            games.map((game) => (
              <GameCard key={game._id} game={game} onDelete={handleDelete} />
            ))
          ) : (
            <p className="italic text-lg text-center">Aucune donnée disponible</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GamesList;
