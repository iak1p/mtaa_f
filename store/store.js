import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      username: "",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5IiwidXNlcm5hbWUiOiJpYWsxcCJ9.FUBGj3kbtcuAmeX3HI2T2EwpkuP0rSq_aDnfMd1tAqY",
      setUser: (user) => set((state) => ({ ...state, ...user })),
      logout: () => set({ username: "", token: "" }),
    }),
    {
      name: "user-storage",
      getStorage: () => AsyncStorage,
      onRehydrateStorage: (state) => {
        if (state) {
          console.log("Rehydration complete:", state);
        }
      },
    }
  )
);

export default useUserStore;
