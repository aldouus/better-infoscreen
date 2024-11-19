"use client";
import { AudioIcon } from "@/components/svg/audio-icon";
import { CrossMediaIcon } from "@/components/svg/crossmedia-icon";
import { FilmIcon } from "@/components/svg/film-icon";
import { GamesIcon } from "@/components/svg/games-icon";
import { DesignIcon } from "@/components/svg/design-icon";
import { CreativeTechIcon } from "@/components/svg/creative-tech-icon";
import { AnimationIcon } from "@/components/svg/animation-icon";
import { WebIcon } from "@/components/svg/web-icon";
import Link from "next/link";
import { motion } from "motion/react";

export const Diciplines: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div>
      <motion.div
        className="flex gap-4 items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/audio-engineering-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <AudioIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Audio Engineering Education and Studies</p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/content-creation-online-marketing-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <CrossMediaIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">
              Content Creation and Online Marketing Education
            </p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/film-production-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <FilmIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Film Production Education and Studies</p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/game-art-3d-animation-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <GamesIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Game Art and 3D Animation Education</p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/graphic-design-ausbildung-und-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <DesignIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Graphic Design Education and Studies</p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/software-engineering-ausbildung-und-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <CreativeTechIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">
              Software Engineering Education and Studies
            </p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/visual-effects-vfx-3d-animation-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <AnimationIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Visual Effects and 3D Animation Education</p>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="https://www.sae.edu/che/webdesign-development-ausbildung-studium/"
            target="_blank"
            className="focus-visible:outline focus-visible:outline-orange-600 focus-visible:rounded-full"
          >
            <WebIcon className="h-8 w-full max-h-[32px]" />
            <p className="sr-only">Web Design and Development Education</p>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
