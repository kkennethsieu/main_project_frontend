import { useQuery } from "@tanstack/react-query";
import { fetchReviewsWithGames } from "../api";

export const useReviewsWithGame = (userId) => {
  return useQuery({
    queryKey: ["reviews-with-games", userId],
    queryFn: () => fetchReviewsWithGames(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 1,
    select: (data) => data,
    onSuccess: (data) => console.log("Fetched reviews", data),
    onError: (err) => console.error("Error fetching reviews", err),
  });
};
