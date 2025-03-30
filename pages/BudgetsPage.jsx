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

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { token, img } = useUserStore();
  // const pooly = [
  //   {
  //     budget_id: 0,
  //     name: "Research and Development",
  //     max_money: 1000.45,
  //     current_money: 230.43,
  //   },
  //   {
  //     budget_id: 1,
  //     name: "IT Budget",
  //     max_money: 950,
  //     current_money: 450.32,
  //   },
  //   {
  //     budget_id: 2,
  //     name: "Marketing Budget",
  //     max_money: 443.54,
  //     current_money: 400.22,
  //   },
  // ];
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

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
          new_money += item.current_money;
        });
        setMoneyRemain(new_money);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log(pooly);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log(token);

  //   if (colorScheme === "dark") setDarkMode(true);
  //   fetchPoolys();
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (!token) return;
    
    if (colorScheme === "dark") setDarkMode(true);
    fetchPoolys();
  }, [token]);

  return (
    <View
      style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
    >
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
              btnStyle={[
                styles.btnStyle,
                styles.shadowBox,
                // darkMode ? { backgroundColor: "#000" } : null,
              ]}
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
            onEndReachedThreshold={1}
            refreshing={loading}
            onRefresh={() => {
              fetchPoolys();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Succes
              );
            }}
            style={{ paddingTop: 10 }}
          />
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
