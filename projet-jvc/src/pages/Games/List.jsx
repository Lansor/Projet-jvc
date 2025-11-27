import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../main";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiService.get("/games");

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

    fetchGames();
  }, []);

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
        <div className="grid grid-cols-4 gap-4">
          {games?.length ? (
            games.map((game) => (
              <div
                key={game._id}
                className="border rounded p-4 flex flex-col gap-2"
              >
                <h2 className="font-semibold">{game.name}</h2>
                <p>{game.description}</p>
                <p>{game.price} €</p>
              </div>
            ))
          ) : (
            <p className="italic text-lg">Aucune donnée disponible</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GamesList;
