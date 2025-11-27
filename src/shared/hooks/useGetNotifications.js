import { fetchNotifications } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useGetNotifications = (userId) => {
  return useQuery({
    queryKey: ["notify", userId],
    queryFn: () => fetchNotifications(userId),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    retry: 1,
    select: (data) => data.data,
    onSuccess: (data) => console.log("Fetched notifications with user", data),
    onError: (err) =>
      console.error("Error fetching notifications with user:", err),
  });
};
