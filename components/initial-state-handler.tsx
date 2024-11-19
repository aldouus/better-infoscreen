"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { useUrlState } from "@/hooks/useUrlState";

export function InitialStateHandler() {
  const searchParams = useSearchParams();
  const { data: lectures } = useFetchLectures();
  const { setUrlState } = useUrlState();

  useEffect(() => {
    if (!lectures) return;

    const dialogParam = searchParams.get("dialog");
    const sheetParam = searchParams.get("sheet");
    const filterParam = searchParams.get("filter");

    if (dialogParam) {
      const lecture = lectures.find(l => l.className === dialogParam);
      if (lecture) {
        setUrlState({ dialog: lecture.className });
      }
    }

    if (sheetParam) {
      setUrlState({ sheet: sheetParam });
    }

    if (filterParam) {
      setUrlState({ filter: filterParam });
    }
  }, [lectures, searchParams, setUrlState]);

  return null;
}