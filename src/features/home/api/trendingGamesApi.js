import trendingMock from "../mock/trendingGames.json";
export const fetchTrendingGames = async () => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    return trendingMock;
  }

  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/games/games/lists/trending`
  );
  if (!res.ok) throw new Error("Failed to fetch trending games");
  const data = await res.json();
  return data.trendingGames;
};
