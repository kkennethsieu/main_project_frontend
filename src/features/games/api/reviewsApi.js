import { mockReviewsStore } from "./mockStore";

export const fetchReviewsWithUser = async (gameId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    return mockReviewsStore.filter((review) => review.gameId == gameId);
  }

  const res = await fetch(
    `${
      import.meta.env.VITE_GATEWAY_API
    }/gateway/review/${gameId}/reviews-with-user`
  );
  if (!res.ok) throw new Error("Error fetching reviews with user");
  const data = await res.json();
  return data;
};
