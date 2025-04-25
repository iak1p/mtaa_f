import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import Toast from "react-native-toast-message";
import useUserStore from "../store/store";

export default function useBudgetNotifications(budgetIds = []) {
  const { user } = useUserStore();

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
            Toast.show({
              type: "info",
              text1: "💸 Новая транзакция",
              text2: `${tx.user_name} снял(а) ${tx.amount}₽`,
            });
          }
        )
        .subscribe()
    );

    return () => {
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [budgetIds]);
}
