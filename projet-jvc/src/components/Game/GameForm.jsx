import React from "react";

const GameForm = ({
  title,
  data,
  onChange,
  onSubmit,
  loading,
  error,
  submitLabel,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl px-8 py-6 w-full max-w-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-300" htmlFor="title">
              Titre
            </label>
            <input
              id="title"
              name="title"
              placeholder="Ex: The Witcher 3"
              value={data.title}
              onChange={onChange}
              className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-300" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Résumé du jeu"
              value={data.description}
              onChange={onChange}
              className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300" htmlFor="price">
                Prix
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Ex: 59.99"
                value={data.price}
                onChange={onChange}
                className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300" htmlFor="rating">
                Note (0-5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                placeholder="Ex: 4.5"
                value={data.rating}
                onChange={onChange}
                className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300" htmlFor="genre">
                Genre
              </label>
              <input
                id="genre"
                name="genre"
                placeholder="Action, Aventure..."
                value={data.genre}
                onChange={onChange}
                className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-300" htmlFor="releaseYear">
                Année de sortie
              </label>
              <input
                id="releaseYear"
                name="releaseYear"
                type="number"
                placeholder="Ex: 2017"
                value={data.releaseYear}
                onChange={onChange}
                className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-300" htmlFor="imageUrl">
              URL de l'image
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://..."
              value={data.imageUrl}
              onChange={onChange}
              className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? `${submitLabel}...` : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
