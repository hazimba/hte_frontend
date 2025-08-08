import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserLoggedInState {
  user: { id: string; name: string };
  setUser: (user: { id: string; name: string }) => void;
}

export const useUserLoggedInState = create<UserLoggedInState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-login-storage",
    }
  )
);
