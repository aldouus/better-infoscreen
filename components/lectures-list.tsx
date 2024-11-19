"use client";

import React, { useState } from "react";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { Skeleton } from "@/components/ui/skeleton";
import { LectureCard } from "@/components/lecture-card";
import { FilterButtons } from "@/components/filter-buttons";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export function LectureList() {
  const { data: lectures, isLoading, isError } = useFetchLectures();
  const [selectedFilterImgSrc, setSelectedFilterImgSrc] = useState("");

  const filteredLectures = lectures?.filter(
    (lecture) =>
      !selectedFilterImgSrc || lecture.imgSrc === selectedFilterImgSrc,
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-2xl" />
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
