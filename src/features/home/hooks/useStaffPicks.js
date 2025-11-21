import { useQuery } from "@tanstack/react-query";
import { fetchStaffPicks } from "../api";

export const useStaffPicks = () => {
  return useQuery({
    queryKey: ["staffPicks"],
    queryFn: fetchStaffPicks,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 1,
    select: (data) => data.staffPicks,
    onSuccess: (data) => console.log("Fetched staff picks games:", data),
    onError: (err) => console.error("Error fetching staff picks games:", err),
  });
};
