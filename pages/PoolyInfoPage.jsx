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
} from "react-native";
import Arrow from "../components/svg/Arrow";
import { useNavigation } from "@react-navigation/native";
import BankaIcon from "../components/svg/BankaIcon";
import { useEffect, useState } from "react";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";
import { ScrollView } from "react-native-gesture-handler";
import List from "../components/svg/List";
import PoolyInfoComponent from "../components/PoolyInfoComponent";
import AddUserIcon from "../components/svg/AddUserIcon";
import UsersIcon from "../components/svg/UsersIcon";
import { color } from "@rneui/base";

const PoolyInfoPage = ({
  route: {
    params: { name, max_money, current_money, budget_id },
  },
}) => {
  const { token } = useUserStore();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  // const transactions = [
  //   {
  //     transaction_id: "0",
  //     budget_id: "1",
  //     user_id: "",
  //     amount: 150.5,
  //     username: "iak1p",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266365468.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "1",
  //     budget_id: "1",
  //     user_id: "18",
  //     amount: 500,
  //     username: "test",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//user.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "2",
  //     budget_id: "1",
  //     user_id: "19",
  //     amount: 15.42,
  //     username: "qqqq",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266175575.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "3",
  //     budget_id: "1",
  //     user_id: "20",
  //     amount: 500,
  //     username: "iak1p",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266365468.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "6",
  //     budget_id: "1",
  //     user_id: "18",
  //     amount: 1542.15,
  //     username: "test",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//user.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "8",
  //     budget_id: "1",
  //     user_id: "19",
  //     amount: 100,
  //     username: "qqqq",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266175575.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "9",
  //     budget_id: "1",
  //     user_id: "18",
  //     amount: 200,
  //     username: "test",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//user.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "17",
  //     budget_id: "1",
  //     user_id: "19",
  //     amount: 100,
  //     username: "qqqq",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266175575.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  //   {
  //     transaction_id: "18",
  //     budget_id: "1",
  //     user_id: "20",
  //     amount: 3000,
  //     username: "iak1p",
  //     img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266365468.jpg",
  //     date: "2025-03-29T00:00:00.000Z",
  //   },
  // ];
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const dropPooly = () => {
    Alert.alert("This Pooly will never be the same without you :(", "", [
      {
        text: "Yes",
        onPress: () => {
          fetch(
            `http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/users/drop`,
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
    if (colorScheme === "dark") setDarkMode(true);
    setLoading(true);
    fetch(`http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={darkMode ? styles.backBack : styles.back}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow stroke={darkMode ? "#fff" : "#000"} />
        </TouchableWithoutFeedback>
        <View style={{ alignItems: "center" }}>
          <View style={darkMode ? styles.iconStyleBlack : styles.iconStyle}>
            <BankaIcon stroke="#fff" />
          </View>

          <Text
            numberOfLines={1}
            style={darkMode ? styles.titleStyleDark : styles.titleStyle}
          >
            {name}
          </Text>

          <Text
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

          <Text style={{ marginTop: 5, fontSize: 16, color: "grey" }}>
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
              />
              {/* <PoolyInfoComponent
              btnFunc={() =>
                navigation.navigate("NewTransaction", { budget_id })
              }
              style={styles.iconStyle}
              text={`Top-up transaction`}
              icon={<BankaIcon stroke="#fff" />}
            /> */}
              <PoolyInfoComponent
                btnFunc={() =>
                  navigation.navigate("UserList", { budget_id, transactions })
                }
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Show \n User list`}
                icon={<UsersIcon stroke="#fff" />}
                darkMode={darkMode}
              />
              <PoolyInfoComponent
                btnFunc={() => dropPooly()}
                style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
                text={`Drop this Pooly`}
                icon={<List stroke="#fff" />}
                darkMode={darkMode}
              />
            </View>
          </ScrollView>
        </View>

        <Text
          style={[
            { fontWeight: "bold", marginTop: 20, fontSize: 16 },
            darkMode
              ? {
                  color: "#fff",
                }
              : "null",
          ]}
        >
          Transactions
        </Text>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Image source={{ uri: item.img_uri }} style={styles.image} />
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
                        Cashed Out
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
              );
            }}
            style={{ paddingTop: 10 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ></FlatList>
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
    borderRadius: "100%",
  },
  iconStyleBlack: {
    width: 50,
    height: 50,
    backgroundColor: "#912F40",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
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
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
  },
});
