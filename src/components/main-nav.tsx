import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, NotebookPen, User2 } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./sign-out-button";
import Link from "next/link";
import GoogleSigninButton from "./google-signin-button";
import { allowedRole } from "@/lib/utils";
import { ModeToggle } from "./toogle-mode";
import MainNavLink from "./main-nav-link";
import MobileNav from "./mobile-nav";

export default async function MainNavigation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <nav className="w-full p-4 px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/images/android-chrome-512x512.png"
              width={30}
              height={30}
              alt="Logo Index Kerja IT"
              className="rounded-md"
            />
            <div className="text-xs font-bold flex flex-col items-start uppercase">
              <p>Laporan</p>
              <p>Index Kerja IT</p>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <MainNavLink userId={session.user.id} />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session.user.image ?? ""} />
                    <AvatarFallback>
                      {session.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allowedRole(session.user.role ?? "") && (
                    <>
                      <Link href={`/laporan/${session.user.id}`}>
                        <DropdownMenuItem>
                          <NotebookPen />
                          Laporanku
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/ruangan">
                        <DropdownMenuItem>
                          <DoorOpen />
                          Ruangan
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User2 />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <GoogleSigninButton />
            </div>
          )}
          <ModeToggle />
        </div>
      </nav>
      {session && <MobileNav userId={session.user.id} />}
    </>
  );
}
