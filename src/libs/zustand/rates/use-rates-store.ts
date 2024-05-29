import { create } from "zustand";
import { RatesStore, ratesStoreCreator } from "./rates-store-creator";

export const useRatesStore = create<RatesStore>(ratesStoreCreator);
