"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditSheetStore } from "../../hooks/use-edit-report";
import LaporanIndexForm from "@/features/report/components/form/report-form";

export default function EditReportSheet() {
	const { sheet, closeSheet } = useEditSheetStore();
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
					<div className="p-4">
						<LaporanIndexForm reportId={sheet.reportId} />
					</div>
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
					<div className="p-4">
						<LaporanIndexForm reportId={sheet.reportId} />
					</div>
				</ScrollArea>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">Keluar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
