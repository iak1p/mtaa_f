import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import { TouchableWithoutFeedback } from "react-native";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";
import { Input } from "@rneui/base";
import BankaIcon from "../components/svg/BankaIcon";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import useUserStore from "../store/store";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

const CreatePoolyAmountPage = ({
  route: {
    params: { poolyName },
  },
}) => {
  const [poolyAmount, setPoolyAmount] = useState();
  const { token } = useUserStore();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  const validate = () => {
    console.log(poolyAmount.lengh);
  };

  const addNewPooly = async () => {
    if (poolyAmount == 0) {
      setError("Amount can't be 0");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else if (poolyAmount == undefined) {
      setError("Please enter amount");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    }

    console.log(poolyName + poolyAmount);
    try {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            amount: poolyAmount.replace(",", "."),
            name: poolyName,
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
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Navigates to the previous screen"
            onPress={() => navigation.goBack()}
          >
            <Arrow stroke={darkMode ? "#fff" : "#000"} />
          </TouchableWithoutFeedback>
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <WelcomeScreenSVG />
              <Text
                style={[
                  {
                    fontSize: 15,
                    textAlign: "center",
                    color: "red",
                  },
                ]}
                accessible={true}
                accessibilityLabel={`Creating Pooly named ${poolyName}`}
              >
                {error}
              </Text>

              <Text
                style={[
                  darkMode ? { color: "#fff" } : { color: "#000" },
                  {
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: 5,
                    width: 189,
                    textAlign: "center",
                  },
                ]}
                accessible={true}
                accessibilityLabel={`Creating Pooly named ${poolyName}`}
              >
                Enter amount for Pooly: {poolyName}
              </Text>

              <TextInput
                style={[
                  darkMode ? { color: "#fff" } : { color: "#000" },
                  {
                    fontSize: 28,
                    fontWeight: "bold",
                    padding: 5,
                    width: 200,
                    textAlign: "center",
                  },
                ]}
                onChangeText={setPoolyAmount}
                value={poolyAmount}
                autoCorrect={false}
                autoFocus={true}
                maxLength={10}
                keyboardType="numeric"
                accessibilityLabel="Enter Pooly amount"
                accessibilityHint="Maximum 10 characters allowed"
                accessibilityRole="keyboardkey"
              />
            </View>
            <ButtonComponent
              title={"Create Pooly"}
              btnStyle={[
                darkMode
                  ? { backgroundColor: "#912F40" }
                  : { backgroundColor: "#13293D" },
                styles.btnStyle,
              ]}
              textStyle={styles.btnTextStyle}
              func={() => addNewPooly()}
              accessibilityLabel="Create Pooly"
              accessibilityHint="Creates a new Pooly with the entered name and amount"
              accessibilityRole="button"
            />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePoolyAmountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  btnStyle: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  btnTextStyle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
