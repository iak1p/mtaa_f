import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { LOCAL_HOST, PORT } from "../env";

const useUserStore = create(
  persist(
    (set) => ({
      username: null,
      token: null,
      img: null,
      id: null,
      transactions: [],
      setUser: (user) => set((state) => ({ ...state, ...user })),
      setImg: (newImg) => set((state) => ({ ...state, img: newImg })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
      fetchUserData: async () => {
        try {
          const res = await fetch(
            `http://${LOCAL_HOST}:${PORT}/users/info/all`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJ1c2VybmFtZSI6ImF1cm9yYSJ9.0DNS6FF6kD1QrIy52Sg_QI8K9lt-CFbOP5fUmGn1hcI",
              },
            }
          );
          const data = await res.json();
          if (data) {
            set((state) => ({
              ...state,
              img: data.img_uri,
              token: data.token,
              username: data.username,
              id: data.id,
            }));
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      },
    }),
    {
      name: "position-storage",
      partialize: (state) => ({ context: state.context }),
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: false,
      onRehydrateStorage: (state) => {
        if (state) {
          if (state.fetchUserData) {
            state.fetchUserData();
          } else {
            console.error("fetchUserData not available in state");
          }
        }
      },
    }
  )
);

export default useUserStore;
