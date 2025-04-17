"use client";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useGetRooms } from "../../query/get-rooms";
import { Button } from "@/components/ui/button";
import { Delete, Eye, PenLine } from "lucide-react";

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
	return (
		<>
			{rooms.map((room, idx) => (
				<TableRow key={room.id}>
					<TableCell>{idx + 1}</TableCell>
					<TableCell>{room.name}</TableCell>
					<TableCell className="flex items-center gap-4 justify-center">
						<Button variant="outline" size="icon">
							<PenLine />
						</Button>
						<Button variant="outline" size="icon">
							<Eye />
						</Button>
						<Button variant="destructive" size="icon">
							<Delete />
						</Button>
					</TableCell>
				</TableRow>
			))}
		</>
	);
}
