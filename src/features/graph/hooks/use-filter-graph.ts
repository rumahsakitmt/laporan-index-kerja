import { create } from "zustand";
import type { DateRange } from "react-day-picker";

interface FilterState {
	userId: string;
	date: DateRange | undefined;
}

interface FilterStore {
	filter: FilterState;
	setFilter: (key: keyof FilterState, value: Partial<FilterState>) => void;
	resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
	filter: {
		userId: "",
		date: {
			from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
			to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
		},
	},
	setFilter: (key, value) =>
		set((state) => ({
			filter: {
				...state.filter,
				[key]: value[key] ?? state.filter[key],
			},
		})),
	resetFilter: () =>
		set({
			filter: {
				userId: "",
				date: {
					from: new Date(),
					to: new Date(),
				},
			},
		}),
}));
