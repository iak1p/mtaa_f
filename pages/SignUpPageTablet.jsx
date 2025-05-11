import { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import BaseForm from "../components/BaseForm";
import { Button } from "@rneui/base";
import useUserStore from "../store/store";

export default function SignUpPageTablet({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_repeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [backendError, setbackendError] = useState("");
  const { fetchUserData } = useUserStore();

  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  const [errors, setErrors] = useState({
    email: { hasError: false, message: "" },
    username: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
    password_repeat: { hasError: false, message: "" },
  });

  const validate = () => {
    let newErrors = {
      email: { hasError: false, message: "" },
      username: { hasError: false, message: "" },
      password: { hasError: false, message: "" },
      password_repeat: { hasError: false, message: "" },
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email.message = "Invalid email format";
      newErrors.email.hasError = true;
    }
    if (username.trim().length < 1) {
      newErrors.username.message = "Username is to short";
      newErrors.username.hasError = true;
    }
    if (password.length < 3) {
      newErrors.password.message = "Password is to short. Min. 3 letters";
      newErrors.password.hasError = true;
    }

    if (password !== password_repeat || password_repeat == "") {
      newErrors.password_repeat.message = "Passwords is not equal";
      newErrors.password_repeat.hasError = true;
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error.hasError);
  };

  const auth = async () => {
    console.log(username, password, password_repeat);
    if (validate()) {
      try {
        const res = await fetch(
          `http://${process.env.EXPO_PUBLIC_ADDRESS}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setbackendError(data.message);
          return;
        }

        console.log("Response:", data);

        fetchUserData(data.token);

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
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
        <SafeAreaView
          style={[
            { display: "flex", justifyContent: "space-between", flex: 1 },
            styles.container,
          ]}
        >
          <View>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <Arrow
                stroke={darkMode ? "#fff" : "#000"}
                style={{ marginTop: 10 }}
              ></Arrow>
            </TouchableWithoutFeedback>
            <Text
              style={[
                styles.header_text,
                darkMode ? { color: "#fff" } : { color: "#000" },
              ]}
            >
              Create account
            </Text>
            <Text style={styles.header2_text}>Let’s get you set up!</Text>

            <View style={{ paddingTop: 50 }}>
              <BaseForm
                inputs={[
                  {
                    lable: "Email",
                    placeholder: "Enter email",
                    state: setEmail,
                    error: errors.email,
                  },
                  {
                    lable: "Username",
                    placeholder: "Enter username",
                    state: setUsername,
                    error: errors.username,
                  },
                  {
                    lable: "Password",
                    placeholder: "Enter password",
                    state: setPassword,
                    error: errors.password,
                  },
                  {
                    lable: "Repeat password",
                    placeholder: "Confirm password",
                    state: setPasswordRepeat,
                    error: errors.password_repeat,
                  },
                ]}
              />
              <Text style={styles.errorText}>{backendError}</Text>
            </View>
          </View>

          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.replace("SignIn");
              }}
            >
              <Text style={styles.link}>Already have an account?</Text>
            </TouchableWithoutFeedback>

            <Button
              title={"Login"}
              radius={10}
              color={darkMode ? "#912F40" : "#012E4A"}
              buttonStyle={{
                padding: 20,
                marginBottom: 15,
                borderColor: darkMode ? "#912F40" : "#012E4A",
                borderStyle: "solid",
                borderWidth: 1,
              }}
              titleStyle={{ fontSize: 14 }}
              onPress={auth}
            />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header_text: {
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: 70,
  },
  header2_text: {
    fontSize: 30,
    color: "gray",
    paddingTop: 20,
  },
  link: {
    color: "grey",
    textDecorationLine: "underline",
    paddingTop: 15,
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 15,
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
    width: "85%",
    marginTop: 0,
    marginLeft: "auto",
    marginBottom: 0,
    marginRight: "auto",
    position: "relative",
  },
});
