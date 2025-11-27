import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikeReview, createDislikeReview } from "../api";
import toast from "react-hot-toast";

export const useLikeReview = (gameId, reviewId, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createLikeReview(userId, reviewId), // your API function

    onError: (err, newReview, context) => {
      // Rollback to previous state if API call fails
      toast.error("Failed to add review");
      queryClient.setQueryData(["reviews", gameId], context.previousReviews);
    },
    onSettled: () => {
      // Refetch to make sure the cache is synced with the server
      queryClient.invalidateQueries({ queryKey: ["reviews", gameId] });
    },
  });
};

export const useDislikeReview = (gameId, reviewId, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createDislikeReview(userId, reviewId), // your API function
    onError: (err, newReview, context) => {
      // Rollback to previous state if API call fails
      toast.error("Failed to add review");
      queryClient.setQueryData(["reviews", gameId], context.previousReviews);
    },
    onSettled: () => {
      // Refetch to make sure the cache is synced with the server
      queryClient.invalidateQueries({ queryKey: ["reviews", gameId] });
    },
  });
};
