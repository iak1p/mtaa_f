import React from "react";
import AuthScreen from "../components/AuthScreen";

export default function SignInPage() {
  return (
    <AuthScreen
      title={"Let's Sign you in."}
      subtitle={"Good to see you again!"}
      description={"Don't have an account?"}
      link={"/signup"}
      inputs={[
        { lable: "Username or Email", placeholder: "Enter username or email" },
        { lable: "Password", placeholder: "Enter password" },
      ]}
    />
  );
}
