import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  useColorScheme,
  SafeAreaView,
} from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import Pooly from "../components/Pooly";
import * as Haptics from "expo-haptics";
import useUserStore from "../store/store";
import useBudgetNotifications from "../utils/useBudgetNotifications";
import PoolyInfoComponent from "../components/PoolyInfoComponent";
import BankaIcon from "../components/svg/BankaIcon";
import NetInfo from "@react-native-community/netinfo";
import * as Device from "expo-device";
import { Dimensions } from "react-native";
import PoolyTablet from "../components/PoolyTablet";

const BudgetPage = ({ navigation }) => {
  const { token, img } = useUserStore();
  // const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const [budgetIds, setBudgetIds] = useState([]);
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const { width, height } = Dimensions.get("window");
  const isTabletFallback = Math.min(width, height) >= 600;
  console.log(isTabletFallback);

  const fetchPoolys = () => {
    console.log("fewettt");

    setLoading(true);

    NetInfo.fetch().then((state) => {
      // if (state.isConnected && state.isInternetReachable) {
      fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/users/budgets/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then(({ pooly }) => {
          setPooly(pooly);
          setBudgetIds(pooly.map((p) => p.budget_id));

          let new_money = 0;
          pooly.forEach((item) => {
            new_money += item.current_money;
          });

          setMoneyRemain(new_money);
        })
        .catch((err) => {
          console.log("Request error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
      // } else {
      //   console.log("No wifi connection");
      //   setLoading(false);
      // }
    });
  };

  useBudgetNotifications(budgetIds);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  useEffect(() => {
    setLoading(true);
    if (!token) return;
    fetchPoolys();
  }, [token]);

  return (
    <View
      style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#13293D",
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <Image source={{ uri: img }} style={styles.image} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.title}>Pooly Fund</Text>
          <Text style={styles.subTitle}>
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(moneyRemain)}
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.container}>
        <PoolyInfoComponent
          btnFunc={() => navigation.navigate("CreatePolly")}
          style={[
            darkMode ? styles.iconStyleBlack : styles.iconStyle,
            { marginTop: 10 },
          ]}
          text={`Start a Pooly`}
          icon={<BankaIcon stroke="#fff" />}
          darkMode={darkMode}
        />

        <Text style={[styles.classTitle, darkMode ? { color: "#fff" } : null]}>
          Pooly's
        </Text>
        <Text style={[{ fontSize: 20 }, darkMode ? { color: "#fff" } : null]}>
          {new Intl.NumberFormat("de-US", {
            style: "currency",
            currency: "USD",
          }).format(moneyRemain)}
        </Text>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            numColumns={2}
            data={pooly}
            keyExtractor={(item) => item.budget_id.toString()}
            renderItem={({ item }) => {
              return <PoolyTablet item={item} darkMode={darkMode} />;
            }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            refreshing={loading}
            onRefresh={() => {
              fetchPoolys();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }}
            style={{ paddingTop: 10 }}
          />
        )}
      </View>
    </View>
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 0,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 30,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },
  btnStyle: {
    flexDirection: "row",
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 5,
    width: 200,
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
  iconStyle: {
    width: 50,
    height: 50,
    backgroundColor: "#13293D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  iconStyleBlack: {
    width: 50,
    height: 50,
    backgroundColor: "#912F40",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
