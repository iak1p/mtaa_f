import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import Button from "../components/Button";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";

const WelcomePage = () => {
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos quod amet voluptatum, odio error doloremque.
        </Text>
        <Link to="/signin">
          <Button
            text="Sign In"
            style={{
              textAlign: "center",
              padding: 15,
              borderRadius: 10,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          />
        </Link>
        <Link to="/signup">
          <Button
            text="Create account"
            style={{
              marginTop: 5,
              marginBottom: 15,
              textAlign: "center",
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#012E4A",
              color: "white",
              width: "100%",
            }}
          />
        </Link>
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
  },
});

export default WelcomePage;
