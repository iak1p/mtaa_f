import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      username: "",
      token: "",
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
