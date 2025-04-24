"use client";

import * as React from "react";

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
import { CheckCheck, CircleX, TimerIcon } from "lucide-react";
import NotesTextarea from "./notes-textarea";

interface StatusSelectProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any, any, any>;
}

export default function StatusSelect({ form }: StatusSelectProps) {
	const [status, setStatus] = React.useState(
		form.getValues("status") as string || "selesai",
	);
	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name="status"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => {
									setStatus(value);
									field.onChange(value);
								}}
								defaultValue={field.value}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="selesai">
										<CheckCheck />
										Selesai
									</SelectItem>
									<SelectItem value="ditunda">
										<TimerIcon />
										Ditunda
									</SelectItem>
									<SelectItem value="tidak selesai">
										<CircleX />
										Tidak Selesai
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{status !== "selesai" && <NotesTextarea form={form} status={status} />}
		</div>
	);
}
