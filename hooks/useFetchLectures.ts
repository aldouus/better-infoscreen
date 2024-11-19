import type { Lecture } from "@/types/lecture";
import { useQuery } from "@tanstack/react-query";

export const useFetchLectures = () => {
  return useQuery<Lecture[]>({
    queryKey: ["lectures"],
    queryFn: async () => {
      const res = await fetch("/api/lectures");
      if (!res.ok) {
        throw new Error("Failed to fetch lectures");
      }
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
