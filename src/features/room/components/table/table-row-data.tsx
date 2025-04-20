"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetRooms } from "../../query/get-rooms";
import RoomTableAction from "./room-table-action";
import RoomTableSkeleton from "../skeleton/room-table-skeleton";
import { TriangleAlert } from "lucide-react";

export default function TableRowData() {
	const { data: rooms, isLoading } = useGetRooms();

	if (isLoading) {
		return <RoomTableSkeleton />
	}
	if (!rooms) {
		return (
			<TableRow>
				<TableCell colSpan={4}>
					<div className="flex items-center justify-center text-red-500 gap-2 py-4">
						<TriangleAlert className="w-4 h-4" /> Something went wrong.
					</div>
				</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{rooms.map((room, idx) => (
				<TableRow key={room.id}>
					<TableCell>{idx + 1}</TableCell>
					<TableCell>{room.name}</TableCell>
					<TableCell className="text-center">{room.reports.length}x</TableCell>
					<TableCell className="flex items-center gap-4 justify-center">
						<RoomTableAction roomId={room.id} />
					</TableCell>
				</TableRow>
			))}
		</>
	);
}
