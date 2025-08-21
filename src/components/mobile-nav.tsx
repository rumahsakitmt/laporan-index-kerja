"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, FileText, ChartBar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReportFormStore } from "@/features/report/hooks/use-report-form";

interface MobileNavProps {
  userId: string;
}

export default function MobileNav({ userId }: MobileNavProps) {
  const pathname = usePathname();
  const { open } = useReportFormStore();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    if (path === `/laporan/${userId}`) {
      return pathname === `/laporan/${userId}`;
    }
    if (path === "/grafik-lik") {
      return pathname === "/grafik-lik";
    }
    if (path === "/profile") {
      return pathname === "/profile";
    }
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden py-4 rounded-t-4xl shadow-2xl">
      <div className="flex items-center justify-around px-4 py-2">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
            isActive("/")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          href="/grafik-lik"
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
            isActive("/grafik-lik")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ChartBar className="h-5 w-5" />
          <span className="text-xs font-medium">Grafik LIK</span>
        </Link>

        <button
          onClick={open}
          className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <div className="relative">
            <Plus className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <span className="text-xs font-medium">Buat Laporan</span>
        </button>

        <Link
          href={`/laporan/${userId}`}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
            isActive(`/laporan/${userId}`)
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs font-medium">Laporanku</span>
        </Link>

        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
            isActive("/profile")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
