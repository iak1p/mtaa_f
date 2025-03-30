import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";

const WelcomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.div}>
      <View style={{ alignItems: "center", paddingTop: 100 }}>
        <WelcomeScreenSVG />
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            paddingBottom: 10,
          }}
        >
          Welcome To OurApp
        </Text>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 30,
          }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos quod
          amet voluptatum, odio error doloremque.
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Main")}>
          <Text
            style={{
              textAlign: "center",
              padding: 15,
              borderRadius: 10,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          >
            Sign In
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Text
            style={{
              marginTop: 5,
              marginBottom: 15,
              textAlign: "center",
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#012E4A",
              color: "white",
              width: "100%",
              borderColor: "#012E4A",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          >
            Create account
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});

export default WelcomePage;
