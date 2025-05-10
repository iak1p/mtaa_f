import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TouchableWithoutFeedback } from "react-native";
import Arrow from "./svg/Arrow";
import { useNavigation } from "@react-navigation/native";
import Coffee from "./svg/Coffee";
import Phone from "./svg/ClothingIcon";
import EntertaimentSmile from "./svg/EntertaimentSmile";
import OtherIcon from "./svg/Education";
import { Audio } from "expo-av";

export default function Map({
  route: {
    params: { transaction },
  },
}) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);
  console.log(transaction);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      playSound();
    });

    return unsubscribe;
  }, [navigation]);

  // const transaction = params?.transaction;
  const latitude = transaction.latitude;
  const longitude = transaction.longitude;

  // if (!transaction || !latitude || !longitude) {
  //   return (
  //     <View
  //       style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
  //     >
  //       <SafeAreaView style={styles.container}>
  //         <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
  //           <View>
  //             <Arrow stroke={darkMode ? "#fff" : "#000"} />
  //           </View>
  //         </TouchableWithoutFeedback>
  //         <View style={[darkMode ? "#fff" : "#000", styles.center]}>
  //           <Text style={[darkMode ? { color: "#fff" } : { color: "black" }]}>
  //             No location data for this transaction.
  //           </Text>
  //         </View>
  //       </SafeAreaView>
  //     </View>
  //   );
  // }

  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Kinobe - Heartstring.mp3")
    );
    console.log(sound);

    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View>
            <Arrow stroke={darkMode ? "#fff" : "#000"} />
          </View>
        </TouchableWithoutFeedback>

        <View
          style={[
            { alignItems: "center" },
            darkMode ? styles.iconStyleBlack : styles.iconStyle,
          ]}
        >
          <Image source={{ uri: transaction.img_uri }} style={styles.image} />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "grey", marginTop: 10 }}>Withdrew by</Text>

          <Text
            numberOfLines={1}
            style={darkMode ? styles.titleStyleDark : styles.titleStyle}
          >
            {transaction.username}
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <View>
              <Text style={{ color: "grey", fontSize: 14 }}>AMOUNT</Text>
              <Text
                style={[
                  { marginTop: 3, fontSize: 30, fontWeight: "bold" },
                  darkMode
                    ? {
                        color: "#fff",
                      }
                    : { color: "#000" },
                ]}
              >
                -{" "}
                {new Intl.NumberFormat("de-US", {
                  style: "currency",
                  currency: "USD",
                }).format(transaction.amount)}
              </Text>
            </View>

            <View>
              <Text style={{ color: "grey", fontSize: 14 }}>DATE / TIME</Text>
              <Text style={{ fontSize: 14, color: "grey", marginTop: 6 }}>
                {new Date(transaction.date).toLocaleDateString("en", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  marginTop: 3,
                  width: "50%",
                }}
              >
                {new Date(transaction.date).toLocaleTimeString("sk", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                width: "45%",
                marginRight: 10,
                alignItems: "center",
              }}
            >
              {transaction.category === "food" ? (
                <Coffee />
              ) : transaction.category === "clothing" ? (
                <Phone />
              ) : transaction.category === "kids" ? (
                <EntertaimentSmile />
              ) : (
                <OtherIcon />
              )}
              <View style={{ marginLeft: 10 }}>
                <Text>Category</Text>
                <Text style={{ fontWeight: "bold" }}>
                  {transaction.category}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                width: "45%",
                backgroundColor: "lightgray",
                alignItems: "center",
              }}
            >
              {transaction.category === "food" ? (
                <Coffee />
              ) : transaction.category === "clothing" ? (
                <Phone />
              ) : transaction.category === "kids" ? (
                <EntertaimentSmile />
              ) : (
                <OtherIcon />
              )}
              <View style={{ marginLeft: 10 }}>
                <Text>Payment type</Text>
                <Text style={{ fontWeight: "bold" }}>{transaction.type}</Text>
              </View>
            </View>
          </View>
        </View>

        {!latitude || !longitude ? (
          <View style={[darkMode ? "#fff" : "#000", styles.center]}>
            <Text style={[darkMode ? { color: "#fff" } : { color: "black" }]}>
              No location data for this transaction.
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={[
                darkMode ? { color: "#fff" } : { color: "black" },
                styles.header,
              ]}
            >
              Transaction Location
            </Text>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude, longitude }}
                title={`${transaction.category.toUpperCase()}, ${
                  transaction?.amount
                } $`}
                description={transaction?.type || "No description"}
              />
            </MapView>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  header: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    marginTop: "5%",
    height: "60%",
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    textDecorationLine: "underline",
    marginTop: 2,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  titleStyleDark: {
    textDecorationLine: "underline",
    marginTop: 2,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
  },
});
