"use client";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { SkeletonCard } from "@/components/skeleton-card";
import { LectureCard } from "@/components/lecture-card";
import { FilterButtons } from "@/components/filter-buttons";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useState, useCallback } from "react";

export function LectureList() {
  const { data: lectures, isLoading, isError } = useFetchLectures();
  const { setUrlState, getUrlState } = useUrlState();
  const [selectedFilter, setSelectedFilterState] = useState(
    getUrlState("filter") || "",
  );

  const setSelectedFilter = useCallback(
    (value: string) => {
      const iconName = value
        ? value.split("/").pop()?.replace("icon_", "").replace(".png", "")
        : null;
      setUrlState({ filter: iconName || null });
      setSelectedFilterState(iconName || "");

      const newUrl = new URL(window.location.href);
      if (iconName) {
        newUrl.searchParams.set("filter", iconName);
      } else {
        newUrl.searchParams.delete("filter");
      }
      window.history.pushState({}, "", newUrl);
    },
    [setUrlState],
  );

  useEffect(() => {
    const urlFilter = new URLSearchParams(window.location.search).get("filter");
    if (urlFilter) {
      setSelectedFilter(urlFilter);
    }
  }, [setSelectedFilter]);

  const filteredLectures = lectures?.filter(
    (lecture) => !selectedFilter || lecture.imgSrc.includes(selectedFilter),
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full max-w-[2560px] w-full"
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
        selectedFilterImgSrc={selectedFilter}
        setSelectedFilterImgSrc={setSelectedFilter}
      />
      <Separator className="bg-neutral-800 mb-6 mt-3" />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-[2560px]"
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
