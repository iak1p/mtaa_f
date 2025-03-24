import { StyleSheet, Text, View } from "react-native";
import List from "./svg/List";
import * as Progress from "react-native-progress";
import BankaIcon from "./svg/BankaIcon";

const Pooly = ({ item: { name, max_money, current_money } }) => {
  return (
    <View
      style={[
        style.container,
        { flexDirection: "row", alignItems: "center", marginTop: 8 },
      ]}
    >
      <BankaIcon />
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 4,
            // paddingHorizontal: 2,
          }}
        >
          <Text style={style.title}>{name}</Text>
          <Text>{max_money}</Text>
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
            // paddingHorizontal: 2,
            color: "#A1869E",
          }}
        >
          Remain {new Intl.NumberFormat('en-US').format(current_money)} $
        </Text>
      </View>
    </View>
  );
};

export default Pooly;

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
