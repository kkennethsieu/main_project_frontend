import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../api/createReview";
import toast from "react-hot-toast";

export const useCreateReview = (gameId, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview, // your API function
    onMutate: async (newReview) => {
      // Cancel any outgoing fetches for this game reviews
      await queryClient.cancelQueries({ queryKey: ["reviews", gameId] });

      // Snapshot the previous reviews so we can rollback if the mutation fails
      const previousReviews = queryClient.getQueryData(["reviews", gameId]);

      // Optimistically update the cache by adding the new review
      queryClient.setQueryData(["reviews", gameId], (old = []) => [
        ...old,
        {
          // this is technically fake data just for the UI until the server reponds
          ...newReview,
          // Optional: add a temporary ID so React can track it
          reviewId: Math.random(),
          user: {
            username: "You",
            avatarURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          },
          createdAt: new Date().toISOString(),
        },
      ]);

      // Return context to rollback if needed
      return { previousReviews };
    },
    onSuccess: () => {
      toast.success("Review added successfully");
    },
    onError: (err, newReview, context) => {
      // Rollback to previous state if API call fails
      toast.error("Failed to add review");
      queryClient.setQueryData(["reviews", gameId], context.previousReviews);
    },
    onSettled: () => {
      // Refetch to make sure the cache is synced with the server
      queryClient.invalidateQueries({ queryKey: ["reviews", gameId] });
      queryClient.invalidateQueries({
        queryKey: ["reviews-with-games", userId],
      });
    },
  });
};
