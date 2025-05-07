import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TouchableWithoutFeedback } from "react-native";
import Arrow from "./svg/Arrow";
import { useNavigation } from "@react-navigation/native";

export default function Map({ route }) {
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

  const transaction = route.params?.transaction;
  const latitude = transaction.latitude;
  const longitude = transaction.longitude;

  if (!transaction || !latitude || !longitude) {
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
          <View style={[darkMode ? "#fff" : "#000", styles.center]}>
            <Text style={[darkMode ? { color: "#fff" } : { color: "black" }]}>
              No location data for this transaction.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
    marginTop: "10%",
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    marginTop: "5%",
    height: "80%",
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
