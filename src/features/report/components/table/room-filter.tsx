import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetRooms } from "@/features/room/query/get-rooms";
import { useQueryReportStore } from "../../hooks/use-report-query";
import ReportRoomSkeleton from "../../skeleton/report-room-skeleton";

export default function RoomFilter() {
	const { setState, state } = useQueryReportStore();
	const { data: rooms, isLoading } = useGetRooms();

	if (isLoading) {
		return <ReportRoomSkeleton />
	}

	if (!rooms) {
		return <div>no rooms yet.</div>;
	}

	return (
		<Select value={state.roomId} onValueChange={(e) => setState({ roomId: e })}>
			<SelectTrigger className="w-full md:w-[180px]">
				<SelectValue placeholder="Ruangan" />
			</SelectTrigger>
			<SelectContent>
				{rooms.map((room) => (
					<SelectItem key={room.id} value={room.id.toString()}>
						{room.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
