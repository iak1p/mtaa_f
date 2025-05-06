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
import useUserStore from "../store/store";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";

const CreatePoolyAmountPage = ({
  route: {
    params: { poolyName },
  },
}) => {
  const [poolyAmount, setPoolyAmount] = useState();
  const { token } = useUserStore();
  const navigation = useNavigation();

  const addNewPooly = async () => {
    // if (validate()) {
    console.log(poolyName + poolyAmount);
    try {
      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            amount: poolyAmount.replace(",", "."),
            name: poolyName,
          }),
        }
      );
      const data = await res.json();
      console.log(res.status);

      if (!res.ok) {
        setError(data.message);
        return;
      }

      console.log("Response:", data);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.reset({
        index: 0,
        routes: [{ name: "Budget" }],
      });
    } catch (error) {
      console.error("Error:", error);
    }
    // }
  };

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
            <Text>{poolyName}</Text>
            <TextInput
              style={{
                fontSize: 28,
                fontWeight: "bold",
                padding: 5,
                width: 200,
                textAlign: "center",
              }}
              onChangeText={setPoolyAmount}
              value={poolyAmount}
              autoCorrect={false}
              autoFocus={true}
              maxLength={10}
            />
          </View>
          <ButtonComponent
            title={"Create Pooly"}
            btnStyle={styles.btnStyle}
            textStyle={styles.btnTextStyle}
            func={() => addNewPooly()}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreatePoolyAmountPage;

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
