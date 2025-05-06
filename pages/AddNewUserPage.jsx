import { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  Vibration,
  View,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store/store";
import * as Haptics from "expo-haptics";
import Arrow from "../components/svg/Arrow";

function AddNewUserPage({
  route: {
    params: { budget_id },
  },
}) {
  const { token } = useUserStore();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState({
    hasError: false,
    message: "",
  });

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
    if (username.length == 0) {
      setUsernameError({
        hasError: true,
        message: "Please enter username",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setUsernameError({
      hasError: false,
      message: "",
    });
    setError(null);
  }, [username]);

  const addNewUserToPolly = async () => {
    if (validate()) {
      try {
        const res = await fetch(
          `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              username: username,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Arrow stroke={darkMode ? "#fff" : "#000"} />
          </TouchableWithoutFeedback>
          <Text
            style={[
              {
                textAlign: "center",
                fontSize: 16,
                marginTop: 5,
                marginBottom: 15,
                fontWeight: "bold",
              }, darkMode ? {color: "#fff"} : {color: "#000"}
            ]}
          >
            Add new user to Pooly
          </Text>
          <BaseForm
            inputs={[
              {
                lable: null,
                placeholder: "Enter username",
                state: setUsername,
                error: usernameError,
              },
            ]}
          />
          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}
          <TouchableWithoutFeedback onPress={addNewUserToPolly}>
            <View
              style={[
                { borderRadius: 5 },
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
                Add user
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddNewUserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});
