import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface NotesTextareaProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any, any, any>;
	status: string;
}

export default function NotesTextarea({ form, status }: NotesTextareaProps) {
	return (
		<FormField
			control={form.control}
			name="notes"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Catatan</FormLabel>
					<FormControl>
						<Textarea placeholder={`Catatan kenapa ${status}`} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
