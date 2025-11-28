export default function SearchBar({ search, onSearchChange }) {
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="Rechercher un jeu..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          w-full
          px-4 py-2
          rounded-xl
          border border-gray-300
          shadow-sm
          bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
        "
      />
    </div>
  );
}
