import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import useUserStore from "../store/store";
import List from "./svg/List";

const Header = () => {
  const { username, token } = useUserStore();
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "lightgreen",
          justifyContent: "space-between",
        }}
      >
        <List />

        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg",
          }}
          height={50}
          width={50}
          borderRadius={"100%"}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
