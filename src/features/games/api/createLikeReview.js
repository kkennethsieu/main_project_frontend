export const createLikeReview = async (userId, reviewId) => {
  const response = await fetch(
    `${import.meta.env.VITE_LIKE_API}/likes/like/${userId}/${reviewId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("failed to like a review");
  const result = await response.json();
  return result;
};

export const createDislikeReview = async (userId, reviewId) => {
  const response = await fetch(
    `${import.meta.env.VITE_LIKE_API}/likes/dislike/${userId}/${reviewId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("failed to dislike a review");
  const result = await response.json();
  return result;
};
