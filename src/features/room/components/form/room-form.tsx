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
import { Plus } from "lucide-react";

export default function RoomForm() {
	const { mutate } = useCreateRoom();
	const form = useForm<roomData>({
		resolver: zodResolver(roomSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (values: roomData) => {
		mutate(values);

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
				<Button type="submit" className="w-max">
					<Plus /> Tambah
				</Button>
			</form>
		</Form>
	);
}
