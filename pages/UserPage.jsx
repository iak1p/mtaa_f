import { Button } from "@rneui/base";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Sms from "../components/svg/Sms";
import Phone from "../components/svg/Phone";
import Email from "../components/svg/Email";
import Info from "../components/svg/Info";
import Arrow from "../components/svg/Arrow";
const UserPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          marginTop: -insets.top,
          backgroundColor: "tomato",
        }}
      >
        <Arrow style={{ paddingLeft: "20%", marginTop: "20%" }}></Arrow>
        <View style={styles.circleContainer}>
          <Image source={require("../assets/123.jpg")} style={styles.image} />
          <Button
            title={"Upload new photo"}
            radius={10}
            type="clear"
            color={"#ffffff"}
            buttonStyle={{
              marginBottom: 5,
              alignSelf: "flex-start",
              textAlign: "center",
              paddingTop: 25,
            }}
            titleStyle={{
              fontSize: 20,
              color: "black",
              letterSpacing: 1.5,
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Sms />
          <View style={styles.textContainer2}>
            <Text style={styles.header}>Full name</Text>
            <Text style={styles.text}>huy</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Phone></Phone>
          <View style={styles.textContainer2}>
            <Text style={styles.header}>Phone number</Text>
            <Text style={styles.text}>huy</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Email></Email>
          <View style={styles.textContainer2}>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.text}>huy@gmail.com</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Info></Info>
          <View style={styles.textContainer2}>
            <Button
              title={"Personal data"}
              type="clear"
              titleStyle={{
                fontSize: 26,
                color: "black",
                fontWeight: "bold",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  sex: {
    color: "tomato",
  },
  container: {
    flex: 1,
    width: "85%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    resizeMode: "cover",
    marginTop: 5,
  },
  circleContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 14,
    color: "grey",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "12%",
  },
  textContainer2: {
    paddingLeft: 16,
  },
});
