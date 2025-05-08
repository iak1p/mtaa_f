import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  useColorScheme,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
import ShoppingCart from "../components/svg/ShoppingCart";
import EntertaimentSmile from "../components/svg/EntertaimentSmile";
import OtherIcon from "../components/svg/OtherIcon";
import Coffee from "../components/svg/Coffee";
import useUserStore from "../store/store";
import { useEffect } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import Phone from "../components/svg/Phone";
import Info from "../components/svg/Info";
import TransactionTablet from "../components/TransactionTablet";

const MainPageTablet = ({ navigation }) => {
  const [moneyRemain, setMoneyRemain] = useState(0);
  const insets = useSafeAreaInsets();
  const [incomeMoney, setIncomeMoney] = useState(1500);
  const [expenseMoney, setExponseMoney] = useState(0);
  const [percentExpenses, setPercentExpenses] = useState(15);
  const { token, img } = useUserStore();

  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [grafLoading, setGrafLoading] = useState(true);
  const [transactions, setTransactions] = useState();
  const screenWidth = Dimensions.get("window").width;
  const [data, setData] = useState({});
  const [dataChart, setDataChart] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchTransactions = () => {
    setLoading(true);
    setGrafLoading(true);

    fetch(`http://${process.env.EXPO_PUBLIC_ADDRESS}/users/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then(({ transaction }) => {
        const expensesByMonth = {};
        const chartData = {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        };

        const monthTransaction = {};

        transaction.forEach((item) => {
          const dateNow = new Date().toISOString().slice(0, 7);
          const month = new Date(item.date).toISOString().slice(0, 7);

          if (dateNow == month) {
            if (!monthTransaction[item.category]) {
              monthTransaction[item.category] = 0;
            }

            monthTransaction[item.category] += item.amount;
          }

          if (!expensesByMonth[month]) {
            expensesByMonth[month] = 0;
          }
          expensesByMonth[month] += item.amount;
        });

        console.log(monthTransaction);

        const dateNow = new Date().toISOString().slice(0, 7);

        const previousMonthDate = new Date();
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

        const previousMonth = previousMonthDate.toISOString().slice(0, 7);

        setPercentExpenses(
          ((expensesByMonth[dateNow] - expensesByMonth[previousMonth]) /
            expensesByMonth[previousMonth]) *
            100
        );
        setMoneyRemain(expensesByMonth[dateNow]);

        Object.keys(expensesByMonth)
          .sort()
          .forEach((monthKey) => {
            const label = new Date(monthKey).toLocaleDateString("en", {
              month: "long",
            });
            chartData.labels.push(label);
            chartData.datasets[0].data.push(expensesByMonth[monthKey]);
          });

        const monthtData = {
          labels: Object.keys(monthTransaction),
          datasets: [{ data: Object.values(monthTransaction) }],
        };

        setDataChart(monthtData);
        setData(chartData);
        setTransactions(transaction);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setGrafLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{
          backgroundColor: "#13293D",
        }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserPage")}
          >
            <Image source={{ uri: img }} style={styles.image} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.title}>Spend this month</Text>
          <Text style={styles.subTitle}>
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(moneyRemain)}
          </Text>
          <Text style={styles.subTitle2}>
            You spend {percentExpenses.toFixed(2)}%{" "}
            {percentExpenses < 0 ? "less" : "more"} than previous month
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
      >
        {grafLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <View
            style={[
              { marginTop: 10 },
              darkMode ? { backgroundColor: "#1C1C1C" } : null,
            ]}
          >
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
            >
              <LineChart
                data={data}
                width={screenWidth}
                height={400}
                chartConfig={{
                  backgroundGradientFrom: darkMode ? "#1C1C1C" : "#ffffff",
                  backgroundGradientFromOpacity: darkMode
                    ? "#1C1C1C"
                    : "#ffffff",
                  backgroundGradientTo: darkMode ? "#1C1C1C" : "#ffffff",
                  color: (opacity = 1) => `rgba(161, 134, 158, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 1,
                  propsForLabels: {
                    fontSize: 20, // 🔥 Увеличь это значение как нужно
                    fill: darkMode ? "#fff" : "#000", // Цвет текста
                  },
                }}
                yAxisSuffix="$"
                yAxisInterval={1}
                // formatYLabel={(value) => parseInt(value)}
                segments={4}
                yLabelsOffset={3}
                fromZero={true}
                withInnerLines={true}
                withOuterLines={true}
                bezier
              />
              <BarChart
                // style={graphStyle}
                data={dataChart}
                width={screenWidth}
                height={400}
                fromZero={true}
                yLabelsOffset={3}
                // formatYLabel={(value) => parseInt(value)}
                yAxisSuffix="$"
                chartConfig={{
                  backgroundGradientFrom: darkMode ? "#1C1C1C" : "#ffffff",
                  backgroundGradientFromOpacity: darkMode
                    ? "#1C1C1C"
                    : "#ffffff",
                  backgroundGradientTo: darkMode ? "#1C1C1C" : "#ffffff",
                  color: (opacity = 1) => `rgba(161, 134, 158, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 1,
                  propsForLabels: {
                    fontSize: 20, // 🔥 Увеличь это значение как нужно
                    fill: darkMode ? "#fff" : "#000", // Цвет текста
                  },
                }}
                // verticalLabelRotation={30}
              />
            </ScrollView>
          </View>
        )}

        <View style={styles.container}>
          <Text
            style={[
              styles.classTitle,
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            Transactions
          </Text>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <FlatList
              data={transactions}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <TransactionTablet item={item} />;
              }}
              onEndReachedThreshold={1}
              refreshing={loading}
              // onRefresh={() => {
              //   fetchPoolys();
              //   Haptics.notificationAsync(
              //     Haptics.NotificationFeedbackType.Succes
              //   );
              // }}
              style={{ paddingTop: 10 }}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MainPageTablet;

const styles = StyleSheet.create({
  // div: {
  //   flex: 1,
  //   // display: "flex",
  //   // justifyContent: "space-between",
  //   // position: "relative",
  // },
  // text: {
  //   // paddingTop: 50,
  // },
  container: {
    flex: 1,
    width: "90%",
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  graphContainer: {
    flex: 0.5,
    width: "90%",
    marginBottom: 0,
    marginHorizontal: "auto",
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    paddingTop: 0,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "bold",
    paddingTop: 16,
    color: "white",
    fontFamily: "Montserat",
  },
  subTitle2: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    marginTop: -40,
    fontWeight: "bold",
    fontSize: 30,
  },
  btnStyle: {
    flexDirection: "row",
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 5,
    // width: 190,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    resizeMode: "cover",
    marginHorizontal: 20,
  },
  transactionRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
