import { create } from "zustand";

interface Sheet {
	reportId: number;
	isOpen: boolean;
}

interface SheetStore {
	sheet: Sheet;
	openSheet: (id: number) => void;
	closeSheet: () => void;
	getSheet: () => Sheet | undefined;
}

export const useSheetStore = create<SheetStore>((set, get) => ({
	sheet: {
		reportId: 0,
		isOpen: false,
	},
	openSheet: (id: number) => {
		set({
			sheet: {
				reportId: id,
				isOpen: true,
			},
		});
	},
	closeSheet: () => {
		set((state) => ({
			sheet: {
				...state.sheet,
				isOpen: false,
			},
		}));
	},
	getSheet: () => {
		return get().sheet;
	},
}));
