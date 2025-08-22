"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ReportForm from "./form/report-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useReportFormStore } from "../hooks/use-report-form";

export default function LaporanIndexContainer() {
  const { isOpen, open, close } = useReportFormStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCloseDialog = () => {
    close();
  };

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Form Laporan Index Kerja IT</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>Form Laporan Index Kerja IT.</SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <ScrollArea className="px-8 py-4 overflow-y-auto">
            <ReportForm onHandleDialog={handleCloseDialog} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div>
      <Drawer open={isOpen} onOpenChange={close}>
        <DrawerContent className="min-h-[50%] max-h-[85%]">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Form Laporan Index Kerja
            </DrawerTitle>
            <VisuallyHidden>
              <DrawerDescription>Form Laporan Index Kerja IT</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <ScrollArea className="px-8 overflow-y-auto">
            <ReportForm onHandleDialog={handleCloseDialog} />
          </ScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">
                <ArrowLeft />
                Batal
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
