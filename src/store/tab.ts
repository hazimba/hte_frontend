import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabState {
  tab: string;
  setTab: (tab: string) => void;
}

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
      tab: "your-products", // default tab
      setTab: (tab) => set({ tab }),
    }),
    {
      name: "tab-storage",
    }
  )
);
