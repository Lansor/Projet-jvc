import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../../main";
import GameCard from "../../components/Card/GameCard.jsx";
import SearchBar from "../../components/SearchBar/index.jsx";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
const [filteredGames, setFilteredGames] = useState([]);
const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();

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
      setFilteredGames(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les jeux");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    apiService.setToken("");
    setCurrentUser(null);
    navigate("/games");
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

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch (e) {
        console.error("Impossible de parser currentUser", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      const filtered = games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredGames(filtered);
    },2000);
    setTypingTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [search, games]);

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
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Liste des jeux vidéo</h1>
        {currentUser && (
          <span className="mt-1 text-lg">Bienvenue {currentUser.username}</span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/games/create">
          <button type="button">Créer un jeu vidéo</button>
        </Link>

        {!currentUser && (
          <>
            <Link to="/auth/sign-up">
              <button type="button">Créer un utilisateur</button>
            </Link>
            <Link to="/auth/sign-in">
              <button type="button">Se connecter</button>
            </Link>
          </>
        )}

        {currentUser && (
          <button type="button" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}

        <SearchBar search={search} onSearchChange={setSearch} />
      </div>
    </div>

    <p>
      Affichage des jeux récupérés depuis l'API (
      {import.meta.env.VITE_API_BASE_URL})
    </p>

    {loading && <p>Chargement des jeux...</p>}
    {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
      <div className="flex flex-col gap-6 mt-8 max-w-3xl mx-auto w-full">

        {games.length === 0 ? (
          <p className="text-center italic text-gray-600 col-span-full">
            Aucun jeu stocké
          </p>
        ) : search === "" ? (
          // Aucun texte dans la barre → liste complète
          games.map((game) => (
            <GameCard key={game._id} game={game} onDelete={handleDelete} />
          ))
        ) : filteredGames.length > 0 ? (
          // Résultats trouvés
          filteredGames.map((game) => (
            <GameCard key={game._id} game={game} onDelete={handleDelete} />
          ))
        ) : (
          // Aucun résultat pour la recherche
          <p className="text-center italic text-gray-600 col-span-full">
            Aucun jeu trouvé pour «{" "}
            <span className="font-semibold">{search}</span> »
          </p>
        )}

      </div>
    )}
  </div>
);
};


export default GamesList;
