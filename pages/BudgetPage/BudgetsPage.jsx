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
import Header from "../../components/Header";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import Pooly from "../../components/Pooly";
import Button from "../../components/Button";
import List from "../../components/svg/List";
import ButtonComponent from "../../components/ButtonComponent";
import { Link } from "react-router-native";
import { LOCAL_HOST, PORT } from "../../env";
import styles from "./BudgetPageStyles";

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const pooly = [
    {
      budget_id: 0,
      name: "Some ttitle",
      max_money: 1002,
      current_money: 230.43,
    },
    { budget_id: 1, name: "Some ttitle", max_money: 943, current_money: 450.32 },
    { budget_id: 2, name: "Some ttitle", max_money: 433, current_money: 400.22 },
  ];
  // const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`http://${LOCAL_HOST}:${PORT}/users/budgets/all`, {
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
        const formattedNumberUS = new Intl.NumberFormat("en-US").format(
          new_money
        );
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
            <ButtonComponent
              title={"Creater new"}
              func={() => navigation.navigate("SignIn")}
              btnStyle={[styles.btnStyle, styles.shadowBox]}
              textStyle={{ paddingLeft: 5, fontWeight: "bold", color: "black" }}
              icon={<List />}
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
            style={{ paddingTop: 10 }}
          ></FlatList>
        )}
      </View>
    </View>
  );
};

export default BudgetPage;
