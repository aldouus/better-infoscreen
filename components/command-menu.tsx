"use client";

import React, { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useUrlState } from "@/hooks/useUrlState";
import type { Lecture } from "@/types/lecture";

type CommandMenuProps = {
  lectures: Lecture[];
};

export function CommandMenu({ lectures }: CommandMenuProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { setUrlState } = useUrlState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectLecture = (lecture: Lecture) => {
    setUrlState({ dialog: lecture.className });
    setIsCommandOpen(false);
  };

  return (
    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <Command>
        <CommandInput placeholder="Search for lectures..." />
        <CommandList>
          <CommandEmpty>No lectures found.</CommandEmpty>
          <CommandGroup heading="Lectures">
            {lectures.map((lecture, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleSelectLecture(lecture)}
              >
                {lecture.className}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
