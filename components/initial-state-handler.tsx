"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchLectures } from "@/hooks/useFetchLectures";
import { useUrlState } from "@/hooks/useUrlState";

export function InitialStateHandler() {
  const searchParams = useSearchParams();
  const { data: lectures, isLoading } = useFetchLectures();
  const { setUrlState } = useUrlState();

  useEffect(() => {
    if (isLoading || !lectures) return;

    const dialogParam = searchParams.get("dialog");
    const sheetParam = searchParams.get("sheet");
    const filterParam = searchParams.get("filter");

    if (dialogParam) {
      const lecture = lectures.find(l => l.className === dialogParam);
      if (!lecture) {
        setUrlState({ dialog: null });
      }
    }

    if (sheetParam && sheetParam !== "zoom") {
      setUrlState({ sheet: null });
    }

    if (filterParam) {
      const validFilter = lectures.some(l => l.imgSrc === filterParam);
      if (!validFilter) {
        setUrlState({ filter: null });
      }
    }
  }, [lectures, isLoading, searchParams, setUrlState]);

  return null;
}