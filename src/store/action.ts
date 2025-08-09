import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActionState {
  toggleAction: boolean;
  setToggleAction: () => void;
}

export const useActionState = create<ActionState>()(
  persist(
    (set) => ({
      toggleAction: true,
      setToggleAction: () =>
        set((state) => ({ toggleAction: !state.toggleAction })),
    }),
    {
      name: "action-storage",
    }
  )
);
