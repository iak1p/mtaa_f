import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import BaseForm from "../components/BaseForm";
import { LOCAL_HOST, PORT } from "../env";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store/store";
import * as Haptics from "expo-haptics";

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

  const validate = () => {
    if (username.length == 0) {
      setUsernameError({
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
    setUsernameError({
      hasError: false,
      message: "",
    });
  }, [username]);

  const addNewUserToPolly = async () => {
    if (validate()) {
      try {
        const res = await fetch(
          `http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/users`,
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
            placeholder: "Enter username",
            state: setUsername,
            error: usernameError,
          },
        ]}
      />
      <TouchableWithoutFeedback onPress={() => addNewUserToPolly()}>
        <Text>Add</Text>
      </TouchableWithoutFeedback>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}

export default AddNewUserPage;
