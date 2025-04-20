"use client";

import React from "react";

import { roomSchema, type roomData } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCreateRoom } from "../../query/create-room";
import { Loader, PenLine, Plus, TriangleAlert } from "lucide-react";
import { useEditRoomFormStore } from "../../hooks/use-edit-room-form";
import { useGetRoom } from "../../query/get-room";
import { useEditRoom } from "../../query/edit-room";
import RoomFormSkeleton from "../skeleton/room-form-skeleton";

export default function RoomForm() {
	const inputRef = React.useRef<HTMLInputElement | null>(null)
	const { roomId, reset } = useEditRoomFormStore();
	const { data: room, isLoading } = useGetRoom(roomId);



	const { mutate, isPending: addPending } = useCreateRoom();
	const { mutate: editMutate, isPending: editPending } = useEditRoom()

	const form = useForm<roomData>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			name: room?.name ?? "",
		},
	});

	React.useEffect(() => {
		if (roomId && inputRef.current) {
			inputRef.current?.focus();
		}

	}, [roomId]);

	React.useEffect(() => {
		if (room) {
			form.setValue("name", room.name);
		}
	}, [room, form]);

	const onSubmit = (values: roomData) => {
		if (roomId) {
			editMutate({
				roomId,
				name: values.name,
			})
			reset()
			form.setValue("name", "");
		} else {
			mutate(values);
		}


		form.reset();
	};

	if (roomId && isLoading) {
		return <RoomFormSkeleton />
	}

	if (roomId && !room) {
		return <div className="text-red-500 text-sm flex gap-2 items-center">
			<TriangleAlert className="h-4 w-4" />
			Something went wrong.
		</div>
	}



	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full md:w-xs">
							<FormLabel>Nama Ruangan</FormLabel>
							<FormControl>
								<Input
									placeholder="Nama ruangan baru"
									className="w-full"
									{...field}
									ref={e => {
										field.ref(e)
										inputRef.current = e
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-4">

					<Button type="submit" className="w-[100px]">
						{
							addPending || editPending ? <Loader className="animate-spin" />
								:
								<>
									{roomId ? (
										<>
											<PenLine /> Edit
										</>
									) : (
										<>
											<Plus /> Tambah
										</>
									)}
								</>
						}

					</Button>
					{!!roomId && (
						<Button
							onClick={() => {
								reset();
								form.setValue("name", "");
							}}
							type="button"
							variant="outline"
						>
							Batal
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}
