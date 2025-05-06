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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Sms from "../components/svg/Sms";
import Phone from "../components/svg/Phone";
import Email from "../components/svg/Email";
import Info from "../components/svg/Info";
import Arrow from "../components/svg/Arrow";
import { ScrollView } from "react-native";
import useUserStore from "../store/store";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  ImageManipulator,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";
// import * as ImageManipulator from "expo-image-manipulator";

const UserPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { token, img, setImg, username } = useUserStore();
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

  // const uploadFile = async (uri) => {
  //   try {
  //     uri = await compressImage(uri);
  //     console.log("new " + uri);

  //     const formData = new FormData();
  //     formData.append("file", {
  //       uri,
  //       name: `${Date.now()}.jpg`,
  //       type: "image/jpeg",
  //     });

  //     const fileName = `${Date.now()}.jpg`;

  //     const { data, error } = await supabase.storage
  //       .from("img")
  //       .upload(fileName, formData);

  //     const { data: urlData } = supabase.storage
  //       .from("img")
  //       .getPublicUrl(fileName);

  //     setImg(urlData.publicUrl);

  //     const res = await fetch(
  //       `http://${LOCAL_HOST}:${PORT}/users/change/image`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //         body: JSON.stringify({
  //           url: urlData.publicUrl,
  //         }),
  //       }
  //     );

  //     const res_data = await res.json();

  //     if (!res.ok) {
  //       return;
  //     }
  //   } catch (err) {
  //     console.error("Ошибка загрузки:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          // marginTop: -insets.top,
          backgroundColor: "#13293D",
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow
            stroke="#FCF7F8"
            style={{ paddingLeft: "15%" }}
          ></Arrow>
        </TouchableWithoutFeedback>

        <View style={styles.circleContainer}>
          {loading ? (
            <ActivityIndicator size="small" style={styles.image} />
          ) : (
            <Image source={{ uri: img }} style={styles.image} />
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
              fontSize: 14,
              color: "#FCF7F8",
              letterSpacing: 1.5,
            }}
            onPress={() => pickImage()}
          />
        </View>
      </SafeAreaView>

      <ScrollView vertical={true}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Sms />
            <View style={styles.textContainer2}>
              <Text style={styles.header}>Username</Text>
              <Text style={styles.text}>{username}</Text>
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
    marginTop: 24,
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
