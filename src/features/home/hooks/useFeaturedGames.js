import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedGames } from "../api";

export const useFeaturedGames = () => {
  return useQuery({
    queryKey: ["featuredGames"],
    queryFn: fetchFeaturedGames,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 1,
    select: (data) => data.featured,
    onSuccess: (data) => console.log("Fetched featured games:", data),
    onError: (err) => console.error("Error fetching featured games:", err),
  });
};
