"use client";

import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Delete, Ellipsis, Eye, Loader, PenLine } from "lucide-react";
import { useDeleteReport } from "../../query/delete-report";
import { Button } from "@/components/ui/button";
import { useEditSheetStore } from "../../hooks/use-edit-report";

interface ReportTableActionProps {
	reportId: number;
}

export default function ReportTableAction({
	reportId,
}: ReportTableActionProps) {
	const { openSheet } = useEditSheetStore();
	const [open, setOpen] = React.useState(false);
	const { mutate, isPending } = useDeleteReport(reportId);

	const handleDeleteReport = () => {
		mutate({ reportId: reportId.toString() });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger className="text-muted-foreground">
					<Ellipsis className="w-4 h-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent avoidCollisions align="end">
					<DropdownMenuLabel>Action</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Eye /> Detail
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
							openSheet(reportId);
						}}
					>
						<PenLine /> Edit
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							setOpen(true);
						}}
						variant="destructive"
					>
						<Delete /> Hapus
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Apakah kamu yakin?</DialogTitle>
					<DialogDescription>
						Tindakan ini tidak bisa di ulang.Ini akan menghapus dan
						menghilangkan laporanmu secara permanen.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={handleDeleteReport} variant="destructive">
						{isPending ? (
							<Loader className="animate-spin" />
						) : (
							"Yakin, Hapus Laporan"
						)}
					</Button>
					<Button
						disabled={isPending}
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Batal
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
