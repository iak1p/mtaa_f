import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import useUserStore from "../store/store";

const SettingsPage = ({ navigation }) => {
  const { token, img } = useUserStore();

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
      style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
    >
      <SafeAreaView
        style={{
          // marginTop: -insets.top,
          backgroundColor: "#13293D",
          height: "14%",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.title}>Settings</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <View
              accessible={true}
              accessibilityRole="imagebutton"
              accessibilityLabel="Open user profile"
            >
              <Image source={{ uri: img }} style={styles.image} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={[
              darkMode
                ? { backgroundColor: "#912F40" }
                : { backgroundColor: "white" },
              styles.btnStyle,
              styles.shadowBox,
            ]}
          >
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Change your username"
              onPress={() => navigation.navigate("ChangeUsername")}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    darkMode ? { color: "#fff" } : { color: "black" },
                    {
                      paddingLeft: 8,
                      fontSize: 20,
                    },
                  ]}
                >
                  Change username
                </Text>
                <Text
                  style={[
                    darkMode ? { color: "#fff" } : { color: "black" },
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  {"❯"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={[
              darkMode
                ? { backgroundColor: "#912F40" }
                : { backgroundColor: "white" },
              styles.btnStyle,
              styles.shadowBox,
            ]}
          >
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Change your password"
              onPress={() => navigation.navigate("ChangeUserPassword")}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    darkMode ? { color: "#fff" } : { color: "black" },
                    {
                      paddingLeft: 8,
                      fontSize: 20,
                    },
                  ]}
                >
                  Change password
                </Text>
                <Text
                  style={[
                    darkMode ? { color: "#fff" } : { color: "black" },
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  {"❯"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
    marginTop: "125",
  },
  title: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
  btnStyle: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  shadowBox: {
    marginBottom: 20,
    borderRadius: 10,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Android Shadow
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingLeft: 8,
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  switch: {
    width: 50,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    padding: 2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
