import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist((set) => ({
    username: null,
    email: null,
    token: null,
    img: null,
    id: null,
    transactions: [],
    setUser: (user) => set((state) => ({ ...state, ...user })),
    setImg: (newImg) => set((state) => ({ ...state, img: newImg })),
    setUsername: (newUsername) =>
      set((state) => ({ ...state, username: newUsername })),
    setToken: (token) => set((state) => ({ ...state, token: token })),
    resetUser: () =>
      set(() => ({
        username: null,
        token: null,
        email: null,
        img: null,
        id: null,
        transactions: [],
      })),
    fetchUserData: async (token) => {
      try {
        const res = await fetch(
          `http://${process.env.EXPO_PUBLIC_ADDRESS}/users/info/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              // Authorization:
              //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJ1c2VybmFtZSI6Imt1a29sZCJ9.IMg80P2myqdPL5lCI4J-ufmQZTTVyOhwChVwzEvI1lk",
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
            email: data.email
          }));
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    },
  }))
);

export default useUserStore;
