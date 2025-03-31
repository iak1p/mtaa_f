import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LOCAL_HOST, PORT } from "../env";
import useUserStore from "../store/store";

function PoolyChatPage({
  route: {
    params: { budget_id },
  },
}) {
  const { token } = useUserStore();
  const socket = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.current = new WebSocket(`ws://${LOCAL_HOST}:8080`);

    socket.current.onopen = () => {
      console.log("Connected to WebSocket");
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
    socket.current.send(
      JSON.stringify({
        action: "send_message",
        budget_id: budget_id,
        user_token: token,
        content: message,
      })
    );
  };

  return (
    <SafeAreaView>
      <Text>Chat</Text>
      <Text>{budget_id}</Text>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Text>{item.content}</Text>;
          }}
          style={{ paddingTop: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <TextInput onChangeText={setMessage} />
      <TouchableWithoutFeedback onPress={() => sendMessage()}>
        <Text>Send</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default PoolyChatPage;
