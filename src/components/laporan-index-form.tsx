"use client";

import React, { useEffect } from "react";
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
import { Send } from "lucide-react";

import TimeRangePicker from "./form/time-picker";
import RoomSelect from "./form/room-select";
import { DatePicker } from "./form/date-picker";
import StatusSelect from "./form/status-select";
import { type reportData, reportSchema } from "@/features/report/schema";
import { useCreateReport } from "@/features/report/query/create-report";
import { useGetReport } from "@/features/report/query/get-report";
import { useEditReport } from "@/features/report/query/edit-report";
import { useEditSheetStore } from "@/features/report/hooks/use-edit-report";

interface LaporanIndexFormProps {
	reportId?: number;
}

export default function LaporanIndexForm({ reportId }: LaporanIndexFormProps) {
	const { data: report, isLoading } = useGetReport(reportId);
	const { mutate: createReport } = useCreateReport();
	const { mutate: editReport } = useEditReport(reportId);
	const { closeSheet } = useEditSheetStore();

	const [formKey, setFormKey] = React.useState(0);

	const form = useForm<reportData>({
		resolver: zodResolver(reportSchema),
		defaultValues: {
			date: new Date(),
			time: "",
			room: "",
			problem: "",
			needs: "",
			status: "",
			notes: "",
		},
	});

	useEffect(() => {
		if (reportId && report) {
			form.reset({
				date: new Date(report.date ?? new Date()),
				time: report.time ?? "",
				room: report.room?.id.toString() ?? "",
				problem: report.problem ?? "",
				needs: report.needs ?? "",
				status: report.status ?? "",
				notes: report.notes ?? "",
			});

			setTimeout(() => setFormKey((prev) => prev + 1), 0);
		}
	}, [reportId, report, form]);

	const onSubmit = (values: reportData) => {
		if (reportId) {
			editReport(values);
		} else {
			createReport(values);
		}

		closeSheet();

		form.reset();
	};

	if (reportId && isLoading) {
		return (
			<div className="flex justify-center p-4">Loading report data...</div>
		);
	}

	if (reportId && !report) {
		return <div className="flex justify-center p-4">Report not found</div>;
	}

	return (
		<Form {...form}>
			<form
				key={formKey}
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<DatePicker form={form} />

				<FormField
					control={form.control}
					name="time"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Waktu</FormLabel>
							<FormControl>
								{/* TODO: match the time picker value with the db value */}
								<TimeRangePicker onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<RoomSelect form={form} key={`room-${formKey}`} />

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

				<StatusSelect form={form} key={`status-${formKey}`} />

				<Button type="submit" className="w-full font-bold uppercase">
					<Send className="mr-2 h-4 w-4" />
					{reportId ? "Update Laporan" : "Masukkan Laporan"}
				</Button>
			</form>
		</Form>
	);
}
