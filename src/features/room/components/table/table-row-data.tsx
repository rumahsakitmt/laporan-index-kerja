"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetRooms } from "../../query/get-rooms";
import RoomTableAction from "./room-table-action";

export default function TableRowData() {
	const { data: rooms, isLoading } = useGetRooms();

	if (isLoading) {
		return (
			<TableRow>
				<TableCell>loading..</TableCell>
			</TableRow>
		);
	}
	if (!rooms) {
		return (
			<TableRow>
				<TableCell>no data</TableCell>
			</TableRow>
		);
	}

	console.log(rooms);
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
