import { useEffect, useState } from "react";
import { supabase_noti } from "../utils/supabase";
import useUserStore from "../store/store";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function useBudgetNotifications(budgetIds = []) {
  const { username } = useUserStore();

  useEffect(() => {
    const register = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Разрешение на уведомления не получено!");
        }
      } else {
        Alert.alert("Уведомления работают только на физическом устройстве");
      }
    };

    register();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Разрешение на уведомления не получено!");
        return;
      }
  };

  useEffect(() => {
    if (!budgetIds.length) return;
    console.log(budgetIds);

  const channels = budgetIds.map((id) =>
    supabase_noti
      .channel(`transactions-${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `budget_id=eq.${id}`,
        },
        (payload) => {
          const tx = payload.new;

          if (username != tx.user_name) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "💸 New transaction",
                body: `${tx.user_name} withdrew ${new Intl.NumberFormat(
                  "de-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                ).format(tx.amount)}`,
              },
              trigger: null,
            });
          } else {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Success",
                body: `You withdrew ${new Intl.NumberFormat("de-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tx.amount)}`,
              },
              trigger: null,
            });
          }
        }
      )
      .subscribe()
  );

  return () => {
    channels.forEach((channel) => supabase_noti.removeChannel(channel));
  };
  }, [budgetIds]);
}
