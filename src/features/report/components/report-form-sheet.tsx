"use client";

import React from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
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
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import ReportForm from "./form/report-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function LaporanIndexContainer() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button size="sm" className="w-full md:w-max">
						<NotebookPen />
						Buat Laporan
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Form Laporan Index Kerja IT</SheetTitle>
						<VisuallyHidden>
							<SheetDescription>
								This action cannot be undone. This will permanently delete your account
								and remove your data from our servers.
							</SheetDescription>
						</VisuallyHidden>
					</SheetHeader>
					<ScrollArea className="px-8 py-4 overflow-y-auto">
						<ReportForm />
					</ScrollArea>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div>
			<Drawer>
				<DrawerTrigger asChild>
					<Button size="sm" className="w-full md:w-max">
						<NotebookPen />
						Buat Laporan
					</Button>
				</DrawerTrigger>
				<DrawerContent className="min-h-[90%]">
					<DrawerHeader>
						<DrawerTitle className="text-center">
							Form Laporan Index Kerja
						</DrawerTitle>
					</DrawerHeader>
					<ScrollArea className="px-8 overflow-y-auto">
						<ReportForm />
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
