import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

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
      setUsername: (newUsername) =>
        set((state) => ({ ...state, username: newUsername })),
      setToken: (token) => set((state) => ({ ...state, token: token })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
      fetchUserData: async () => {
        try {
          const res = await fetch(
            `http://${process.env.EXPO_PUBLIC_ADDRESS}/users/info/all`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6ImJpYmFzcyJ9.0Tkek0sPyo9O_iRT-DmkMERXDJfR0S6TRbWrGTMFJMY",
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
