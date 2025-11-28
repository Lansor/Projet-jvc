import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../main";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
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
      const res = await apiService.post("/api/auth/signup", data);

      if (res.error) {
        setError(res.message || "Une erreur est survenue");
        return;
      }

      navigate("/auth/sign-in");
    } catch (err) {
      console.error(err);
      setError("Impossible de créer le compte utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Créer un compte</h1>
      <form
        className="mt-8 max-w-lg flex flex-col gap-2 mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <input
          name="username"
          placeholder="Nom d'utilisateur"
          value={data.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={data.password}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
