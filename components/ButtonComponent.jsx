import { Text, TouchableWithoutFeedback, View } from "react-native";
import List from "./svg/List";

const ButtonComponent = ({ btnStyle, title, func }) => {
  return (
    <TouchableWithoutFeedback onPress={func}>
      <View style={btnStyle}>
        <List />
        <Text
          numberOfLines={2}
          style={{ paddingLeft: 5, fontWeight: "bold", color: "black" }}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonComponent;
