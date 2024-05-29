import { type StateCreator } from "zustand";

export type CounterStore = {
  count: number;
  increment: () => void;
};

export const counterStoreCreator: StateCreator<CounterStore> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
});
