import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { LOCAL_HOST, PORT } from "../env";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../store/store";

function UserListPage({
  route: {
    params: { budget_id },
  },
}) {
  const { token } = useUserStore();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <Text>User</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("NewUser", { budget_id })}
      >
        <Text>Add new user</Text>
      </TouchableWithoutFeedback>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Text>{item.user_id}</Text>;
          }}
          style={{ paddingTop: 10 }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
}

export default UserListPage;
