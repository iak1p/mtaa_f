import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../components/svg/Arrow";
import { supabase_noti } from "../utils/supabase"; // добавь свой путь к supabase клиенту
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import NetInfo from "@react-native-community/netinfo";
// import Geolocation from "react-native-geolocation-service";

function NewTransactionPage({
  route: {
    params: { budget_id, current_money },
  },
}) {
  const { token, username, addTransaction } = useUserStore();
  const navigation = useNavigation();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [error, setError] = useState("");
  const [amountError, setAmountError] = useState({
    hasError: false,
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [value, setValue] = useState("food");
  const [valueType, setValueType] = useState("card");

  const validate = () => {
    if (transactionAmount.length == 0 || parseFloat(transactionAmount) == 0) {
      setAmountError({
        hasError: true,
        message: "Please enter amount",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else if (
      current_money < parseFloat(transactionAmount.replace(",", "."))
    ) {
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
    NetInfo.addEventListener(async (state) => {
      console.log("Is connected?", state.isConnected);
      if (!isConnected) {
        if (validate()) {
          const amount = transactionAmount.replace(",", ".");
          addTransaction({
            amount: amount,
            date: new Date().toISOString(),
            type: valueType,
            category: value,
          });
        }
      }
    });

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
              type: valueType,
              category: value,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        await supabase_noti.from("transactions").insert([
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
      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={[
            { label: "Food", value: "food" },
            { label: "Education", value: "education" },
            { label: "Clothing", value: "clothing" },
            { label: "Travel", value: "travel" },
          ]}
          setOpen={(callback) => {
            setOpen(callback);
            setOpenType(false);
          }}
          setValue={setValue}
          style={{
            backgroundColor: "transparent",
          }}
          dropDownContainerStyle={{}}
        />
      </View>

      <View style={{ zIndex: 500, marginTop: 15 }}>
        <DropDownPicker
          open={openType}
          value={valueType}
          items={[
            { label: "Card", value: "card" },
            { label: "Cash", value: "cash" },
          ]}
          setOpen={(callback) => {
            setOpenType(callback);
            setOpen(false);
          }}
          // placeholder={"dddd"}
          setValue={setValueType}
          style={{
            backgroundColor: "transparent",
          }}
          dropDownContainerStyle={{}}
        />
      </View>

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
