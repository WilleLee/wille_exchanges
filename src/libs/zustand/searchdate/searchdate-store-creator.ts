import dayjs from "dayjs";
import { type StateCreator } from "zustand";

export type SearchdateStore = {
  searchdate: string;
  adjust: () => void;
};

export const searchdateStoreCreator: StateCreator<SearchdateStore> = (set) => ({
  searchdate: dayjs().format("YYYYMMDD"),
  adjust: /* minus 1 day of the prev searchdata */ () => {
    set((state) => ({
      searchdate: dayjs(state.searchdate).subtract(1, "day").format("YYYYMMDD"),
    }));
  },
});
