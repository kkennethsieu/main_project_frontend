import searchedMock from "../mock/searched";

export const fetchSearchGames = async (searchTerm) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    // filter mock data by search term
    return searchedMock.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (!searchTerm) return [];
  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/games/games/search/${searchTerm}`
  );
  if (!res.ok) throw new Error("Error fetching search results");
  const data = await res.json();
  return data.searched;
};
