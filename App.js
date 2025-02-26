import React from "react";
import AppRoutes from "./routers/AppRouters";
import { View } from "react-native";

export default function App() {
  return <View style={{ backgroundColor: "#fff", flex: 1 }}><AppRoutes></AppRoutes></View>;
}

