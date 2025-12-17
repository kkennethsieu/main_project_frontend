import { mockReviewsStore } from "./mockStore";

export const createReview = async (data) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    const newReview = {
      ...data,
      gameId: String(data.gameId),
      reviewId: Math.random(),
      likesCount: { likes: 0, dislikes: 0 },
      user: {
        username: "You",
        avatarURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        phoneNumber: null,
        userBio: null,
      },
      createdAt: new Date().toISOString(),
    };
    mockReviewsStore.push(newReview);
    return newReview;
  }

  const response = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/reviews/reviews/create`,
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
