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
import { LectureDialog } from "@/components/lecture-dialog";
import type { Lecture } from "@/types/lecture";

type CommandMenuProps = {
  lectures: Lecture[];
};

export function CommandMenu({ lectures }: CommandMenuProps) {
  const [openLecture, setOpenLecture] = useState<Lecture | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

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

  return (
    <>
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Search for lectures..." />
          <CommandList>
            <CommandEmpty>No lectures found.</CommandEmpty>
            <CommandGroup heading="Lectures">
              {lectures.map((lecture, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setOpenLecture(lecture);
                    setIsCommandOpen(false);
                  }}
                >
                  {lecture.className}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {openLecture && (
        <LectureDialog
          lecture={openLecture}
          open={!!openLecture}
          onClose={() => setOpenLecture(null)}
        />
      )}
    </>
  );
}
