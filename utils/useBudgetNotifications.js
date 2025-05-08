import { useEffect, useState } from "react";
import { supabase_noti } from "../utils/supabase";
import Toast from "react-native-toast-message";
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
  // const [lastCounts, setLastCounts] = useState({});

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
    // if (Device.isDevice) {
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
    // } else {
    //   Alert.alert("Уведомления работают только на физическом устройстве");
    // }
  };

  // const fetchNewTransactions = async (budgetId) => {
  //   const res = await fetch(
  //     `${EXPO_PUBLIC_SUPABASE_URL1}/rest/v1/transactions?budget_id=eq.${budgetId}&select=*`,
  //     {
  //       headers: {
  //         apikey: EXPO_PUBLIC_SUPABASE_ANON_KEY1,
  //         Authorization: `Bearer ${EXPO_PUBLIC_SUPABASE_ANON_KEY1}`,
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   return data;
  // };

  // useEffect(() => {
  //   console.log("HEllo");

  //   const interval = setInterval(async () => {
  //     for (const budgetId of budgetIds) {
  //       const transactions = await fetchNewTransactions(budgetId);

  //       if (
  //         !lastCounts[budgetId] ||
  //         transactions.length > lastCounts[budgetId]
  //       ) {
  //         const tx = transactions[transactions.length - 1];

  //         Notifications.scheduleNotificationAsync({
  //           content: {
  //             title:
  //               tx.user_name === username ? "Success" : "💸 New transaction",
  //             body:
  //               tx.user_name === username
  //                 ? `You withdrew ${new Intl.NumberFormat("de-US", {
  //                     style: "currency",
  //                     currency: "USD",
  //                   }).format(tx.amount)}`
  //                 : `${tx.user_name} withdrew ${new Intl.NumberFormat("de-US", {
  //                     style: "currency",
  //                     currency: "USD",
  //                   }).format(tx.amount)}`,
  //           },
  //           trigger: null,
  //         });

  //         setLastCounts((prev) => ({
  //           ...prev,
  //           [budgetId]: transactions.length,
  //         }));
  //       }
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [budgetIds, lastCounts, username]);

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
