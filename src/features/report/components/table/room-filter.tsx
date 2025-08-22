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
import { Loader } from "lucide-react";

export default function RoomFilter() {
  const { setState, state } = useQueryReportStore();
  const { data: rooms, isLoading } = useGetRooms();

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            <SelectValue placeholder="Ruangan" />
          </div>
        </SelectTrigger>
      </Select>
    );
  }

  if (!rooms) {
    return <div>no rooms yet.</div>;
  }

  return (
    <Select
      value={state.roomId || ""}
      onValueChange={(e) => setState({ roomId: e })}
    >
      <SelectTrigger className="w-full">
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
