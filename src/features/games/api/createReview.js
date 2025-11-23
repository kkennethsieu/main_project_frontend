export const createReview = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_REVIEW_API}/reviews/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("failed to create review");
  const result = await response.json();
  return result;
};
