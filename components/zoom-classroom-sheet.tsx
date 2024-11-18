import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRightOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { zoomLinks } from "@/mocks/links";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ZoomClassroomSheet = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Sheet>
        <SheetTrigger>
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
          <div className="flex flex-col gap-2">
            {zoomLinks.map((link) => (
              <Tooltip key={link.id}>
                <TooltipTrigger>
                  <Link
                    href={link.link}
                    className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
                    target="_blank"
                  >
                    {link.title}
                    <ExternalLink size={16} />
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
