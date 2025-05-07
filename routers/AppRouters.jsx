import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import { Route, Routes, Navigate, NativeRouter } from "react-router-native";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import WelcomePage from "../pages/WelcomePage";
import MainPage from "../pages/MainPage";
import Menu from "../components/Menu";
import useUserStore from "../store/store";
import BudgetPage from "../pages/BudgetsPage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import UserPage from "../pages/UserPage";
import CreatePoolyPage from "../pages/CreatePoolyPage";
import PoolyInfoPage from "../pages/PoolyInfoPage";
import List from "../components/svg/List";
import NewTransactionPage from "../pages/NewTransactionPage";
import UserListPage from "../pages/UserListPage";
import AddNewUserPage from "../pages/AddNewUserPage";
import SettingsPage from "../pages/SettingsPage";
import PoolyChatPage from "../pages/PoolyChatPage";
import CreatePoolyAmountPage from "../pages/CreatePoolyAmountPage";
import UsersIcon from "../components/svg/UsersIcon";
import { Dimensions } from "react-native";
import BudgetsPageTablet from "../pages/BudgetsPageTablet";
import BudgetsPageMobile from "../pages/BudgetsPageMobile";
import PoolyInfoPageTablet from "../pages/PoolyInfoPageTablet";
import PoolyInfoPageMobile from "../pages/PoolyInfoPageMobile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();

  const { width, height } = Dimensions.get("window");
  const isTabletFallback = Math.min(width, height) >= 600;
  console.log(isTabletFallback);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Budget") {
            return <List stroke={darkMode ? "#fff" : "#000"} />;
          }
          if (route.name === "Settings") {
            return <List stroke={darkMode ? "#fff" : "#000"} />;
          }
          if (route.name === "Home") {
            return <UsersIcon stroke={darkMode ? "#fff" : "#000"} />;
          }
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 0,
          backgroundColor: darkMode ? "#1C1C1C" : "white",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Settings" component={SettingsPage} />
      <Tab.Screen name="Home" component={MainPage} />
      {isTabletFallback ? (
        <Tab.Screen name="Budget" component={BudgetsPageTablet} />
      ) : (
        <Tab.Screen name="Budget" component={BudgetsPageMobile} />
      )}
    </Tab.Navigator>
  );
};

// const BottomWelcomeTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === "Budget") iconName = "wallet";
//           else if (route.name === "Home") iconName = "home";
//           else if (route.name === "CreatePooly") iconName = "add-circle";

//           return <List />;
//         },
//         tabBarActiveTintColor: "#007AFF",
//         tabBarInactiveTintColor: "gray",
//         tabBarStyle: { height: 70, paddingBottom: 0 },
//         headerShown: false,
//         // ...TransitionPresets.SlideFromRightIOS,
//       })}
//     >
//       <Tab.Screen name="Welcome" component={WelcomePage} />
//     </Tab.Navigator>
//   );
// };

const AppRoutes = () => {
  const insets = useSafeAreaInsets();
  const { username, token } = useUserStore();

  const { width, height } = Dimensions.get("window");
  const isTabletFallback = Math.min(width, height) >= 600;
  console.log(isTabletFallback);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            // ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="Welcome" component={WelcomePage} /> */}
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="NewTransaction" component={NewTransactionPage} />
          <Stack.Screen name="ChatPage" component={PoolyChatPage} />
          <Stack.Screen name="NewUser" component={AddNewUserPage} />
          <Stack.Screen name="UserList" component={UserListPage} />
          <Stack.Screen
            name="CreatePoolyAmount"
            component={CreatePoolyAmountPage}
          />
          <Stack.Screen name="Budget" component={BudgetPage} />
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="CreatePolly" component={CreatePoolyPage} />

          {/* <Stack.Screen name="PoolyInfo" component={PoolyInfoPage} /> */}
          {isTabletFallback ? (
            <Stack.Screen name="PoolyInfo" component={PoolyInfoPageTablet} />
          ) : (
            <Stack.Screen name="PoolyInfo" component={PoolyInfoPageMobile} />
          )}

          <Stack.Screen name="UserPage" component={UserPage} />
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
