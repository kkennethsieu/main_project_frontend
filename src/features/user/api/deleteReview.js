export const deleteReview = async (reviewId) => {
  const res = await fetch(
    `${import.meta.env.VITE_REVIEW_API}/reviews/delete/${reviewId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
};
