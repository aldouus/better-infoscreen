import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto mx-auto w-full text-neutral-400">
      <Separator className="bg-neutral-800 my-3" />
      <div className="flex justify-between items-center">
        <small>&copy; SAE Institute 2024</small>
        <Link
          target="_blank"
          href="https://www.sae.edu/che/datenschutz/"
          className="hover:underline"
        >
          <small>Privacy Policy</small>
        </Link>
      </div>
    </footer>
  );
};
