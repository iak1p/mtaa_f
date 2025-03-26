import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.div}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </TouchableWithoutFeedback>
      <Text>Transactions</Text>
      <Text>Settings</Text>
      <Text>dddd</Text>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  div: {
    backgroundColor: "tomato",
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
