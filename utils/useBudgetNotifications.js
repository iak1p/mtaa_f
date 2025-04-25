import { useEffect } from "react";
import { supabase } from "../utils/supabase1";
import Toast from "react-native-toast-message";
import useUserStore from "../store/store";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useBudgetNotifications(budgetIds = []) {
  const { username } = useUserStore();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
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
        return;
      }
    } else {
      Alert.alert("Уведомления работают только на физическом устройстве");
    }
  };

  useEffect(() => {
    if (!budgetIds.length) return;

    const channels = budgetIds.map((id) =>
      supabase
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
            // handleSendNotification();

            if (username != tx.user_name) {
              // Toast.show({
              //   type: "info",
              //   text1: "",
              //   text2: `${tx.user_name} снял(а) ${tx.amount}₽`,
              // });

              Notifications.scheduleNotificationAsync({
                content: {
                  title: "💸 Новая транзакция",
                  body: `${tx.user_name} снял(а) ${tx.amount}₽`,
                },
                trigger: null, // Сработает сразу
              });
            } else {
              // Toast.show({
              //   type: "success",
              //   text1: "Success",
              //   text2: `You withdrew ${tx.amount}₽`,
              // });
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Success",
                  body: `You withdrew ${tx.amount}₽`,
                },
                trigger: null, // Сработает сразу
              });
            }
          }
        )
        .subscribe()
    );

    return () => {
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [budgetIds]);
}
