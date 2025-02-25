import React from "react";
import { Text, View } from "react-native";

const Button = ({ text, style }) => {
  return (
    <View>
      <Text style={style}>{text}</Text>
    </View>
  );
};

export default Button;
