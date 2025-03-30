import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LOCAL_HOST, PORT } from "../env";
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
    params: { budget_id, transactions },
  },
}) {
  //   const users = [
  //     {
  //       id: "1",
  //       user_id: "18",
  //       username: "test",
  //       img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//user.jpg",
  //     },
  //     {
  //       id: "2",
  //       user_id: "19",
  //       username: "qqqq",
  //       img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266175575.jpg",
  //     },
  //     {
  //       id: "3",
  //       user_id: "20",
  //       username: "iak1p",
  //       img: "https://churijlloevkfgiwttgy.supabase.co/storage/v1/object/public/img//1743266365468.jpg",
  //     },
  //   ];
  const { token } = useUserStore();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [userSpent, setUserSpent] = useState({});
  const navigation = useNavigation();

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

  useEffect(() => {
    setLoading(true);
    fetch(`http://${LOCAL_HOST}:${PORT}/budgets/${budget_id}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setUserSpent(calculateTotalSpent());
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Arrow stroke="#000" />
      </TouchableWithoutFeedback>
      <View style={{ alignItems: "center" }}>
        <Text numberOfLines={1} style={styles.titleStyle}>
          Pooly's users
        </Text>

        {/* <Text style={{ marginTop: 16, fontSize: 40, fontWeight: "bold" }}>
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
        </Text> */}

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          <View style={{ gap: 10, flexDirection: "row" }}>
            <PoolyInfoComponent
              btnFunc={() => navigation.navigate("NewUser", { budget_id })}
              style={styles.iconStyle}
              text={`Add new user`}
              icon={<AddUserIcon stroke="#fff" />}
            />
          </View>
        </ScrollView>
      </View>

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 16 }}>
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
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.img_uri }} style={styles.image} />
                <View style={{ flex: 1, paddingLeft: 10, paddingVertical: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
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
                    <Text style={{ marginTop: 3 }}>
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
              </View>
            );
          }}
          style={{ paddingTop: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ></FlatList>
      )}
    </SafeAreaView>
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
