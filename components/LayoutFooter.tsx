import Link from "next/link";
import { Icons } from "./icons";
import { Instagram } from "lucide-react";

const LayoutFooter = () => {
  const email = "contacto.alterego4k@gmail.com";
  return (
    <footer className="bg-black py-3 md:py-8 w-full">
      <div className="container max-w-5xl flex flex-col justify-center items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logoWhite className="size-24 text-white" aria-hidden="true" />
          <span className="sr-only">Alter ego 4K</span>
        </Link>
        <Link
          href="https://www.instagram.com/alterego4k/"
          target="_blank"
          className="text-muted-foreground hover:text-white transition-colors mb-5"
        >
          <Instagram />
        </Link>
        <Link
          className="text-muted-foreground hover:text-white transition-colors text-sm mb-5 md:mb-1"
          href={`mailto:${email}`}
        >
          contacto.alterego4k@gmail.com
        </Link>
      </div>
    </footer>
  );
};

export default LayoutFooter;
