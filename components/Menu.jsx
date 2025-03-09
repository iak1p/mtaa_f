import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Menu = () => {
  return (
    <View style={styles.div}>
      <Text>Home</Text>
      <Text>Transactions</Text>
      <Text>Settings</Text>
      <Text>dddd</Text>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  div: {
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
    height: 120,
  },
});
