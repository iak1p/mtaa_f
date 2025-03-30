import { Text, TouchableWithoutFeedback, View } from "react-native";

function PoolyInfoComponent({ btnFunc, style, text, icon, darkMode = false }) {
  return (
    <TouchableWithoutFeedback onPress={() => btnFunc()}>
      <View style={{ alignItems: "center" }}>
        <View style={style}>{icon}</View>
        <Text
          numberOfLines={2}
          style={[
            { marginTop: 5, textAlign: "center", width: 80 },
            darkMode
              ? { color: "white" }
              : "null",
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PoolyInfoComponent;
