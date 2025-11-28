import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../main";
import GameForm from "../../components/Game/GameForm";

const GameEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    genre: "",
    releaseYear: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(`/api/games/${id}`);

        if (res.error) {
          setError(res.message || "Impossible de charger le jeu");
          return;
        }

        const game = res.data;
        setData({
          title: game.title || "",
          description: game.description || "",
          price: game.price ?? "",
          rating: game.rating ?? "",
          genre: game.genre || "",
          releaseYear: game.releaseYear ?? "",
          imageUrl: game.imageUrl || "",
        });
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du jeu");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        rating: Number(data.rating),
        releaseYear: data.releaseYear ? Number(data.releaseYear) : undefined,
      };

      const res = await apiService.put(`/api/games/${id}`, payload);

      if (res.error) {
        setError(res.message || "Une erreur est survenue");
        return;
      }

      navigate("/games");
    } catch (err) {
      console.error(err);
      setError("Impossible de mettre à jour le jeu");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data.title) {
    return <p>Chargement du jeu...</p>;
  }

  return (
    <GameForm
      title="Modifier le jeu"
      data={data}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitLabel="Enregistrer"
    />
  );
};

export default GameEdit;
