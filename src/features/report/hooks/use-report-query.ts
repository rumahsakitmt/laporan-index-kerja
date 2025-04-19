import { create } from "zustand";
import type { z } from "zod";
import type { queryReport } from "../schema";

type QueryReportState = z.infer<typeof queryReport>;

interface QueryReportStore {
	state: QueryReportState;

	setState: (newState: Partial<QueryReportState>) => void;
	reset: () => void;
}

const initialState: QueryReportState = {
	userId: undefined,
	q: undefined,
	date: undefined,
	status: undefined,
	roomId: undefined,
};

export const useQueryReportStore = create<QueryReportStore>((set) => ({
	state: initialState,
	setState: (newState) =>
		set((store) => ({
			state: { ...store.state, ...newState },
		})),
	reset: () => set({ state: initialState }),
}));
