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
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJ1c2VybmFtZSI6ImFkbWluIn0.FNhGVfx_PSZ1k5_YFgAMZtp0zrclaHU3BWyktMDjXAc",
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
      // onRehydrateStorage: (state) => {
      //   if (state) {
      //     if (state.fetchUserData) {
      //       state.fetchUserData();
      //     } else {
      //       console.error("fetchUserData not available in state");
      //     }
      //   }
      // },
      onRehydrateStorage: (state) => {
        return (storedState, error) => {
          console.log(storedState);

          if (error) {
            console.error("Rehydration error:", error);
            return;
          }

          // Если уже есть данные — не делаем fetch
          const alreadyLoaded =
            storedState &&
            storedState.username &&
            storedState.token &&
            storedState.id;

          if (!alreadyLoaded && state?.fetchUserData) {
            state.fetchUserData();
          } else {
            console.log("Пользователь уже был загружен — пропускаем fetch");
          }
        };
      },
    }
  )
);

export default useUserStore;
