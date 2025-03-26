import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Route, Routes, Navigate, NativeRouter } from "react-router-native";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import WelcomePage from "../pages/WelcomePage";
import MainPage from "../pages/MainPage";
import Menu from "../components/Menu";
import useUserStore from "../store/store";
import BudgetPage from "../pages/BudgetPage/BudgetsPage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserPage from "../pages/UserPage";
import CreatePoolyPage from "../pages/CreatePoolyPage";

const AppRoutes = () => {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();

  const { username, token } = useUserStore();
  return (
    // <NativeRouter>
    //   <SafeAreaView style={styles.container}>
    //     <Routes>
    //       <Route path="/signin" element={<SignInPage />} />
    //       <Route path="/signup" element={<SignUpPage />} />
    //       {/* {token ? (
    //         <Route path="/" element={<MainPage />} />
    //       ) : (
    //         <Route path="/" element={<WelcomePage />} />
    //       )} */}
    //       {/* <Route path="/main" element={<MainPage />} /> */}
    //       <Route path="/" element={<BudgetPage />} />
    //       {/* <Route path="/" element={<WelcomePage />} /> */}
    //       {/* <Route path="/" element={<MainPage />} /> */}
    //     </Routes>
    //   </SafeAreaView>
    // </NativeRouter>
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Budget"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Budget" component={BudgetPage} />
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="CreatePolly" component={CreatePoolyPage} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
