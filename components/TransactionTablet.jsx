import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  useColorScheme,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
import ShoppingCart from "../components/svg/ShoppingCart";
import EntertaimentSmile from "../components/svg/EntertaimentSmile";
import OtherIcon from "../components/svg/OtherIcon";
import Coffee from "../components/svg/Coffee";
import useUserStore from "../store/store";
import { useEffect } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import Phone from "../components/svg/Phone";
import Info from "../components/svg/Info";

const TransactionTablet = ({ item }) => {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);
  return (
    <View style={styles.transactionRow}>
      <View style={{ alignItems: "center" }}>
        {item.category === "food" ? (
          <Coffee stroke={darkMode ? "#fff" : "#000"} />
        ) : item.category === "clothing" ? (
          <Info stroke={darkMode ? "#fff" : "#000"} />
        ) : item.category === "kids" ? (
          <EntertaimentSmile stroke={darkMode ? "#fff" : "#000"} />
        ) : (
          <OtherIcon stroke={darkMode ? "#fff" : "#000"} />
        )}

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={[
              { fontSize: 20, fontWeight: "bold" },
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            {item.category ? item.category : "No category"}
          </Text>
          <Text style={{ fontSize: 16, color: "grey" }}>
            {new Date(item.date).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text
          style={[
            { fontSize: 24, fontWeight: "bold" },
            darkMode ? { color: "#fff" } : { color: "#000" },
          ]}
        >
          -
          {new Intl.NumberFormat("de-US", {
            style: "currency",
            currency: "USD",
          }).format(item.amount)}
        </Text>
        <Text style={{ fontSize: 16, color: "grey" }}>
          From {item.budget_id} Pooly
        </Text>
      </View>
    </View>
  );
};

export default TransactionTablet;

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
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  graphContainer: {
    flex: 0.5,
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
    marginTop: -40,
    fontWeight: "bold",
    fontSize: 30,
  },
  btnStyle: {
    flexDirection: "row",
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 5,
    // width: 190,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
  transactionRow: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    marginTop: 25,
  },
});
