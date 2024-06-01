import dayjs from "dayjs";
import { type StateCreator } from "zustand";

export type SearchdateStore = {
  searchdate: string;
  adjust: () => void;
};

export const searchdateStoreCreator: StateCreator<SearchdateStore> = (set) => ({
  searchdate: dayjs().format("YYYYMMDD"),
  adjust: /* minus 1 day of the prev searchdata */ () => {
    set((state) => {
      const prev = dayjs(state.searchdate).subtract(1, "day");
      // only update date if it's after (today - 7 days)
      if (prev.isAfter(dayjs().subtract(7, "day"))) {
        return {
          searchdate: prev.format("YYYYMMDD"),
        };
      } else {
        return state;
      }
    });
  },
});
