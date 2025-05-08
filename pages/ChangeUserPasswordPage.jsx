import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BaseForm from "../components/BaseForm";
import useUserStore from "../store/store";
import Arrow from "../components/svg/Arrow";

export default function ChangeUserPasswordPage() {
  const { username, token } = useUserStore();
  const [oldUserPassword, setOldUserPassword] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [backendError, setBackendError] = useState("");
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    oldUserPassword: { hasError: false, message: "" },
    newUserPassword: { hasError: false, message: "" },
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
    const newErrors = {
      oldUserPassword: { hasError: false, message: "" },
      newUserPassword: { hasError: false, message: "" },
    };

    if (oldUserPassword.trim().length < 3) {
      newErrors.oldUserPassword.hasError = true;
      newErrors.oldUserPassword.message =
        "Old password must be at least 3 characters.";
    }

    if (newUserPassword.trim().length < 3) {
      newErrors.newUserPassword.hasError = true;
      newErrors.newUserPassword.message =
        "The password must be at least 3 characters.";
    }

    setErrors(newErrors);
    return (
      !newErrors.newUserPassword.hasError && !newErrors.oldUserPassword.hasError
    );
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_ADDRESS}/users/change/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            oldPassword: oldUserPassword,
            newPassword: newUserPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setBackendError(data.message || "Unknown error");
        return;
      }

      navigation.goBack();
    } catch (e) {
      setBackendError("Network error");
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
                marginBottom:55,
                fontWeight: "bold",
              },
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            {username}
          </Text>
          <Text style={{ color: "grey", marginBottom: 5 }}>
            Your current password
          </Text>
          <BaseForm
            inputs={[
              {
                placeholder: "Enter old password",
                state: setOldUserPassword,
                error: errors.oldUserPassword,
                secureTextEntry: true,
              },
            ]}
          />
          <Text style={{ color: "grey", marginBottom: 5 }}>New password</Text>
          <BaseForm
            inputs={[
              {
                placeholder: "Enter new password",
                state: setNewUserPassword,
                error: errors.newUserPassword,
                secureTextEntry: true,
              },
            ]}
          ></BaseForm>
          {backendError ? (
            <Text style={styles.errorText}>{backendError}</Text>
          ) : null}
          <TouchableWithoutFeedback onPress={submit}>
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
                Save
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  header_text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 100,
  },
  header2_text: {
    fontSize: 20,
    color: "gray",
    paddingTop: 20,
  },
  errorText: {
    color: "red",
    paddingTop: 10,
  },
});
