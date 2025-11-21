import { useQuery } from "@tanstack/react-query";
import { fetchSearchGames } from "../api/searchApi";

export const useSearchGames = (searchTerm) => {
  return useQuery({
    queryKey: ["searchGames", searchTerm], // dynamic key
    queryFn: () => fetchSearchGames(searchTerm),
    enabled: !!searchTerm, // only fetch if searchTerm exists
    staleTime: 1000 * 60 * 5, // cache for 5 mins
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });
};
