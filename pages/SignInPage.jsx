import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import Arrow from "../components/svg/Arrow";
import BaseForm from "../components/BaseForm";
import { Button } from "@rneui/base";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [backendError, setbackendError] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
  });

  const validate = () => {
    let newErrors = {
      username: { hasError: false, message: "" },
      password: { hasError: false, message: "" },
    };

    if (username.trim().length < 3) {
      newErrors.username.message = "Username is to short";
      newErrors.username.hasError = true;
    }
    if (password.length < 4) {
      newErrors.password.message = "Password is to short. Min. 4 letters";
      newErrors.password.hasError = true;
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error.hasError);
  };

  const auth = async () => {
    console.log(username, password);
    if (validate()) {
      try {
        const res = await fetch("http://172.20.10.4:4001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setbackendError(data.message);
          return;
        }

        console.log("Response:", data);
        navigate("/main");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
      >
        <View>
          <Link to="/" style={{ paddingTop: 10 }}>
            <Arrow />
          </Link>
          <Text style={styles.header_text}>Let's Sign you in.</Text>
          <Text style={styles.header2_text}>Good to see you again!</Text>

          <View style={{ paddingTop: 50 }}>
            <BaseForm
              inputs={[
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
              ]}
            />
            <Text style={styles.errorText}>{backendError}</Text>
          </View>
        </View>

        <View>
          <Link to="/signup">
            <Text style={styles.link}>Don't have an account?</Text>
          </Link>

          <Button
            title={"Login"}
            radius={10}
            color={"#012E4A"}
            buttonStyle={{
              padding: 15,
              marginBottom: 15,
              borderColor: "#012E4A",
              borderStyle: "solid",
              borderWidth: 1,
            }}
            titleStyle={{ fontSize: 14 }}
            onPress={auth}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header_text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 70,
  },
  header2_text: {
    fontSize: 25,
    color: "gray",
    paddingTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    paddingTop: 10,
    textAlign: "center",
    paddingBottom: 10,
  },
  errorText: {
    color: "red",
  },
});
