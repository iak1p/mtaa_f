import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export const useNetworkSync = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        console.log("Интернет появился! Синхронизируем...");
        // syncTransactions(); // Твоя функция, которая отправляет данные на сервер
      }
    });

    return () => {
      unsubscribe(); // Обязательно отписка!!!
    };
  }, []);
};
