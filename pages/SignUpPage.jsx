import React, { useState } from "react";
import AuthScreen from "../components/AuthScreen";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_repeat, setPasswordRepeat] = useState("");

  const auth = () => {
    try {
      console.log(username, password, password_repeat);
    } catch (e) {}
  };

  return (
    <AuthScreen
      title={"Create account"}
      subtitle={"Let’s get you set up!"}
      description={"Already have an account?"}
      link={"/signin"}
      inputs={[
        {
          lable: "Username or Email",
          placeholder: "Enter username or email",
          state: setUsername,
        },
        {
          lable: "Password",
          placeholder: "Enter password",
          state: setPassword,
        },
        {
          lable: "Repeat password",
          placeholder: "Confirm password",
          state: setPasswordRepeat,
        },
      ]}
      func={auth}
    />
  );
}
