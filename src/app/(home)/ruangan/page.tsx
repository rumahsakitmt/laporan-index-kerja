import RoomForm from "@/features/room/components/form/room-form";
import { RoomTable } from "@/features/room/components/table/room-table";
import React from "react";

export default function RoomPage() {
	return (
		<div>
			<RoomForm />
			<RoomTable />
		</div>
	);
}
