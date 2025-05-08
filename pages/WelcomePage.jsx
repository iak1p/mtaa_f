import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";

const WelcomePage = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);
  return (
    <View
      style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
    >
      <SafeAreaView style={styles.div}>
        <View style={{ alignItems: "center", paddingTop: 100 }}>
          <WelcomeScreenSVG />
        </View>
        <View>
          <Text
            style={[
              {
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 25,
                paddingBottom: 10,
              },
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            Welcome To OurApp
          </Text>
          <Text
            style={[
              {
                textAlign: "center",
                paddingBottom: 30,
              },
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos quod
            amet voluptatum, odio error doloremque.
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text
              style={[
                {
                  textAlign: "center",
                  padding: 15,
                  borderRadius: 10,
                  borderColor: darkMode ? "grey" : "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                },
                darkMode ? { color: "#fff" } : { color: "#000" },
              ]}
            >
              Sign In
            </Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={{
                marginTop: 5,
                marginBottom: 15,
                textAlign: "center",
                padding: 15,
                borderRadius: 10,
                backgroundColor: darkMode ? "#912F40" : "#012E4A",
                color: "white",
                width: "100%",
                borderColor: darkMode ? "#912F40" : "#012E4A",
                borderStyle: "solid",
                borderWidth: 2,
              }}
            >
              Create account
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // height: "100%",
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});

export default WelcomePage;
