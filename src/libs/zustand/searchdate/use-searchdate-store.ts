import { create } from "zustand";
import {
  SearchdateStore,
  searchdateStoreCreator,
} from "./searchdate-store-creator";

export const useSearchdateStore = create<SearchdateStore>(
  searchdateStoreCreator,
);
