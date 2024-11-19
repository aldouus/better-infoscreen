"use client";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { SkeletonCard } from "@/components/skeleton-card";
import { LectureCard } from "@/components/lecture-card";
import { FilterButtons } from "@/components/filter-buttons";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrlState } from "@/hooks/useUrlState";

export function LectureList() {
  const { data: lectures, isLoading, isError } = useFetchLectures();
  const { setUrlState, getUrlState } = useUrlState();
  const selectedFilterImgSrc = getUrlState("filter") || "";

  const setSelectedFilterImgSrc = (value: string) => {
    setUrlState({ filter: value || null });
  };

  const filteredLectures = lectures?.filter(
    (lecture) =>
      !selectedFilterImgSrc || lecture.imgSrc === selectedFilterImgSrc,
  );

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="flex gap-2 mb-5">
          <Skeleton className="min-h-10 w-12 rounded-full bg-neutral-800" />
        </div>
        <Separator className="bg-neutral-800 mb-6 mt-3" />
        <div
          aria-busy="true"
          aria-live="polite"
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 h-full"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
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
      <FilterButtons
        lectures={lectures || []}
        selectedFilterImgSrc={selectedFilterImgSrc}
        setSelectedFilterImgSrc={setSelectedFilterImgSrc}
      />
      <Separator className="bg-neutral-800 mb-6 mt-3" />
      <motion.div
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.025,
            },
          },
        }}
      >
        {filteredLectures?.map((lecture, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <LectureCard lecture={lecture} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
