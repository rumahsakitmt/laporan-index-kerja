"use client";

import React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { useGetRooms } from "@/features/room/query/get-rooms";

interface RoomSelectProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any, any, any>;
}

export default function RoomSelect({ form }: RoomSelectProps) {
	const { data: rooms, isLoading } = useGetRooms();

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!rooms) {
		return <div>no rooms yet.</div>;
	}

	return (
		<FormField
			control={form.control}
			name="room"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Ruangan</FormLabel>
					<FormControl>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
