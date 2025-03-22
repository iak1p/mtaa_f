import { Text, TouchableWithoutFeedback, View } from "react-native";
import List from "./svg/List";

const ButtonComponent = ({ title, func }) => {
  return (
    <TouchableWithoutFeedback onPress={func}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "green",
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 5,
          width: 200,
          height: 60,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <List />
        <Text style={{ flexWrap: "wrap", paddingLeft: 5 }}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonComponent;
