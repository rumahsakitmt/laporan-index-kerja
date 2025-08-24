"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSheetStore } from "../../hooks/use-toggle-report-sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ReportDetail from "./report-detail";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteReportButton from "../delete-report-button";
import { useEditSheetStore } from "../../hooks/use-edit-report";
import { usePathname } from "next/navigation";

export default function ReportSheet() {
  const pathname = usePathname();
  const { openSheet } = useEditSheetStore();
  const { sheet, closeSheet } = useSheetStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet open={sheet.isOpen} onOpenChange={closeSheet}>
        <SheetContent>
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Laporan Index Kerja Id {sheet.reportId}</SheetTitle>
              <SheetDescription>Detail Laporan Index Kerja</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <ReportDetail />
          <SheetFooter>
            {pathname.startsWith("/laporan") && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    openSheet(sheet.reportId);
                  }}
                >
                  Edit
                </Button>
                <DeleteReportButton reportId={sheet.reportId} />
              </>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={sheet.isOpen} onOpenChange={closeSheet}>
      <DrawerContent className="min-h-[50%] max-h-[75%]">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Laporan Index Kerja Id {sheet.reportId}</DrawerTitle>
            <DrawerDescription>Detail Laporan Index Kerja</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>
        <ScrollArea>
          <ReportDetail />
        </ScrollArea>
        <DrawerFooter>
          {pathname.startsWith("/laporan") && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  openSheet(sheet.reportId);
                }}
              >
                Edit
              </Button>
              <DeleteReportButton reportId={sheet.reportId} />
            </>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Keluar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
