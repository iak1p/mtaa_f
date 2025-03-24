import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Menu from "../components/Menu";
import Pooly from "../components/Pooly";
import Button from "../components/Button";
import List from "../components/svg/List";
import ButtonComponent from "../components/ButtonComponent";
import { Link } from "react-router-native";
import { LOCAL_HOST, PORT } from "../env";

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const sharedSavings = [
    { id: 0, name: "Some ttitle", money: 1002, curentMoney: 230.43 },
    { id: 1, name: "Some ttitle", money: 943, curentMoney: 450.32 },
    { id: 2, name: "Some ttitle", money: 433, curentMoney: 400.22 },
  ];
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`http://147.175.160.79:${PORT}/users/budgets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4IiwidXNlcm5hbWUiOiJpYWtwIn0.sN-MoknrxG8YV0mjNhJbKkazT-m_U_iWhTPF_bQVv5c",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPooly(data);
        let new_money = 0;
        data.map((item) => {
          console.log(item.current_money);
          new_money += item.current_money;
        });
        const formattedNumberUS = new Intl.NumberFormat('en-US').format(new_money);
        setMoneyRemain(formattedNumberUS);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          marginTop: -insets.top + 40,
          backgroundColor: "#13293D",
        }}
      >
        <Text style={styles.title}>Pooly Fund</Text>
        <Text style={styles.subTitle}>{moneyRemain} $</Text>
      </SafeAreaView>
      <View style={{ top: -25 }}>
        <ScrollView horizontal={true}>
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
              btnStyle={{
                flexDirection: "row",
                backgroundColor: "#FCF7F8",
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 5,
                width: 200,
                height: 60,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
            <ButtonComponent
              title={"Creater new"}
              func={() => navigation.navigate("SignIn")}
              btnStyle={{
                flexDirection: "row",
                backgroundColor: "#FCF7F8",
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderRadius: 5,
                width: 200,
                height: 60,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={styles.classTitle}>Pooly's</Text>
        <Text>{moneyRemain} $</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={pooly}
            keyExtractor={(item) => item.budget_id.toString()}
            renderItem={({ item }) => {
              return <Pooly item={item} />;
            }}
            style={{ paddingTop: 20 }}
          ></FlatList>
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
    fontSize: 16,
    paddingTop: 40,
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
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  classSubtitle: {
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
