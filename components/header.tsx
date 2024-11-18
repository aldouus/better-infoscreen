import { Separator } from "@/components/ui/separator";
import { ZoomClassroomSheet } from "@/components/zoom-classroom-sheet";

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 pb-4">
      <div className="flex justify-between gap-6">
        <h1 className="text-4xl text-white font-bold">Infoscreen</h1>
        <ZoomClassroomSheet />
      </div>
      <Separator className="bg-neutral-800" />
    </header>
  );
};
