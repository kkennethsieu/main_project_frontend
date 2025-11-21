export const fetchSearchGames = async (searchTerm) => {
  if (!searchTerm) return [];
  const res = await fetch(
    `${import.meta.env.VITE_CATALOG_API}/games/search/${searchTerm}`
  );
  if (!res.ok) throw new Error("Error fetching search results");
  const data = await res.json();
  return data.searched;
};
