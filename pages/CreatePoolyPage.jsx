import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow stroke="#000" />
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
            <WelcomeScreenSVG />
            <TextInput
              style={{
                fontSize: 28,
                fontWeight: "bold",
                padding: 5,
                width: 200,
                textAlign: "center",
              }}
              onChangeText={setPoolyName}
              value={poolyName}
              autoCorrect={false}
              autoFocus={true}
              maxLength={10}
            />
          </View>
          <ButtonComponent
            title={"Create Pooly"}
            btnStyle={styles.btnStyle}
            textStyle={styles.btnTextStyle}
          />
        </View>
      </SafeAreaView>
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
    backgroundColor: "#13293D",
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
