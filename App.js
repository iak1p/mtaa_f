import React from "react";
import AppRoutes from "./routers/AppRouters";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <AppRoutes></AppRoutes>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
