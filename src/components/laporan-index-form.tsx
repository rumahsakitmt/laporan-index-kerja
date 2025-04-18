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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TimeRangePicker from "./form/time-picker";
import RoomSelect from "./form/room-select";
import { DatePicker } from "./form/date-picker";
import StatusSelect from "./form/status-select";
import { Send } from "lucide-react";
import { type reportData, reportSchema } from "@/features/report/schema";
import { useCreateReport } from "@/features/report/query/create-report";

export default function LaporanIndexForm() {
	const form = useForm<reportData>({
		resolver: zodResolver(reportSchema),
		defaultValues: {
			date: new Date(),
			time: "",
			room: "",
			problem: "",
			needs: "",
			status: "",
		},
	});

	const { mutate } = useCreateReport();

	const onSubmit = (values: reportData) => {
		mutate(values);
		form.reset();
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
								<TimeRangePicker onChange={field.onChange} />
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
