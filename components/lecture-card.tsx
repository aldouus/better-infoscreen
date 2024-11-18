import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import type { Lecture } from "@/types/lecture";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function LectureCard({ lecture }: { lecture: Lecture }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const OpenDialogContent = (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{lecture.className}</DialogTitle>
        <DialogDescription className="text-neutral-400">
          {lecture.instructor}
        </DialogDescription>
      </DialogHeader>

      <div className="flex gap-1 items-start">
        <Badge className="bg-neutral-800">{lecture.classType}</Badge>
        <Badge className="bg-neutral-800">{lecture.classroom}</Badge>
      </div>

      <h3 className="text-sm text-neutral-400 pt-6">Class</h3>
      <Separator className="bg-neutral-800" />
      <p className="py-3">{lecture.class}</p>
    </div>
  );

  const DesktopFooterContent = (
    <>
      <DialogClose asChild>
        <Button
          variant="default"
          className="bg-neutral-800 hover:bg-neutral-950 rounded-full"
        >
          Close
        </Button>
      </DialogClose>
      {lecture.zoomLink && (
        <Button
          asChild
          variant="default"
          className="bg-orange-600 hover:bg-orange-700 rounded-full"
        >
          <a href={lecture.zoomLink} target="_blank" rel="noopener noreferrer">
            Join Zoom {lecture.classroom}
          </a>
        </Button>
      )}
    </>
  );

  const MobileFooterContent = (
    <>
      {lecture.zoomLink && (
        <Button
          asChild
          variant="default"
          className="bg-orange-600 hover:bg-orange-700 rounded-full"
        >
          <a href={lecture.zoomLink} target="_blank" rel="noopener noreferrer">
            Join Zoom {lecture.classroom}
          </a>
        </Button>
      )}
      <DrawerClose asChild>
        <Button
          variant="default"
          className="bg-neutral-800 hover:bg-neutral-950 rounded-full"
        >
          Close
        </Button>
      </DrawerClose>
    </>
  );

  const Trigger = (
    <Card className="bg-neutral-900 border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors min-w-[300px] w-full">
      <CardHeader className="flex flex-row items-start gap-3 p-3">
        <div className="relative w-8 h-8">
          <Image
            src={lecture.imgSrc}
            alt={lecture.className || "Untitled"}
            fill
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
          <CardTitle className="text-white">{lecture.className}</CardTitle>
          <p className="text-sm text-neutral-400">{lecture.instructor}</p>
        </div>
        <div className="flex gap-1">
          <Badge className="bg-neutral-800">{lecture.classType}</Badge>
          <Badge className="bg-neutral-800">{lecture.classroom}</Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800 flex flex-col justify-between">
          {OpenDialogContent}
          <DialogFooter className="mt-auto">
            {DesktopFooterContent}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent className="bg-neutral-900 text-white border-t border-neutral-800">
        <DrawerHeader className="text-left">
          <DrawerTitle>{lecture.className}</DrawerTitle>
          <DrawerDescription className="text-neutral-400">
            {lecture.instructor}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="flex gap-1 items-start">
            <Badge className="bg-neutral-800">{lecture.classType}</Badge>
            <Badge className="bg-neutral-800">{lecture.classroom}</Badge>
          </div>
          <h3 className="text-sm text-neutral-400 pt-6 pb-1">Class</h3>
          <Separator className="bg-neutral-800" />
          <p className="py-3">{lecture.class}</p>
        </div>
        <DrawerFooter className="mt-auto">{MobileFooterContent}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
