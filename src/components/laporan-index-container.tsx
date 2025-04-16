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
import { Button } from "@/components/ui/button";
import LaporanIndexForm from "./laporan-index-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, NotebookPen } from "lucide-react";

export default function LaporanIndexContainer() {
	return (
		<div>
			<Drawer>
				<DrawerTrigger asChild>
					<Button className="w-full">
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
