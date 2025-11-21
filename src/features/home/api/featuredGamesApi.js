export const fetchFeaturedGames = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_CATALOG_API}/games/lists/featured`
  );
  if (!res.ok) throw new Error("Error fetching featured games");
  return res.json();
};
