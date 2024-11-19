import { useQuery } from "@tanstack/react-query";

type ZoomLinks = Record<string, string>;

export const useFetchZoomLinks = () => {
  return useQuery<ZoomLinks>({
    queryKey: ["zoomLinks"],
    queryFn: async () => {
      const res = await fetch("/api/lectures");
      if (!res.ok) {
        throw new Error("Failed to fetch Zoom links");
      }
      const data = await res.json();

      if (!data.zoomLinks || Object.keys(data.zoomLinks).length === 0) {
        throw new Error("No zoom links available");
      }

      return data.zoomLinks;
    },
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};
