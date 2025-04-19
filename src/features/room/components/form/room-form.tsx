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
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCreateRoom } from "../../query/create-room";
import { Loader, PenLine, Plus } from "lucide-react";
import { useEditRoomFormStore } from "../../hooks/use-edit-room-form";
import { useGetRoom } from "../../query/get-room";
import { useEditRoom } from "../../query/edit-room";

export default function RoomForm() {

	const { roomId, reset } = useEditRoomFormStore();
	const { data: room, isLoading } = useGetRoom(roomId);


	const { mutate, isPending:addPending } = useCreateRoom();
	const { mutate: editMutate, isPending: editPending} = useEditRoom()

	const form = useForm<roomData>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			name: room?.name ?? "",
		},
	});

	React.useEffect(() => {
		if (room) {
			form.setValue("name", room.name);
		}
	}, [room, form]);

	const onSubmit = (values: roomData) => {
		if(roomId) {
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex items-center gap-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Nama Ruangan"
									className="w-full"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-[120px]">
				{
					addPending || editPending ? <Loader className="animate-spin"/>
					:
						<>
					{roomId ? (
						<>
							<PenLine/> Edit
						</>
					) : (
						<>
							<Plus/> Tambah
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
			</form>
		</Form>
	);
}
