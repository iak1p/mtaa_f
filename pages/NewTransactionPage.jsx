import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  useColorScheme,
  Keyboard,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import useUserStore from "../store/store";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../components/svg/Arrow";
import { supabase_noti } from "../utils/supabase"; // добавь свой путь к supabase клиенту
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
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

  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

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
    if (validate()) {
      try {
        const amount = transactionAmount.replace(",", ".");

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log(latitude, longitude);

        const res = await fetch(
          `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/transactions`,
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
              location: { latitude, longitude },
            }),
          }
        );

        // const response = await fetch(
        //   `${EXPO_PUBLIC_SUPABASE_URL1}/rest/v1/transactions`,
        //   {
        //     method: "POST",
        //     headers: {
        //       apikey: EXPO_PUBLIC_SUPABASE_ANON_KEY1,
        //       Authorization: `Bearer ${EXPO_PUBLIC_SUPABASE_ANON_KEY1}`,
        //       "Content-Type": "application/json",
        //       Prefer: "return=representation",
        //     },
        //     body: JSON.stringify([
        //       {
        //         budget_id,
        //         user_name: username || "Unknown",
        //         amount: parseFloat(amount),
        //         created_at: new Date().toISOString(),
        //       },
        //     ]),
        //   }
        // );

        // console.log(response);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          >
            <Arrow stroke={darkMode ? "#fff" : "#000"} />
          </TouchableWithoutFeedback>
          <Text
            accessible={true}
            accessibilityLabel="You are in a Pooly"
            style={[
              { textAlign: "center", fontSize: 16, marginTop: 15 },
              darkMode ? { color: "#fff" } : null,
            ]}
          >
            In Pooly
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={`Current money: ${new Intl.NumberFormat(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            ).format(current_money)}`}
            style={[
              {
                textAlign: "center",
                fontSize: 25,
                marginTop: 5,
                marginBottom: 15,
                fontWeight: "bold",
              },
              darkMode ? { color: "#fff" } : null,
            ]}
          >
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(current_money)}
          </Text>
          <View>
            <Text style={{ color: "grey", marginBottom: 5 }}>
              Select amount
            </Text>
            <BaseForm
              inputs={[
                {
                  lable: null,
                  placeholder: "Enter amount",
                  state: setTransactionAmount,
                  error: amountError,
                  type: "numeric",
                  accessibilityLabel: "Enter transaction amount",
                },
              ]}
            />
          </View>

          <View
            accessible={true}
            accessibilityLabel="Select category for what you are paying"
            accessibilityRole="menu"
            style={{ zIndex: 1000 }}
          >
            <Text style={{ color: "grey", marginBottom: 5 }}>
              Select payment category
            </Text>
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
                borderColor: "#86939e",
              }}
              textStyle={{
                color: "#fff",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#912F40",
              }}
              listItemLabelStyle={{
                color: "#fff",
              }}
            />
          </View>

          <View
            accessible={true}
            accessibilityLabel="Select your payment type"
            accessibilityRole="menu"
            style={{ zIndex: 500, marginTop: 15 }}
          >
            <Text style={{ color: "grey", marginBottom: 5 }}>
              Select payment type
            </Text>
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
              style={[
                {
                  backgroundColor: "transparent",
                  borderColor: "#86939e",
                },
                {},
              ]}
              textStyle={{
                color: "#fff", // ← для текста выбранного элемента
              }}
              dropDownContainerStyle={{
                backgroundColor: "#912F40", // например, тёмный фон выпадающего списка
              }}
              listItemLabelStyle={{
                color: "#fff", // ← для пунктов выпадающего списка
              }}
            />
          </View>
          <TouchableWithoutFeedback onPress={addNewTransaction}>
            <View
              accessibilityRole="button"
              accessibilityLabel="Submit withdrawal"
              style={[
                { marginTop: 15, borderRadius: 5 },
                darkMode
                  ? { backgroundColor: "#912F40" }
                  : { backgroundColor: "#13293D" },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  color: "#fff",
                }}
              >
                Withdraw
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text>{error}</Text>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
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
