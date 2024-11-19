import { useQuery } from "@tanstack/react-query";

export const useFetchZoomLinks = () => {
  return useQuery({
    queryKey: ["zoomLinks"],
    queryFn: async () => {
      const res = await fetch("/api/lectures");
      if (!res.ok) {
        throw new Error("Failed to fetch Zoom links");
      }
      const data = await res.json();
      return data.zoomLinks;
    },
    staleTime: 1000 * 60 * 5,
  });
};
