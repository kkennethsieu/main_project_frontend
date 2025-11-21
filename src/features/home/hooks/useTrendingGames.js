import { useQuery } from "@tanstack/react-query";
import { fetchTrendingGames } from "../api";

export const useTrendingGames = () => {
  return useQuery({
    queryKey: ["trendingGames"],
    queryFn: fetchTrendingGames,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 1,
    select: (data) => data.trendingGames,
    onSuccess: (data) => console.log("Fetched trending games:", data),
    onError: (err) => console.error("Error fetching trending games:", err),
  });
};
