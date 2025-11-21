export const fetchTrendingGames = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_CATALOG_API}/games/lists/trending`
  );
  if (!res.ok) throw new Error("Failed to fetch trending games");
  return res.json();
};
