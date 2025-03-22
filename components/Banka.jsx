import { StyleSheet, Text, View } from "react-native";
import List from "./svg/List";
import * as Progress from "react-native-progress";

const Banka = ({ item: { name, money, curentMoney } }) => {
  return (
    <View
      style={[
        style.container,
        { flexDirection: "row", alignItems: "center", marginTop: 8 },
      ]}
    >
      <List />
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={style.title}>{name}</Text>
          <Text>{money}</Text>
        </View>
        <Progress.Bar
          progress={curentMoney / money}
          color="grey"
          height={4}
          width={null}
        />
        <Text>{curentMoney}</Text>
      </View>
    </View>
  );
};

export default Banka;

const style = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    padding: 8,
    color: "#fff",
    borderRadius: 5,
  },
  title: {
    
  },
});
