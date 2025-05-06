import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  Appearance,
  useColorScheme,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Pooly from "../components/Pooly";
import List from "../components/svg/List";
import ButtonComponent from "../components/ButtonComponent";
import { LOCAL_HOST, PORT } from "../env";
import * as Haptics from "expo-haptics";
import useUserStore from "../store/store";
import { Accelerometer } from "expo-sensors";
import { Alert } from "react-native";
import useBudgetNotifications from "../utils/useBudgetNotifications";
import PoolyInfoComponent from "../components/PoolyInfoComponent";
import BankaIcon from "../components/svg/BankaIcon";

import NetInfo from "@react-native-community/netinfo";
import { Dimensions } from "react-native";

const BudgetsPageMobile = () => {
  const [budgetIds, setBudgetIds] = useState([]);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { token, img, transactions } = useUserStore();
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const fetchPoolys = () => {
    setLoading(true);

    NetInfo.fetch().then((state) => {
      if (state.isConnected && state.isInternetReachable) {
        fetch(`http://${LOCAL_HOST}:${PORT}/users/budgets/all`, {
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
      } else {
        console.log("No internet");
        setLoading(false);
      }
    });
  };

  // useBudgetNotifications(budgetIds);

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
        style={[
          // darkMode
          //   ? { backgroundColor: "#912F40" }
          //   :
          {
            //   marginTop: -insets.top,
            backgroundColor: "#13293D",
          },
        ]}
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

      <View style={{ top: -50 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginHorizontal: 20,
            }}
          >
            <ButtonComponent
              title={"Start a Pooly"}
              func={() => navigation.navigate("CreatePolly")}
              btnStyle={[styles.btnStyle, styles.shadowBox]}
              textStyle={{ paddingLeft: 5, fontWeight: "bold", color: "black" }}
              icon={<List />}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.container}>
        <Text style={[styles.classTitle, darkMode ? { color: "#fff" } : null]}>
          Pooly's
        </Text>
        <Text style={[darkMode ? { color: "#fff" } : null]}>
          {new Intl.NumberFormat("de-US", {
            style: "currency",
            currency: "USD",
          }).format(moneyRemain)}
        </Text>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={pooly}
            keyExtractor={(item) => item.budget_id.toString()}
            renderItem={({ item }) => {
              return <Pooly item={item} darkMode={darkMode} />;
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

export default BudgetsPageMobile;

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
    paddingBottom: 30,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: -45,
  },
  classSubtitle: {
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 16,
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
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
});
