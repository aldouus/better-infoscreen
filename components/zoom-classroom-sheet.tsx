import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRightOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const ZoomClassroomSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <PanelRightOpen className="text-neutral-500 hover:text-neutral-300 transition-colors" />
      </SheetTrigger>
      <SheetContent className="bg-neutral-950 border border-neutral-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Zoom Classrooms</SheetTitle>
        </SheetHeader>
        <Separator className="my-3 bg-neutral-800" />
        <div className="flex flex-col gap-2">
          <Link
            href="https://sae.zoom.us/j/96194889062?pwd=QnVhK2k2SS9XUVc1RnF0aFoyNXB3UT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Albis
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/92284858572?pwd=Rm1LakJ5R2xnMHNhanhqbGw3ZnZYdz09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Bellevue
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/98622195082?pwd=TWNzeXdPcWM0ckdZZUNoWHBsckpwUT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Central
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/99391191224?pwd=RmNZNzJHVWRoZ05rekNmbmFMWk1ZUT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Dolder
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/96230449671?pwd=c2Z5di8rSkJGaTByNWhOYlVjdjVNUT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Escher-Wyss
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/92502226632?pwd=VDgwcXVLZ2ZvMGc3VmpTbmdqTng1UT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Üetliberg
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/98771450546?pwd=N2VjNkFQSFAxN3pSeTZvM1NVb1NJQT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Kino
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/99800992162?pwd=V3doeXl6eHRncW1lRklXcU9vMHp0QT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Forum
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/99634860238?pwd=M1drZ1UzemdxV2JqNENzbm5PcU1hdz09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Project Room Green
            <ExternalLink size={16} />
          </Link>
          <Link
            href="https://sae.zoom.us/j/99727799751?pwd=VW1sdkNzTkR6elQ1Qnc2ZnVNaFBPQT09"
            className="flex items-center gap-3 hover:underline hover:text-orange-500 transition-colors"
            target="_blank"
          >
            Project Room Red
            <ExternalLink size={16} />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
