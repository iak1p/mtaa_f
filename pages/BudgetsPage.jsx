import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  Vibration,
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
import * as Haptics from "expo-haptics";
import useUserStore from "../store/store";

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { token } = useUserStore();
  // const pooly = [
  //   {
  //     budget_id: 0,
  //     name: "Some ttitle",
  //     max_money: 1002,
  //     current_money: 230.43,
  //   },
  //   {
  //     budget_id: 1,
  //     name: "Some ttitle",
  //     max_money: 943,
  //     current_money: 450.32,
  //   },
  //   {
  //     budget_id: 2,
  //     name: "Some ttitle",
  //     max_money: 433,
  //     current_money: 400.22,
  //   },
  // ];
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);

  const fetchPoolys = () => {
    setLoading(true);
    fetch(`http://${LOCAL_HOST}:${PORT}/users/budgets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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
  };

  useEffect(() => {
    fetchPoolys();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          //   marginTop: -insets.top,
          backgroundColor: "#13293D",
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <Image source={require("../assets/123.jpg")} style={styles.image} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.title}>Pooly Fund</Text>
          <Text style={styles.subTitle}>{moneyRemain} $</Text>
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
            onEndReachedThreshold={1}
            refreshing={loading}
            onRefresh={() => {
              fetchPoolys();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Succes
              );
            }}
            style={{ paddingTop: 10 }}
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

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Android Shadow
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
