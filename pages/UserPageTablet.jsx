import { Button } from "@rneui/base";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import Sms from "../components/svg/Sms";
import Info from "../components/svg/Info";
import Arrow from "../components/svg/Arrow";
import { ScrollView } from "react-native";
import useUserStore from "../store/store";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import Email from "../components/svg/Email";

const UserPageTablet = ({ navigation }) => {
  const { token, img, setImg, username, resetUser, email } = useUserStore();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  const pickImage = async () => {
    setLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Разрешите доступ к фото!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadFile(result.assets[0].uri);
    } else {
      setLoading(false);
    }
  };

  const compressImage = async (uri) => {
    try {
      console.log("Original URI: ", uri);
      const manipResult = await manipulateAsync(
        uri,
        [{ resize: { width: 100, height: 100 } }],
        {
          compress: 0.9,
          format: SaveFormat.JPEG,
        }
      );

      console.log("Compressed URI: ", manipResult.uri);
      return manipResult.uri;
    } catch (error) {
      console.error("Error compressing image: ", error);
    }
  };

  const uploadFile = async (uri) => {
    try {
      uri = await compressImage(uri);
      console.log("new " + uri);

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      const res = await fetch(
        `http://${process.env.EXPO_PUBLIC_ADDRESS}/users/change/image`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      setImg(data.url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#13293D",
        }}
      >
        <TouchableWithoutFeedback
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        >
          <Arrow
            stroke="#FCF7F8"
            style={{ paddingLeft: "15%", marginTop: 10 }}
          ></Arrow>
        </TouchableWithoutFeedback>

        <View style={styles.circleContainer}>
          {loading ? (
            <ActivityIndicator size="small" style={styles.image} />
          ) : (
            <View
              accessebility={true}
              accessibilityLabel="Your profile photo"
              accessibilityRole="image"
            >
              <Image source={{ uri: img }} style={styles.image} />
            </View>
          )}
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
              fontSize: 16,
              color: "#FCF7F8",
              letterSpacing: 1.5,
            }}
            accessibilityLabel="Upload a new profile photo"
            accessibilityRole="button"
            onPress={() => pickImage()}
          />
        </View>
      </SafeAreaView>

      <ScrollView vertical={true}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Sms stroke={darkMode ? "#fff" : "#000"} width={50} height={50} />

            <View
              accessible={true}
              accessibilityLabel={`Your username is ${username}`}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.header}>Username</Text>
              <Text
                style={[
                  styles.text,
                  darkMode ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                {username}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Email stroke={darkMode ? "#fff" : "#000"} width={50} height={50} />

            <View
              accessible={true}
              accessibilityLabel={`Your email is ${email}`}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.header}>Email</Text>
              <Text
                style={[
                  styles.text,
                  darkMode ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                resetUser();

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Welcome" }],
                });
              }}
            >
              <View
                style={[
                  { borderRadius: 5 },
                  darkMode
                    ? { backgroundColor: "#912F40" }
                    : { backgroundColor: "#13293D" },
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    color: "#fff",
                  }}
                >
                  Log Out
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserPageTablet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
    marginTop: 2,
    marginTop: 24,
  },
  circleContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    color: "grey",
  },
  text: {
    fontSize: 44,
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
