import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import { TouchableWithoutFeedback } from "react-native";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";
import { Input } from "@rneui/base";
import BankaIcon from "../components/svg/BankaIcon";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";

const CreatePoolyPage = ({ navigation }) => {
  const [poolyName, setPoolyName] = useState("On ");
  const colorScheme = useColorScheme();
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          >
            <Arrow stroke={darkMode ? "#fff" : "#000"} />
          </TouchableWithoutFeedback>
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <WelcomeScreenSVG
                accessible={true}
                accessibilityLabel="Welcome to the Pooly creation screen"
              />
              <Text
                style={[
                  {
                    fontSize: 15,
                    textAlign: "center",
                    color: "red",
                  },
                ]}
                accessible={true}
                accessibilityLabel={`Creating Pooly named ${poolyName}`}
              >
                {error}
              </Text>
              <TextInput
                style={[
                  darkMode ? { color: "#fff" } : { color: "#000" },
                  {
                    fontSize: 28,
                    fontWeight: "bold",
                    padding: 5,
                    width: 200,
                    textAlign: "center",
                  },
                ]}
                onChangeText={setPoolyName}
                value={poolyName}
                autoCorrect={false}
                autoFocus={true}
                maxLength={10}
                accessibilityLabel="Enter name for your Pooly"
                accessibilityHint="Maximum 10 characters"
                accessibilityRole="keyboardkey"
              />
            </View>
            <ButtonComponent
              title={"Set name"}
              btnStyle={[
                darkMode
                  ? { backgroundColor: "#912F40" }
                  : { backgroundColor: "#13293D" },
                styles.btnStyle,
              ]}
              textStyle={[styles.btnTextStyle]}
              accessibilityLabel="Set Pooly name and continue"
              accessibilityRole="button"
              func={() => {
                if (poolyName.trim().length === 0) {
                  setError("Enter name");
                  return;
                }
                navigation.navigate("CreatePoolyAmount", { poolyName });
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePoolyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  btnStyle: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  btnTextStyle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
