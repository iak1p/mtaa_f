import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Budget") iconName = "wallet";
          else if (route.name === "Home") iconName = "home";
          else if (route.name === "CreatePooly") iconName = "add-circle";

          return <List />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 70, paddingBottom: 0 },
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Budget" component={BudgetPage} />
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
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
          initialRouteName="Main"
          screenOptions={{
            // ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="NewTransaction" component={NewTransactionPage} />
          <Stack.Screen name="NewUser" component={AddNewUserPage} />
          <Stack.Screen name="UserList" component={UserListPage} />
          <Stack.Screen name="Budget" component={BudgetPage} />
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="CreatePolly" component={CreatePoolyPage} />
          <Stack.Screen name="PoolyInfo" component={PoolyInfoPage} />
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
