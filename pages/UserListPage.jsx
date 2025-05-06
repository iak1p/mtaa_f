import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store/store";
import Arrow from "../components/svg/Arrow";
import BankaIcon from "../components/svg/BankaIcon";
import PoolyInfoComponent from "../components/PoolyInfoComponent";
import { ScrollView } from "react-native-gesture-handler";
import List from "../components/svg/List";
import AddUserIcon from "../components/svg/AddUserIcon";

function UserListPage({
  route: {
    params: { budget_id, transactions, creator },
  },
}) {
  const { token, id } = useUserStore();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [userSpent, setUserSpent] = useState({});
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  const calculateTotalSpent = () => {
    return transactions.reduce((acc, transaction) => {
      if (acc[transaction.username]) {
        acc[transaction.username] += transaction.amount;
      } else {
        acc[transaction.username] = transaction.amount;
      }
      return acc;
    }, {});
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch(
      `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then(({ users }) => {
        setUsers(users);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setUserSpent(calculateTotalSpent());
      });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/users`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(({ users }) => {
  //       setUsers(users);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //       setUserSpent(calculateTotalSpent());
  //     });
  // }, []);

  const dropUser = (item) => {
    console.log("userDroed");
    console.log(item);

    console.log(item.id);
    console.log(budget_id);

    Alert.alert(`Are you sure want to drop ${item.username}`, "", [
      {
        text: "Yes",
        onPress: () => {
          fetch(
            `http://${process.env.EXPO_PUBLIC_ADDRESS}/budgets/${budget_id}/drop/${item.id}`,
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
              console.log("good");
            })
            .catch((err) => console.log(err));
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUsers();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow stroke={darkMode ? "#fff" : "#000"} />
        </TouchableWithoutFeedback>
        <View style={{ alignItems: "center" }}>
          <Text
            numberOfLines={1}
            style={[styles.titleStyle, darkMode ? { color: "#fff" } : null]}
          >
            Pooly's users
          </Text>
          <View style={{ gap: 10, flexDirection: "row", marginTop: 20 }}>
            <PoolyInfoComponent
              btnFunc={() => navigation.navigate("NewUser", { budget_id })}
              style={darkMode ? styles.iconStyleBlack : styles.iconStyle}
              text={`Add new user`}
              icon={<AddUserIcon stroke="#fff" />}
              darkMode={darkMode}
            />
          </View>
        </View>

        <Text
          style={[
            { fontWeight: "bold", marginTop: 20, fontSize: 16 },
            darkMode ? { color: "#fff" } : null,
          ]}
        >
          Users
        </Text>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                          darkMode ? { color: "#fff" } : null,
                        ]}
                      >
                        {item.username}
                      </Text>
                      <Text
                        style={[
                          { fontWeight: "bold" },
                          darkMode ? { color: "#fff" } : null,
                        ]}
                      >
                        {creator == item.id ? "admin" : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#A8A8A8", marginTop: 3 }}>
                        Cashed Out
                      </Text>
                      <Text
                        style={[
                          { marginTop: 3 },
                          darkMode ? { color: "#fff" } : null,
                        ]}
                      >
                        {userSpent[`${item.username}`]
                          ? new Intl.NumberFormat("de-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(userSpent[`${item.username}`])
                          : new Intl.NumberFormat("de-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(0)}
                      </Text>
                    </View>
                  </View>
                  {creator == id && creator != item.id ? (
                    <TouchableWithoutFeedback onPress={() => dropUser(item)}>
                      <Text
                        accessibilityLabel="Drop user"
                        style={[
                          {
                            paddingVertical: 10,
                            paddingLeft: 10,
                            fontSize: 20,
                          },
                          darkMode ? { color: "#fff" } : null,
                        ]}
                      >
                        x
                      </Text>
                    </TouchableWithoutFeedback>
                  ) : null}
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
}

export default UserListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
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
    fontSize: 20,
    // marginTop: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
  },
});
