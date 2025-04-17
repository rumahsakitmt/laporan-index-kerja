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
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LaporanIndexForm from "./laporan-index-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function LaporanIndexContainer() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="w-full  md:w-max">
						<NotebookPen />
						Buat Laporan
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Form Laporan Index Kerja</DialogTitle>
					</DialogHeader>
					<ScrollArea className="px-8 overflow-y-auto">
						<LaporanIndexForm />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<div>
			<Drawer>
				<DrawerTrigger asChild>
					<Button className="w-full md:w-max">
						<NotebookPen />
						Buat Laporan
					</Button>
				</DrawerTrigger>
				<DrawerContent className="h-screen max-h-screen">
					<DrawerHeader>
						<DrawerTitle className="text-center">
							Form Laporan Index Kerja
						</DrawerTitle>
					</DrawerHeader>
					<ScrollArea className="px-8 overflow-y-auto">
						<LaporanIndexForm />
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
