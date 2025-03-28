import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";
import { useNavigation } from "@react-navigation/native";

function NewTransactionPage({
  route: {
    params: { budget_id },
  },
}) {
  const { token } = useUserStore();
  const navigation = useNavigation();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState({
    hasError: false,
    message: "",
  });

  const validate = () => {
    if (transactionAmount.length == 0) {
      setAmountError({
        hasError: true,
        message: "Too short",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setAmountError({
      hasError: false,
      message: "",
    });
  }, [transactionAmount]);

  const addNewTransaction = async () => {
    if (validate()) {
      console.log(transactionAmount);
      try {
        const res = await fetch(
          `http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/transactions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              amount: transactionAmount.replace(",", "."),
            }),
          }
        );
        const data = await res.json();
        console.log(res.status);

        if (!res.ok) {
          setError(data.message);
          return;
        }

        console.log("Response:", data);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.goBack();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <SafeAreaView>
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
      <TouchableWithoutFeedback onPress={() => addNewTransaction()}>
        <Text>Add</Text>
      </TouchableWithoutFeedback>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}

export default NewTransactionPage;
