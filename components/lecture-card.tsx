import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Clock } from "lucide-react";
import { LectureDialog } from "@/components/lecture-dialog";
import type { Lecture } from "@/types/lecture";

export function LectureCard({ lecture }: { lecture: Lecture }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        tabIndex={0}
        onClick={() => setOpen(true)}
        role="button"
        aria-pressed={open}
        className="bg-neutral-900 border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors min-w-[300px] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset"
      >
        <CardHeader className="flex flex-row items-start gap-3 p-3">
          <div className="relative w-8 h-8">
            <Image
              src={lecture.imgSrc}
              alt={lecture.className || "Untitled"}
              fill
              sizes="128px"
              className="rounded-full object-cover"
            />
          </div>
          <p className="flex gap-2 items-center text-neutral-400 text-xs font-semibold ml-auto pr-2">
            <Clock size={16} />
            {lecture.time}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-3">
          <div>
            <CardTitle className="text-white">
              {lecture.className || "Undefined"}
            </CardTitle>
            <p className="text-sm text-neutral-400">
              {lecture.instructor === "?"
                ? "Unknown"
                : lecture.instructor || "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-white">{lecture.class || "Unknown"}</p>
          </div>
          <div className="flex gap-1">
            <Badge className="bg-neutral-800">
              {lecture.classType || "Undefined"}
            </Badge>
            <Badge className="bg-neutral-800">
              {lecture.classroom || "Undefined"}
            </Badge>
          </div>
        </CardContent>
      </Card>
      <LectureDialog
        lecture={lecture}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
