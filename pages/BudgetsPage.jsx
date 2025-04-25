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
import { Accelerometer } from "expo-sensors";
import { Alert } from "react-native";

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { token, img } = useUserStore();
  const [pooly, setPooly] = useState();
  const [loading, setLoading] = useState(false);
  const [moneyRemain, setMoneyRemain] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const [data, setData] = useState({});
  const [lastShakeTime, setLastShakeTime] = useState(0);

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
      .then(({ pooly }) => {
        setPooly(pooly);
        let new_money = 0;
        pooly.map((item) => {
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

  useEffect(() => {
    Accelerometer.setUpdateInterval(300); // каждые 300мс

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);

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
    Alert.alert("📱 Тряска!", "Ты потряс телефон!");
  };

  // useEffect(() => {
  //   console.log(token);

  //   if (colorScheme === "dark") setDarkMode(true);
  //   fetchPoolys();
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (!token) return;

    console.log(img);

    if (colorScheme === "dark") setDarkMode(true);
    fetchPoolys();
  }, [token]);

  return (
    <View
      style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
    >
      <SafeAreaView
        style={[
          // darkMode
          //   ? { backgroundColor: "#912F40" }
          //   :
          {
            //   marginTop: -insets.top,
            backgroundColor: "#13293D",
          },
        ]}
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
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            refreshing={loading}
            onRefresh={() => {
              fetchPoolys();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
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
