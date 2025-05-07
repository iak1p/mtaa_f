import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import List from "./svg/List";
import * as Progress from "react-native-progress";
import BankaIcon from "./svg/BankaIcon";
import { Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PoolyTablet = ({
  item: { name, max_money, current_money, budget_id, creator },
  darkMode,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("PoolyInfo", {
          name,
          max_money,
          current_money,
          budget_id,
          creator,
        })
      }
    >
      <View
        style={[
          style.container,
          {
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
            flex: 1,
          },
        ]}
      >
        <BankaIcon stroke={darkMode ? "#fff" : "#000"} />
        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 4,
            }}
          >
            <Text style={[style.title, darkMode ? { color: "#fff" } : null]}>
              {name}
            </Text>
            <Text style={darkMode ? { color: "#fff" } : null}>
              {new Intl.NumberFormat("de-US", {
                style: "currency",
                currency: "USD",
              }).format(max_money)}
            </Text>
          </View>
          <Progress.Bar
            progress={current_money / max_money}
            color="#A1869E"
            height={4}
            width={null}
          />
          <Text
            style={{
              paddingTop: 4,
              color: "#A1869E",
            }}
          >
            Remain{" "}
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(current_money)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PoolyTablet;

const style = StyleSheet.create({
  container: {
    // borderColorColor: "#13293d",
    // borderWidth: 1,

    paddingVertical: 4,
    color: "#fff",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
