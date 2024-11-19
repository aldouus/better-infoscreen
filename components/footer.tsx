import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer>
      <Separator className="bg-neutral-800 py-3" />
      <small>&copy; SAE Institute 2024</small>
      <Link href="https://www.sae.edu/che/datenschutz/">Privacy Policy</Link>
    </footer>
  );
};
