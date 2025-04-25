import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../components/svg/Arrow";
import { supabase } from "../utils/supabase1"; // добавь свой путь к supabase клиенту
import Toast from "react-native-toast-message";

function NewTransactionPage({
  route: {
    params: { budget_id, current_money },
  },
}) {
  const { token, username } = useUserStore(); // предположим, что в store есть user
  const navigation = useNavigation();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState({
    hasError: false,
    message: "",
  });

  const validate = () => {
    if (transactionAmount.length == 0 || parseFloat(transactionAmount) == 0) {
      setAmountError({
        hasError: true,
        message: "Please enter amount",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else if (current_money < parseFloat(transactionAmount.replace(",", "."))) {
      setAmountError({
        hasError: true,
        message: "You don't have money",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (current_money < parseFloat(transactionAmount.replace(",", "."))) {
      setAmountError({
        hasError: true,
        message: "You don't have money",
      });
    } else {
      setAmountError({
        hasError: false,
        message: "",
      });
    }
  }, [transactionAmount]);

  const addNewTransaction = async () => {
    if (validate()) {
      try {
        const amount = transactionAmount.replace(",", ".");

        const res = await fetch(
          `http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/transactions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              amount,
              date: new Date().toISOString(),
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        await supabase.from("transactions").insert([
          {
            budget_id,
            user_name: username || "Unknown",
            amount: parseFloat(amount),
            created_at: new Date().toISOString(),
          },
        ]);
        
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.goBack();
      } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Arrow stroke="#000" />
      </TouchableWithoutFeedback>
      <Text>
        In Pooly
        {new Intl.NumberFormat("de-US", {
          style: "currency",
          currency: "USD",
        }).format(current_money)}
      </Text>
      <BaseForm
        inputs={[
          {
            lable: null,
            placeholder: "Enter amount",
            state: setTransactionAmount,
            error: amountError,
            type: "numeric",
          },
        ]}
      />
      <TouchableWithoutFeedback onPress={addNewTransaction}>
        <Text>Add</Text>
      </TouchableWithoutFeedback>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}

export default NewTransactionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});
