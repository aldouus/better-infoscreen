"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setUrlState = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const getUrlState = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  return {
    setUrlState,
    getUrlState,
  };
}
