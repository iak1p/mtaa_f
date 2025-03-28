import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import { useNavigation } from "@react-navigation/native";
import BankaIcon from "../components/svg/BankaIcon";
import { useEffect, useState } from "react";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";

const PoolyInfoPage = ({
  route: {
    params: { name, max_money, current_money, budget_id },
  },
}) => {
  const { token } = useUserStore();
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Arrow stroke="#000" />
      </TouchableWithoutFeedback>
      <View style={{ alignItems: "center" }}>
        <BankaIcon />
        <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
        <Text>{new Intl.NumberFormat("en-US").format(current_money)} $</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("NewTransaction", { budget_id })}
        >
          <Text>Add new</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("UserList", { budget_id })}
        >
          <Text>User list</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => dropPooly()}>
          <Text>Drop this Pooly</Text>
        </TouchableWithoutFeedback>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.transaction_id.toString()}
            renderItem={({ item }) => {
              return (
                <Text>
                  {item.user_id} {item.amount}
                </Text>
              );
            }}
            style={{ paddingTop: 10 }}
          ></FlatList>
        )}
      </View>
    </SafeAreaView>
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
});
