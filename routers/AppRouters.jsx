import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import WelcomePage from "../pages/WelcomePage";
import MainPage from "../pages/MainPage";
import useUserStore from "../store/store";
import BudgetPage from "../pages/BudgetsPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from "expo-device";
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
import FilterModal from "../pages/FilterModal";
import { Dimensions } from "react-native";
import BudgetsPageTablet from "../pages/BudgetsPageTablet";
import PoolyInfoPageTablet from "../pages/PoolyInfoPageTablet";
import ChangeUsernamePage from "../pages/ChangeUsernamePage";
import ChangeUserPasswordPage from "../pages/ChangeUserPasswordPage";
import MapScreen from "../components/MapScreen";
import MainPageTablet from "../pages/MainPageTablet";
import UserPageTablet from "../pages/UserPageTablet";
import WelcomePageTablet from "../pages/WelcomePageTablet";
import SignInPageTablet from "../pages/SignInPageTablet";
import SignUpPageTablet from "../pages/SignUpPageTablet";

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
      {isTabletFallback || Device.deviceType == 2 ? (
        <Tab.Screen name="Home" component={MainPageTablet} />
      ) : (
        <Tab.Screen name="Home" component={MainPage} />
      )}
      {isTabletFallback || Device.deviceType == 2 ? (
        <Tab.Screen name="Budget" component={BudgetsPageTablet} />
      ) : (
        <Tab.Screen name="Budget" component={BudgetPage} />
      )}
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
  const { width, height } = Dimensions.get("window");
  const isTabletFallback = Math.min(width, height) >= 600;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          {isTabletFallback || Device.deviceType == 2 ? (
            <Stack.Screen name="Welcome" component={WelcomePageTablet} />
          ) : (
            <Stack.Screen name="Welcome" component={WelcomePage} />
          )}

          {isTabletFallback || Device.deviceType == 2 ? (
            <Stack.Screen name="SignUp" component={SignUpPageTablet} />
          ) : (
            <Stack.Screen name="SignUp" component={SignUpPage} />
          )}

          {isTabletFallback || Device.deviceType == 2 ? (
            <Stack.Screen name="SignIn" component={SignInPageTablet} />
          ) : (
            <Stack.Screen name="SignIn" component={SignInPage} />
          )}

          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="NewTransaction" component={NewTransactionPage} />
          <Stack.Screen name="ChatPage" component={PoolyChatPage} />
          <Stack.Screen name="NewUser" component={AddNewUserPage} />
          <Stack.Screen name="UserList" component={UserListPage} />
          <Stack.Screen
            name="CreatePoolyAmount"
            component={CreatePoolyAmountPage}
          />
          <Stack.Screen
            name="FilterModal"
            component={FilterModal}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="ChangeUsername" component={ChangeUsernamePage} />
          <Stack.Screen
            name="ChangeUserPassword"
            component={ChangeUserPasswordPage}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="CreatePolly" component={CreatePoolyPage} />

          {isTabletFallback || Device.deviceType == 2 ? (
            <Stack.Screen name="PoolyInfo" component={PoolyInfoPageTablet} />
          ) : (
            <Stack.Screen name="PoolyInfo" component={PoolyInfoPage} />
          )}

          {isTabletFallback || Device.deviceType == 2 ? (
            <Stack.Screen name="UserPage" component={UserPageTablet} />
          ) : (
            <Stack.Screen name="UserPage" component={UserPage} />
          )}
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
