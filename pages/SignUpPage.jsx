import React from "react";
import AuthScreen from "../components/AuthScreen";

export default function SignInPage() {
  return (
    <AuthScreen
      title={"Create account"}
      subtitle={"Let’s get you set up!"}
      description={"Already have an account?"}
      link={"/signin"}
      inputs={[
        { lable: "Username or Email", placeholder: "Enter username or email" },
        { lable: "Password", placeholder: "Enter password" },
        { lable: "Repeat password", placeholder: "Confirm password" },
      ]}
    />
  );
}
