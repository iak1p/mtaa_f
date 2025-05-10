import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Appearance,
  useColorScheme,
  RefreshControl,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import BankaIcon from "../components/svg/BankaIcon";
import { useCallback, useEffect, useState } from "react";
import useUserStore from "../store/store";
import { ScrollView } from "react-native-gesture-handler";
import List from "../components/svg/List";
import PoolyInfoComponent from "../components/PoolyInfoComponent";
import AddUserIcon from "../components/svg/AddUserIcon";
import UsersIcon from "../components/svg/UsersIcon";
import { Accelerometer } from "expo-sensors";
import DropDownPicker from "react-native-dropdown-picker";
import * as Haptics from "expo-haptics";
import Chat from "../components/svg/Chat";
import Delete from "../components/svg/DeleteIcon";

const PoolyInfoPage = ({
  route: {
    params: { name, max_money, current_money, budget_id, creator },
  },
}) => {
  const { token } = useUserStore();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [filters, setFilters] = useState({ type: "all", category: "all" });

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  const dropPooly = () => {
    Alert.alert("This Pooly will never be the same without you...", "", [
      {
        text: "Yes",
        onPress: () => {
          fetch(
            `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/users/drop`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          )
            .then((res) => {
              if (!res.ok) {
                console.log("something went wrong");
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              navigation.goBack();
            });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const totalForce =
        Math.abs(accelerometerData.x) +
        Math.abs(accelerometerData.y) +
        Math.abs(accelerometerData.z);

      const now = Date.now();

      if (totalForce > 2.5 && now - lastShakeTime > 1500) {
        setLastShakeTime(now);
        onShake();
      }
    });

    return () => subscription && subscription.remove();
  }, [lastShakeTime]);

  const onShake = async () => {
    const nav = navigation.getState();

    if (nav.routes.at(-1).name == "PoolyInfo") {
      navigation.navigate("NewTransaction", {
        budget_id,
        current_money,
      });
    }
  };

  const onSelect = (data) => {
    setFilters(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTransactions();
    });

    return unsubscribe;
  }, [navigation, filters]);

  // useEffect(() => {
  //   if (colorScheme === "dark") setDarkMode(true);
  //   setLoading(true);
  //   fetch(`http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/transactions`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(({transaction}) => {
  //       setTransactions(transaction);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchTransactions = () => {
    setLoading(true);
    fetch(
      `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/transactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then(({ transaction }) => {
        transaction = transaction.filter(
          (item) =>
            filters.category === "all" || item.category === filters.category
        );

        setTransactions(transaction);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={darkMode ? styles.backBack : styles.back}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        >
          <Arrow stroke={darkMode ? "#fff" : "#000"} />
        </TouchableWithoutFeedback>
        <View style={{ alignItems: "center" }}>
          <View style={darkMode ? styles.iconStyleBlack : styles.iconStyle}>
            <BankaIcon stroke="#fff" />
          </View>

          <Text
            accessible={true}
            accessibilityLabel={`Pool name ${name}`}
            numberOfLines={1}
            style={darkMode ? styles.titleStyleDark : styles.titleStyle}
          >
            {name}
          </Text>

          <Text
            accessible={true}
            accessibilityLabel={`Maximum amount is ${max_money} dollars`}
            style={
              darkMode
                ? {
                    marginTop: 16,
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#fff",
                  }
                : { marginTop: 16, fontSize: 40, fontWeight: "bold" }
            }
          >
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(max_money)}
          </Text>

          <Text
            accessible={true}
            accessibilityLabel={`Withdrawn: ${
              max_money - current_money
            } dollars`}
            style={{ marginTop: 5, fontSize: 16, color: "grey" }}
          >
            {"Withdrawn "}
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(max_money - current_money)}
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
          >
            <View style={{ gap: 10, flexDirection: "row" }}>
              <PoolyInfoComponent
                btnFunc={() =>
                  navigation.navigate("NewTransaction", {
                    budget_id,
                    current_money,
                  })
                }
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Withdraw transaction`}
                icon={<BankaIcon stroke="#fff" />}
                darkMode={darkMode}
                accessibilityLabel="Withdraw money from this pool"
                accessibilityRole="button"
              />
              <PoolyInfoComponent
                btnFunc={() =>
                  navigation.navigate("UserList", {
                    budget_id,
                    transactions,
                    creator,
                  })
                }
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Show \n User list`}
                icon={<UsersIcon stroke="#fff" />}
                darkMode={darkMode}
                accessibilityLabel="Show list of users in this pool"
                accessibilityRole="button"
              />
              <PoolyInfoComponent
                btnFunc={() => navigation.navigate("ChatPage", { budget_id })}
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Open \n Pooly chat`}
                icon={<Chat stroke="#fff" />}
                darkMode={darkMode}
                accessibilityLabel="Open chat for this pool"
                accessibilityRole="button"
              />
              <PoolyInfoComponent
                btnFunc={() => dropPooly()}
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Drop this Pooly`}
                icon={<Delete stroke="#fff" />}
                darkMode={darkMode}
                accessibilityLabel="Drop or delete this pool"
                accessibilityRole="button"
              />
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            accessible={true}
            accessibilityLabel="Transactions list"
            style={[
              { fontWeight: "bold", fontSize: 16 },
              darkMode
                ? {
                    color: "#fff",
                  }
                : "null",
            ]}
          >
            Transactions
          </Text>

          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("FilterModal", {
                onSelect: onSelect,
                filters: filters,
              })
            }
          >
            <Text style={{ color: "grey" }}>Filters</Text>
          </TouchableWithoutFeedback>
        </View>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : transactions.length != 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("Map", {
                      transaction: item,
                    })
                  }
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Transaction by ${
                    item.username
                  }, amount ${item.amount} dollars, date ${new Date(
                    item.date
                  ).toLocaleDateString("sk-SK")}`}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: item.img_uri }}
                      style={styles.image}
                    />

                    <View
                      style={{ flex: 1, paddingLeft: 10, paddingVertical: 5 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={[
                            { fontWeight: "bold" },
                            darkMode ? { color: "#fff" } : "null",
                          ]}
                        >
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </Text>
                        <Text
                          style={[
                            { fontWeight: "bold" },
                            darkMode ? { color: "#fff" } : "null",
                          ]}
                        >
                          {new Intl.NumberFormat("de-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.amount)}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "#A8A8A8", marginTop: 3 }}>
                          by {item.username ? item.username : "test"}
                        </Text>

                        <Text
                          style={[
                            { marginTop: 3 },
                            darkMode ? { color: "#fff" } : "null",
                          ]}
                        >
                          {new Date(item.date).toLocaleDateString("en", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            style={{ paddingTop: 10 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ></FlatList>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  fetchTransactions();
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  );
                }}
                // tintColor={darkMode ? "#fff" : "#000"}
              />
            }
          >
            <Text
              style={[
                { textAlign: "center", marginTop: 20 },
                darkMode ? { color: "#fff" } : { color: "#000" },
              ]}
            >
              No transactions yet
            </Text>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default PoolyInfoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  backBack: {
    flex: 1,
    backgroundColor: "#1C1C1C",
  },
  back: {
    flex: 1,
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
  titleStyle: {
    textDecorationLine: "underline",
    marginTop: 30,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  titleStyleDark: {
    textDecorationLine: "underline",
    marginTop: 30,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
  },
});
