"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Button } from "./ui/button";
import { useReportFormStore } from "@/features/report/hooks/use-report-form";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";

export default function CreateReportButton({
  className,
}: {
  className?: string;
}) {
  const { session } = useAuth();
  const { open } = useReportFormStore();
  if (!session) return null;
  return (
    <Button
      onClick={() => open()}
      className={cn("float-right hidden sm:flex", className)}
    >
      <Pen className="h-4 w-4" />
      Input Indeks Kerja
    </Button>
  );
}
