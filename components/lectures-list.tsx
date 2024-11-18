"use client";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { Skeleton } from "@/components/ui/skeleton";
import { LectureCard } from "@/components/lecture-card";

export function LectureList() {
  const { data: lectures, isLoading, isError } = useFetchLectures();

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-neutral-400">Failed to load lectures.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
        {lectures?.map((lecture) => (
          <LectureCard key={lecture.className} lecture={lecture} />
        ))}
      </div>
    </div>
  );
}
