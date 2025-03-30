import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
import ShoppingCart from "../components/svg/ShoppingCart";
import EntertaimentSmile from "../components/svg/EntertaimentSmile";
import OtherIcon from "../components/svg/OtherIcon";
import Coffee from "../components/svg/Coffee";

const MainPage = ({ navigation }) => {
  const [moneyRemain, setMoneyRemain] = useState(0);
  const insets = useSafeAreaInsets();
  const [incomeMoney, setIncomeMoney] = useState(1500);
  const [expenseMoney, setExponseMoney] = useState(0);
  const [percentExpenses, setPercentExpenses] = useState(15);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          // marginTop: -insets.top,
          backgroundColor: "#13293D",
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <Image source={require("../assets/123.jpg")} style={styles.image} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.title}>Pooly Fund</Text>
          <Text style={styles.subTitle}>$ {moneyRemain}</Text>
          <Text style={styles.subTitle2}>
            You spend {percentExpenses}% more than previous month
          </Text>
        </View>
      </SafeAreaView>
      <View style={{ top: 10 }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: 20,
            alignContent: "center",
          }}
        >
          <View style={[styles.btnStyle, styles.shadowBox]}>
            <Plus />
            <View>
              <Text
                style={{
                  paddingLeft: 8,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 20,
                }}
              >
                $ {incomeMoney}
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  color: "grey",
                }}
              >
                Total income
              </Text>
            </View>
          </View>

          <View style={[styles.btnStyle, styles.shadowBox]}>
            <Minus />
            <View>
              <Text
                style={{
                  paddingLeft: 8,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 20,
                }}
              >
                $ {expenseMoney}
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  color: "grey",
                }}
              >
                Total expense
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.graphContainer}></View>
      <View style={styles.container}>
        <Text style={styles.classTitle}>Operations</Text>
        <ScrollView vertical={true}>
          <View>
            <View style={styles.transactionRow}>
              <ShoppingCart />
              <View style={{ width: "60%", marginLeft: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Food</Text>
                <Text style={{ fontSize: 15, color: "grey" }}>Data</Text>
              </View>
              {/* тут проверку на прибыль або трату */}
              <Minus></Minus>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                $1500
              </Text>
            </View>
            <View style={styles.transactionRow}>
              <EntertaimentSmile />
              <View style={{ width: "60%", marginLeft: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Entertaiment
                </Text>
                <Text style={{ fontSize: 15, color: "grey" }}>Data</Text>
              </View>
              {/* тут проверку на прибыль або трату */}
              <Minus></Minus>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                $1500
              </Text>
            </View>
            <View style={styles.transactionRow}>
              <OtherIcon />
              <View style={{ width: "60%", marginLeft: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Other</Text>
                <Text style={{ fontSize: 15, color: "grey" }}>Data</Text>
              </View>
              {/* тут проверку на прибыль або трату */}
              <Plus />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                $1500
              </Text>
            </View>
            <View style={styles.transactionRow}>
              <Coffee />
              <View style={{ width: "60%", marginLeft: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Restaurants
                </Text>
                <Text style={{ fontSize: 15, color: "grey" }}>Data</Text>
              </View>
              {/* тут проверку на прибыль або трату */}
              <Minus></Minus>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                $1500
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  // div: {
  //   flex: 1,
  //   // display: "flex",
  //   // justifyContent: "space-between",
  //   // position: "relative",
  // },
  // text: {
  //   // paddingTop: 50,
  // },
  container: {
    flex: 1,
    width: "90%",
    marginTop: 80,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  graphContainer: {
    flex: 1,
    width: "90%",
    marginBottom: 0,
    marginHorizontal: "auto",
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 0,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    paddingTop: 16,
    color: "white",
    fontFamily: "Montserat",
  },
  subTitle2: {
    textAlign: "center",
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: -20,
  },
  btnStyle: {
    flexDirection: "row",
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 5,
    width: 190,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Android Shadow
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
  transactionRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    paddingLeft: 15,
  },
});
