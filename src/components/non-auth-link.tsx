"use client";

import { ChartBar } from "lucide-react";
import { buttonVariants } from "./ui/button";
import GoogleSigninButton from "./google-signin-button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NonAuthLink() {
  const path = usePathname();
  return (
    <div className="items-center gap-2 hidden sm:flex">
      <GoogleSigninButton />
      <Link
        className={buttonVariants({
          variant: "ghost",
          className:
            path === `/grafik-lik`
              ? "text-primary hover:text-primary hover:underline hover:underline-offset-2"
              : "hover:underline hover:underline-offset-2",
        })}
        href={`/grafik-lik`}
      >
        <ChartBar /> Grafik Index Kerja
      </Link>
    </div>
  );
}
