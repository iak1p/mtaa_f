import { Button } from "@rneui/base";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Sms from "../components/svg/Sms";
import Phone from "../components/svg/Phone";
import Email from "../components/svg/Email";
import Info from "../components/svg/Info";
import Arrow from "../components/svg/Arrow";
import { ScrollView } from "react-native";

const UserPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          marginTop: -insets.top,
          backgroundColor: "#13293D",
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow
            stroke="#FCF7F8"
            style={{ paddingLeft: "20%", marginTop: "15%" }}
          ></Arrow>
        </TouchableWithoutFeedback>
        <View style={styles.circleContainer}>
          <Image source={require("../assets/123.jpg")} style={styles.image} />
          <Button
            title={"Upload new photo"}
            type="clear"
            buttonStyle={{
              marginBottom: 4,
              alignSelf: "flex-start",
              textAlign: "center",
              paddingTop: 15,
            }}
            titleStyle={{
              fontSize: 14,
              color: "#FCF7F8",
              letterSpacing: 1.5,
            }}
          />
        </View>
      </SafeAreaView>
      <ScrollView vertical={true}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Sms />
            <View style={styles.textContainer2}>
              <Text style={styles.header}>Full name</Text>
              <Text style={styles.text}>Sava Neger</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Phone></Phone>
            <View style={styles.textContainer2}>
              <Text style={styles.header}>Phone number</Text>
              <Text style={styles.text}>333222111</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Email></Email>
            <View style={styles.textContainer2}>
              <Text style={styles.header}>Email</Text>
              <Text style={styles.text}>sava@gmail.com</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Info></Info>
            <View style={styles.textContainer3}>
              <Button
                title={"Personal data"}
                type="clear"
                titleStyle={{
                  fontSize: 22,
                  color: "black",
                  fontWeight: "bold",
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: "hidden",
    resizeMode: "cover",
    marginTop: 2,
  },
  circleContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 13,
    color: "grey",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "7%",
  },
  textContainer2: {
    paddingLeft: 20,
  },
  textContainer3: {
    paddingLeft: 15,
  },
});
