import { ratesMock } from "@/__mocks__/rates";
import { IRate } from "@libs/types";
import { type StateCreator } from "zustand";

export type RatesStore = {
  rates: IRate[];
  init: (newRates: IRate[]) => void;
};

export const ratesStoreCreator: StateCreator<RatesStore> = (set) => ({
  rates: import.meta.env.MODE === "test" ? ratesMock : [],
  init: (newRates) => set({ rates: newRates }),
});
