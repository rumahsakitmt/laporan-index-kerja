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
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Delete, Ellipsis, PenLine } from "lucide-react";
import { useEditRoomFormStore } from "../../hooks/use-edit-room-form";
import { Button } from "@/components/ui/button";
import { useDeleteRoom } from "../../query/delete-room";

interface RoomTableActionProps {
	roomId: number;
}

export default function RoomTableAction({ roomId }: RoomTableActionProps) {
	const { setEdit } = useEditRoomFormStore();
	const { mutate, isPending } = useDeleteRoom(roomId)
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Ellipsis className="w-5 h-5" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Action</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setEdit(roomId)}>
						<PenLine /> Edit
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem variant="destructive">
							<Delete />
							Delete
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Apakah kamu yakin?</DialogTitle>
						<DialogDescription>
							Ini akan menghapus dan menghilangkan ruangan pada semua laporan.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button disabled={isPending} onClick={() => {
							mutate({
								roomId: roomId.toString()
							})
						}} variant="destructive">Ya, Hapus</Button>
						<DialogClose asChild>
							<Button variant="secondary">Batal</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</DropdownMenu>
		</Dialog>
	);
}
