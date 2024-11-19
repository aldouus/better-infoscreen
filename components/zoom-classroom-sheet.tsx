"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useUrlState } from "@/hooks/useUrlState";
import { useFetchZoomLinks } from "@/hooks/useFetchZoomLinks"

export const ZoomClassroomSheet = () => {
  const { data: zoomLinks, isLoading, isError } = useFetchZoomLinks();
  const { setUrlState, getUrlState } = useUrlState();
  const isOpen = getUrlState("sheet") === "zoom";

  const handleOpenChange = (open: boolean) => {
    setUrlState({ sheet: open ? "zoom" : null });
  };

  if (isLoading) {
    return <p>Loading Zoom Classrooms...</p>;
  }

  if (isError || !zoomLinks) {
    return <p>Failed to load Zoom Classrooms.</p>;
  }

  const validZoomLinks = Object.entries(zoomLinks).filter(([link]) => link);

  return (
    <TooltipProvider delayDuration={0}>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger className="focus-visible:outline-orange-600 outline-none rounded-lg">
          <p className="sr-only">Show Zoom Classrooms</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <PanelRightOpen className="text-neutral-500 hover:text-neutral-300 transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-neutral-800 mr-1">
              <p className="text-white">Show Classrooms</p>
            </TooltipContent>
          </Tooltip>
        </SheetTrigger>
        <SheetContent className="bg-neutral-950 border border-neutral-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Zoom Classrooms</SheetTitle>
          </SheetHeader>
          <Separator className="my-3 bg-neutral-800" />
          <div className="grid grid-cols-2 gap-4">
            {validZoomLinks.map(([title, link]) => (
              <Tooltip key={title}>
                <TooltipTrigger asChild>
                  <Link
                    href={link}
                    target="_blank"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 transition-colors rounded-xl"
                  >
                    <Card className="h-24 flex items-center justify-center text-center p-4 bg-neutral-900 border-neutral-800 text-white hover:border-orange-600">
                      {title}
                    </Card>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-neutral-800 mr-1">
                  <p className="text-white">Join Zoom {link.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
};
