import { mockReviewsStore, mockLikesStore } from "./mockStore";

export const createLikeReview = async (userId, reviewId, authorId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    //if we want to use fake data, we need to replicae what we do in the backend
    const existingLikeIndex = mockLikesStore.findIndex(
      (like) => like.userId === userId && like.reviewId === reviewId
    );
    // 3 options, already liked, already disliked, or new
    const review = mockReviewsStore.find((r) => r.reviewId === reviewId);

    if (existingLikeIndex !== -1) {
      const existingLike = mockLikesStore[existingLikeIndex];
      //it is liked already, we want to unlke it
      if (existingLike.isLike === 1) {
        mockLikesStore.splice(existingLikeIndex, 1);
        if (review) {
          review.likesCount.likes -= 1;
        }
      } else {
        //its disliked
        existingLike.isLike = 1;
        review.likesCount.dislikes -= 1;
        review.likesCount.likes += 1;
      }
    } else {
      mockLikesStore.push({
        likeid: Date.now(),
        userId,
        reviewId,
        isLike: 1,
        createdAt: new Date().toISOString(),
      });
      if (review) {
        review.likesCount.likes += 1;
      }
    }
    return { success: true }; // ← ADD THIS!
  }

  // Real API call
  const response = await fetch(
    `${
      import.meta.env.VITE_GATEWAY_API
    }/api/likes/likes/like/${userId}/${reviewId}/${authorId}`,
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

export const createDislikeReview = async (userId, reviewId, authorId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    //if we want to use fake data, we need to replicae what we do in the backend
    const existingLikeIndex = mockLikesStore.findIndex(
      (like) => like.userId === userId && like.reviewId === reviewId
    );

    const review = mockReviewsStore.find((r) => r.reviewId === reviewId);

    if (existingLikeIndex !== -1) {
      const existingLike = mockLikesStore[existingLikeIndex];
      //it is liked already, we want to unlke it
      if (existingLike.isLike === 0) {
        mockLikesStore.splice(existingLikeIndex, 1);
        if (review) {
          review.likesCount.dislikes -= 1;
        }
      } else {
        existingLike.isLike = 0;
        review.likesCount.dislikes += 1;
        review.likesCount.likes -= 1;
      }
    } else {
      mockLikesStore.push({
        likeid: Date.now(),
        userId,
        reviewId,
        isLike: 0,
        createdAt: new Date().toISOString(),
      });
      if (review) {
        review.likesCount.dislikes += 1;
      }
    }
    return { success: true }; // ← ADD THIS!
  }

  const response = await fetch(
    `${
      import.meta.env.VITE_GATEWAY_API
    }/api/likes/likes/dislike/${userId}/${reviewId}/${authorId}`,
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
