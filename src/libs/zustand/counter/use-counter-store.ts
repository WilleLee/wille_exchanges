import { create } from "zustand";
import { CounterStore, counterStoreCreator } from "./counter-store-creator";

export const useCounterStore = create<CounterStore>()(counterStoreCreator);
