export const fetchReviewsWithGames = async (userId) => {
  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/user/${userId}/reviews-with-games`
  );
  if (!res.ok) {
    throw new Error("Error FETCHING");
  }
  return res.json();
};
