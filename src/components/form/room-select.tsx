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

interface RoomSelectProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any, any, any>;
}

export default function RoomSelect({ form }: RoomSelectProps) {
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
								<SelectValue placeholder="Theme" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
