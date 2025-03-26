import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Arrow from "../components/svg/Arrow";
import { useNavigation } from "@react-navigation/native";
import BankaIcon from "../components/svg/BankaIcon";

const PoolyInfoPage = ({
  route: {
    params: { name, max_money, current_money },
  },
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Arrow />
      </TouchableWithoutFeedback>
      <View style={{ alignItems: "center" }}>
        <BankaIcon />
        <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
        <Text>{new Intl.NumberFormat("en-US").format(current_money)}$</Text>
      </View>
    </SafeAreaView>
  );
};

export default PoolyInfoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
});
