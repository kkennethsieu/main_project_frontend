import reviewsWithGame from "../mock/reviewsWithGame.json";
export const fetchReviewsWithGames = async (userId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    return reviewsWithGame.filter((review) => review.userId === userId);
  }

  const res = await fetch(
    `${
      import.meta.env.VITE_GATEWAY_API
    }/gateway/user/${userId}/reviews-with-games`
  );
  if (!res.ok) {
    throw new Error("Error FETCHING");
  }
  const data = await res.json();
  return data;
};
