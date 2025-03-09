import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import Menu from "../components/Menu";

const MainPage = () => {
  return (
    <View style={styles.div}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "lightgreen",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>dddd</Text>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg",
            }}
            height={50}
            width={50}
            borderRadius={"100%"}
          />
        </View>

        <View></View>
      </View>
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
