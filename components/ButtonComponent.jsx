import { Text, TouchableWithoutFeedback, View } from "react-native";

const ButtonComponent = ({ btnStyle, title, func, icon, textStyle }) => {
  return (
    <TouchableWithoutFeedback onPress={func}>
      <View style={btnStyle}>
        {icon}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonComponent;
