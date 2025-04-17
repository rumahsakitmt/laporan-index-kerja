"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimeRangePickerProps {
	onChange: (value: string) => void;
}

export default function TimeRangePicker({ onChange }: TimeRangePickerProps) {
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		onChange(`${startTime}-${endTime}`);
	}, [startTime, endTime, onChange]);

	useEffect(() => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		const currentTime = `${hours}:${minutes}`;

		setStartTime(currentTime);

		const endDate = new Date(now);
		endDate.setHours(endDate.getHours() + 1);
		const endHours = endDate.getHours().toString().padStart(2, "0");
		const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
		const endTime = `${endHours}:${endMinutes}`;
		setEndTime(endTime);
	}, []);

	const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newEndTime = e.target.value;
		setEndTime(newEndTime);

		if (startTime && newEndTime) {
			if (newEndTime <= startTime) {
				setError("End time must be after start time");
			} else {
				setError("");
			}
		}
	};

	const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newStartTime = e.target.value;
		setStartTime(newStartTime);

		if (newStartTime && endTime) {
			if (endTime <= newStartTime) {
				setError("End time must be after start time");
			} else {
				setError("");
			}
		}
	};

	return (
		<div>
			<div className="flex items-center gap-4">
				<div className="space-y-2 w-full">
					<div className="flex items-center space-x-2">
						<Label
							htmlFor="start-time"
							className="text-sm font-medium text-muted-foreground"
						>
							Waktu Mulai
						</Label>
					</div>
					<div className="relative">
						<Input
							type="time"
							id="start-time"
							value={startTime}
							onChange={handleStartTimeChange}
							className="w-full"
						/>
					</div>
				</div>

				<div className="space-y-2 w-full">
					<div className="flex items-center space-x-2">
						<Label
							htmlFor="end-time"
							className="text-sm font-medium text-muted-foreground"
						>
							Waktu Selesai
						</Label>
					</div>
					<div className="relative">
						<Input
							type="time"
							id="end-time"
							value={endTime}
							onChange={handleEndTimeChange}
							className="w-full"
						/>
					</div>
				</div>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
