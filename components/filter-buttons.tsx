import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Lecture } from "@/types/lecture";
import { motion } from "motion/react";

type FilterButtonsProps = {
  lectures: Lecture[];
  selectedFilterImgSrc: string;
  setSelectedFilterImgSrc: (value: string) => void;
};

export const FilterButtons = ({
  lectures,
  selectedFilterImgSrc,
  setSelectedFilterImgSrc,
}: FilterButtonsProps) => {
  const uniqueImgSrcs = Array.from(
    new Set(lectures?.map((lecture) => lecture.imgSrc) || []),
  ).filter((imgSrc) => imgSrc !== "");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-row items-center overflow-x-auto gap-2 pb-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Button
          variant={selectedFilterImgSrc === "" ? "default" : "outline"}
          onClick={() => setSelectedFilterImgSrc("")}
          className={cn(
            "rounded-full px-4 py-2 focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:outline-none bg-neutral-950 border-neutral-800 text-white",
            selectedFilterImgSrc === "" && "bg-orange-600 text-white",
          )}
        >
          All
        </Button>
      </motion.div>
      {uniqueImgSrcs.map((imgSrc) => {
        const nameMatch = imgSrc.match(/icon_(.*)\.png/);
        const curriculumName = nameMatch
          ? nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1)
          : "Unknown";

        if (curriculumName === "Undefined") {
          return null;
        }

        return (
          <motion.div key={imgSrc} variants={item}>
            <Button
              variant={selectedFilterImgSrc === imgSrc ? "default" : "outline"}
              onClick={() => setSelectedFilterImgSrc(imgSrc)}
              className={cn(
                "rounded-full px-4 py-2 focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 focus-visible:outline-none bg-neutral-950 border-neutral-800 text-white",
                selectedFilterImgSrc === imgSrc && "bg-orange-600 text-white",
              )}
            >
              {curriculumName}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
