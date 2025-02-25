import React from "react";
import AuthScreen from "../components/AuthScreen";

export default function SignInPage() {
  return <AuthScreen title={"Sign In"} description={"Don't have an account?"} link={"/signup"}/>;
}
