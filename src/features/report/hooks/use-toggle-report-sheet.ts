import { create } from "zustand";

interface Sheet {
  reportId: number;
  reportIds: number[];
  isOpen: boolean;
}

interface SheetStore {
  sheet: Sheet;
  openSheet: (id: number, reportIds?: number[]) => void;
  closeSheet: () => void;
  getSheet: () => Sheet | undefined;
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  sheet: {
    reportId: 0,
    reportIds: [],
    isOpen: false,
  },
  openSheet: (id: number, reportIds?: number[]) => {
    set({
      sheet: {
        reportId: id,
        reportIds: reportIds || [id],
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
