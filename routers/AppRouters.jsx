import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Route, Routes, Navigate, NativeRouter } from "react-router-native";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import WelcomePage from "../pages/WelcomePage";
import MainPage from "../pages/MainPage";
import Menu from "../components/Menu";
import useUserStore from "../store/store";

const AppRoutes = () => {
  const { username, token } = useUserStore();
  return (
    <NativeRouter>
      <SafeAreaView style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {token ? (
            <Route path="/" element={<MainPage />} />
          ) : (
            <Route path="/" element={<WelcomePage />} />
          )}
          <Route path="/main" element={<MainPage />} />
          {/* <Route path="/" element={<WelcomePage />} /> */}
          {/* <Route path="/" element={<MainPage />} /> */}
        </Routes>
      </SafeAreaView>
      {token ? <Menu /> : null}
    </NativeRouter>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({
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
