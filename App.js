import React, { useEffect } from "react";
import AppRoutes from "./routers/AppRouters";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "./store/store";
import { useNetworkSync } from "./utils/useNetworkSync";

export default function App() {
  useNetworkSync();

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}> */}
      <AppRoutes></AppRoutes>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
