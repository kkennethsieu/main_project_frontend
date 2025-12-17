import gamesMock from "../mock/gamesMock.json";

export const fetchGameWithId = async (gameId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    const mockData = gamesMock.find((game) => game.id === Number(gameId));
    return mockData;
  }

  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/games/games/id/${gameId}`
  );
  if (!res.ok) throw new Error("Error fetching game");
  const data = await res.json();
  return data;
};
