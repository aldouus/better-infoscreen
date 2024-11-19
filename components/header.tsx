import { ZoomClassroomSheet } from "@/components/zoom-classroom-sheet";
import { Diciplines } from "./diciplines";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 pb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
        <Image
          src="/img/sae-logo.png"
          alt="SAE logo"
          width={0}
          height={0}
          priority
          sizes="512px"
          className="w-auto h-auto max-h-[64px] min-h-[64px]"
        />
        <Diciplines />
      </div>
      <div className="flex justify-between gap-6 pt-4">
        <h1 className="text-4xl text-white font-bold">Infoscreen</h1>
        <ZoomClassroomSheet />
      </div>
    </header>
  );
};
