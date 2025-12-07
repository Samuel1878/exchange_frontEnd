import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserData } from "~/utils/types";



type AuthState = {
  user: UserData | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  setUser: (u: UserData | null) => void;
  login: (user: UserData, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,

      setToken: (token) => set({ accessToken: token, isLoggedIn: !!token }),

      setUser: (u) => set({ user: u, isLoggedIn: !!u }),

      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", // storage key
    }
  )
);

