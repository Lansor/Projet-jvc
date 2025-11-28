import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../main";
import GameForm from "../../components/Game/GameForm";

const GameCreate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    genre: "",
    releaseYear: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const res = await apiService.post("/api/games", payload);

      if (res.error) {
        setError(res.message || "Une erreur est survenue");
        return;
      }

      navigate("/games");
    } catch (err) {
      console.error(err);
      setError("Impossible de créer le jeu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameForm
      title="Créer un jeu vidéo"
      data={data}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitLabel="Créer"
    />
  );
};

export default GameCreate;
