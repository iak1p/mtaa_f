import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Route, Routes, Navigate, NativeRouter } from "react-router-native";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import WelcomePage from "../pages/WelcomePage";

const AppRoutes = () => {
  return (
    <NativeRouter>
      <SafeAreaView style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    marginTop: 0,
    marginLeft: "auto",
    marginBottom: 0,
    marginRight: "auto",
  },
});
