import featuredMock from "../mock/featuredGames";

export const fetchFeaturedGames = async () => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    return featuredMock;
  }

  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/games/games/lists/featured`
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Error fetching featured games");
  return data.featured;
};
