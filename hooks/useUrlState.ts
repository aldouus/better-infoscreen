"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pendingTimeoutRef = useRef<NodeJS.Timeout>();

  const setUrlState = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Clear any pending timeouts
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
    }

    // Debounce URL updates to prevent rapid changes
    pendingTimeoutRef.current = setTimeout(() => {
      router.replace(`${pathname}${query}`, { scroll: false });
    }, 100);
  }, [pathname, router, searchParams]);

  const getUrlState = useCallback((key: string) => {
    return searchParams.get(key);
  }, [searchParams]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  return {
    setUrlState,
    getUrlState,
  };
}
