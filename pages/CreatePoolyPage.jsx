import { SafeAreaView, StyleSheet, View } from "react-native";
import Arrow from "../components/svg/Arrow";
import { TouchableWithoutFeedback } from "react-native";
import WelcomeScreenSVG from "../components/svg/WelcomeScreenSVG";
import { Input } from "@rneui/base";

const CreatePoolyPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableWithoutFeedback>
      <WelcomeScreenSVG />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={""}
        containerStyle={{
          paddingLeft: 0,
          paddingBottom: 0,
          paddingRight: 0,
        }}
        inputContainerStyle={{
            borderBottomWidth: 0
        }}
      />
    </SafeAreaView>
  );
};

export default CreatePoolyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});
