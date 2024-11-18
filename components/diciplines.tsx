import { AudioIcon } from "@/components/svg/audio-icon";
import { CrossMediaIcon } from "@/components/svg/crossmedia-icon";
import { FilmIcon } from "@/components/svg/film-icon";
import { GamesIcon } from "@/components/svg/games-icon";
import { DesignIcon } from "@/components/svg/design-icon";
import { CreativeTechIcon } from "@/components/svg/creative-tech-icon";
import { AnimationIcon } from "@/components/svg/animation-icon";
import { WebIcon } from "@/components/svg/web-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Diciplines: React.FC = () => {
  return (
    <div className={cn("container", "footer_top-carousel")}>
      <div>
        <div className="flex gap-3 items-center">
          <Link
            href="https://www.sae.edu/che/audio-engineering-ausbildung-studium/"
            target="_blank"
          >
            <AudioIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/content-creation-online-marketing-ausbildung-studium/"
            target="_blank"
          >
            <CrossMediaIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/film-production-ausbildung-studium/"
            target="_blank"
          >
            <FilmIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/game-art-3d-animation-ausbildung-studium/"
            target="_blank"
          >
            <GamesIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/graphic-design-ausbildung-und-studium/"
            target="_blank"
          >
            <DesignIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/software-engineering-ausbildung-und-studium/"
            target="_blank"
          >
            <CreativeTechIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/visual-effects-vfx-3d-animation-ausbildung-studium/"
            target="_blank"
          >
            <AnimationIcon className="h-full w-full" />
          </Link>

          <Link
            href="https://www.sae.edu/che/webdesign-development-ausbildung-studium/"
            target="_blank"
          >
            <WebIcon className="h-full w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};
