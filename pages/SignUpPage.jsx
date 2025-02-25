import React from "react";
import AuthScreen from "../components/AuthScreen";

export default function SignInPage() {
  return (
    <AuthScreen
      title={"Sign Up"}
      description={"Already have an account?"}
      link={"/signin"}
    />
  );
}
