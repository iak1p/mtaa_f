import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import Menu from "../components/Menu";
import useUserStore from "../store/store";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <View style={styles.div}>
      <Header />
      {/* <Menu /> */}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  // div: {
  //   flex: 1,
  //   // display: "flex",
  //   // justifyContent: "space-between",
  //   // position: "relative",
  // },
  // text: {
  //   // paddingTop: 50,
  // },
});
