export const updateReview = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_REVIEW_API}/reviews/update/${data.reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("failed to update review");
  const result = await response.json();
  return result;
};
