import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";
import Arrow from "../components/svg/Arrow";
import { useNavigation } from "@react-navigation/native";
import SendIcon from "../components/svg/SendIcon";

function PoolyChatPage({
  route: {
    params: { budget_id },
  },
}) {
  const { token, id, img } = useUserStore();
  const socket = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(`ws://${LOCAL_HOST}:8080`);

    socket.current.onopen = () => {
      console.log("Connected to WebSocket");

      socket.current.send(JSON.stringify({ action: "join_chat", budget_id }));
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("Новое сообщение:", data);
    };

    socket.current.onclose = (event) => {
      console.log("Disconnected to WebSocket");
    };

    setLoading(true);
    fetch(`http://${LOCAL_HOST}:${PORT}/chats/${budget_id}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const sendMessage = () => {
    if (message.length > 0) {
      socket.current.send(
        JSON.stringify({
          action: "send_message",
          budget_id: budget_id,
          user_token: token,
          content: message,
        })
      );
      setMessage("");
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow stroke={"#000"} />
        </TouchableWithoutFeedback>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: item.user_id === id ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                  }}
                >
                  {item.user_id !== id ? (
                    <Image source={{ uri: img }} style={styles.image} />
                  ) : null}
                  <View
                    style={{
                      alignSelf:
                        item.user_id === id ? "flex-end" : "flex-start",
                      backgroundColor: item.user_id === id ? "#13293D" : "grey",
                      maxWidth: "75%",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>{item.content}</Text>
                  </View>
                </View>
              );
            }}
            style={{
              paddingTop: 10,
              flexDirection: "column",
              marginBottom: 10,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        )}

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "grey",
            padding: 5,
            borderRadius: 30,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={{ flex: 1, paddingLeft: 10 }}
            placeholder="Message..."
          />
          <TouchableWithoutFeedback onPress={() => sendMessage()}>
            <View style={styles.iconStyle}>
              <SendIcon stroke={"white"} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default PoolyChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  iconStyle: {
    width: 40,
    height: 40,
    backgroundColor: "#13293D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: "100%",
    overflow: "hidden",
    resizeMode: "cover",
    marginRight: 10,
  },
});
