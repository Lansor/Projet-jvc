import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../main";

const GameCreate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    genre: "",
    releaseYear: "",
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
    <div>
      <h1>Créer un jeu vidéo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input
          name="title"
          placeholder="Titre"
          value={data.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Prix"
          value={data.price}
          onChange={handleChange}
        />
        <input
          name="rating"
          type="number"
          placeholder="Note (0-5)"
          value={data.rating}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={data.genre}
          onChange={handleChange}
        />
        <input
          name="releaseYear"
          type="number"
          placeholder="Année de sortie"
          value={data.releaseYear}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default GameCreate;
