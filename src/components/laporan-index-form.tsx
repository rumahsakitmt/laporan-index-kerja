"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TimeRangePicker from "./form/time-picker";
import RoomSelect from "./form/room-select";
import { DatePicker } from "./form/date-picker";
import StatusSelect from "./form/status-select";
import { Send } from "lucide-react";

const laporanSchema = z.object({
	date: z.string(),
	time: z.string(),
	room: z.string(),
	problem: z.string(),
	needs: z.string(),
	status: z.string(),
	notes: z.string().optional(),
});

type LaporanData = z.infer<typeof laporanSchema>;

export default function LaporanIndexForm() {
	const form = useForm<LaporanData>({
		resolver: zodResolver(laporanSchema),
		defaultValues: {
			date: "",
			time: "",
			room: "",
			problem: "",
			needs: "",
			status: "",
		},
	});

	const onSubmit = (values: LaporanData) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<DatePicker form={form} />
				<FormField
					control={form.control}
					name="time"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Waktu</FormLabel>
							<FormControl>
								<TimeRangePicker />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<RoomSelect form={form} />

				<FormField
					control={form.control}
					name="problem"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kendala</FormLabel>
							<FormControl>
								<Textarea placeholder="Kendala" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="needs"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kebutuhan</FormLabel>
							<FormControl>
								<Textarea placeholder="Kebutuhan" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<StatusSelect form={form} />

				<Button type="submit" className="w-full font-bold uppercase">
					<Send />
					Masukkan Laporan
				</Button>
			</form>
		</Form>
	);
}
