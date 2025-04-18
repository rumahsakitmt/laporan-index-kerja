import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getReadableDuration(timeRange: string): string {
	const [start, end] = timeRange.split("-");
	const [startHour, startMinute] = start.split(":").map(Number);
	const [endHour, endMinute] = end.split(":").map(Number);

	const startTotal = startHour * 60 + startMinute;
	const endTotal = endHour * 60 + endMinute;

	let duration = endTotal - startTotal;
	if (duration < 0) duration += 24 * 60;

	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	let result = "";
	if (hours > 0) result += `${hours} jam`;
	if (minutes > 0) {
		if (result) result += " ";
		result += `${minutes} menit`;
	}

	return result || "0 menit";
}
