import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateReview } from "../api/updateReview";
import toast from "react-hot-toast";

export const useUpdateReview = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    // Optimistic update before server responds
    onMutate: async (updatedReview) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews-with-games", userId],
      });

      const previousReviews = queryClient.getQueryData([
        "reviews-with-games",
        userId,
      ]);

      queryClient.setQueryData(["reviews-with-games", userId], (old = []) =>
        old.map((r) =>
          r.reviewId === updatedReview.reviewId ? { ...r, ...updatedReview } : r
        )
      );

      return { previousReviews };
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
    },
    onError: (err, updatedReview, context) => {
      // Rollback if error
      toast.error("Failed to update review");
      queryClient.setQueryData(
        ["reviews-with-games", userId],
        context.previousReviews
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews-with-games", userId],
      });
    },
  });
};
