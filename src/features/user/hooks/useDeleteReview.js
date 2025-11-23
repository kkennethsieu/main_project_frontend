import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteReview } from "../api/deleteReview";
import toast from "react-hot-toast";

export const useDeleteReview = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({
        queryKey: ["reviews-with-games", userId],
      });

      const previousReviews = queryClient.getQueryData([
        "reviews-with-games",
        userId,
      ]);

      queryClient.setQueryData(["reviews-with-games", userId], (old = []) =>
        old.filter((r) => r.reviewId !== reviewId)
      );

      return { previousReviews };
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews-with-games", userId],
      });
    },
    onError: (err, reviewId, context) => {
      toast.error("Failed to delete review");
      queryClient.setQueryData(
        ["reviews-with-games", userId],
        context.previousReviews
      );
    },
  });
};
