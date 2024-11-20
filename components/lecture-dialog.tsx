"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Lecture } from "@/types/lecture";

type LectureDialogProps = {
  lecture: Lecture;
  open: boolean;
  onClose: () => void;
};

export const LectureDialog = ({
  lecture,
  open,
  onClose,
}: LectureDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Content = (
    <>
      <div className="space-y-2">
        <div className="flex gap-1 items-start">
          {lecture.classType !== "Undefined" && (
            <Badge className="bg-neutral-800">{lecture.classType}</Badge>
          )}
          {lecture.classroom !== "Undefined" && (
            <Badge className="bg-neutral-800">{lecture.classroom}</Badge>
          )}
        </div>
        <h3 className="text-sm text-neutral-400 pt-6">Class</h3>
        <Separator className="bg-neutral-800" />
        <p className="pb-3">{lecture.class || ""}</p>
      </div>
    </>
  );

  const Footer = (
    <>
      {isDesktop ? (
        <>
          <DialogClose asChild>
            <Button className="bg-neutral-800 hover:bg-neutral-950 rounded-full">
              Close
            </Button>
          </DialogClose>
          {lecture.zoomLink && (
            <Button
              asChild
              variant="default"
              className="bg-orange-600 hover:bg-orange-700 rounded-full"
            >
              <a
                href={lecture.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Zoom {lecture.classroom || ""}
              </a>
            </Button>
          )}
        </>
      ) : (
        <>
          {lecture.zoomLink && (
            <Button
              asChild
              variant="default"
              className="bg-orange-600 hover:bg-orange-700 rounded-full"
            >
              <a
                href={lecture.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Zoom {lecture.classroom || ""}
              </a>
            </Button>
          )}
          <DrawerClose asChild>
            <Button className="bg-neutral-800 hover:bg-neutral-950 rounded-full">
              Close
            </Button>
          </DrawerClose>
        </>
      )}
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800">
          <DialogHeader>
            <DialogTitle>
              {lecture.className ||
                lecture.class?.split(" ")[0] ||
                "Zimmerbuchung"}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              {lecture.instructor === "?" ? "" : lecture.instructor || ""}
            </DialogDescription>
          </DialogHeader>
          {Content}
          <DialogFooter>{Footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="bg-neutral-900 text-white border-t border-neutral-800">
        <DrawerHeader className="text-left">
          <DrawerTitle>{lecture.className}</DrawerTitle>
          <DrawerDescription className="text-neutral-400">
            {lecture.instructor}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{Content}</div>
        <DrawerFooter>{Footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
