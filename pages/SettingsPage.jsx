import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { FlatList, Switch } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native-web";

const SettingsPage = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          // marginTop: -insets.top,
          backgroundColor: "#13293D",
          height: "14%",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.title}>Settings</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <Image source={require("../assets/123.jpg")} style={styles.image} />
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.btnStyle, styles.shadowBox]}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("#")}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingLeft: 8,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 20,
                }}
              >
                Change password
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{"❯"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.btnStyle, styles.shadowBox]}>
          <View style={styles.row}>
            <Text style={styles.text}>Dark mode</Text>
            <Switch
              value={isOn}
              onValueChange={() => setIsOn(!isOn)}
              trackColor={{ false: "white", true: "#292929" }}
              thumbColor={"black"}
            />
          </View>
        </View>
        <View style={[styles.btnStyle, styles.shadowBox]}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("#")}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingLeft: 8,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 20,
                }}
              >
                Change password
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{"❯"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.btnStyle, styles.shadowBox]}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("#")}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingLeft: 8,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 20,
                }}
              >
                Change password
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{"❯"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>

    // <SafeAreaView style={styles.container}>
    //   <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
    //     <Arrow stroke="#000" />
    //   </TouchableWithoutFeedback>
    //   <View style={{ alignItems: "center" }}>
    //     <BankaIcon />
    //     <Text style={{ textDecorationLine: "underline" }}>1</Text>
    //     <Text> $</Text>
    //     <TouchableWithoutFeedback
    //       onPress={() => navigation.navigate("NewTransaction", { budget_id })}
    //     >
    //       <Text>Add new</Text>
    //     </TouchableWithoutFeedback>
    //     <TouchableWithoutFeedback
    //       onPress={() => navigation.navigate("UserList", { budget_id })}
    //     >
    //       <Text>User list</Text>
    //     </TouchableWithoutFeedback>
    //     <TouchableWithoutFeedback onPress={() => dropPooly()}>
    //       <Text>Drop this Pooly</Text>
    //     </TouchableWithoutFeedback>
    //   </View>
    // </SafeAreaView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
    marginTop: "125",
  },
  title: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
  btnStyle: {
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingLeft: 8,
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  switch: {
    width: 50,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    padding: 2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
