import { create } from "zustand";

interface RoomEditStore {
	roomId: number;
	setEdit: (id: number) => void;
	reset: () => void;
}

export const useEditRoomFormStore = create<RoomEditStore>((set) => ({
	roomId: 0,
	setEdit: (id) => {
		set({
			roomId: id,
		});
	},
	reset: () => {
		set({
			roomId: 0,
		});
	},
}));
