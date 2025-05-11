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
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import Plus from "../components/svg/Plus";
import Minus from "../components/svg/Minus";
import ShoppingCart from "../components/svg/ShoppingCart";
import EntertaimentSmile from "../components/svg/EntertaimentSmile";
import Coffee from "../components/svg/Coffee";
import useUserStore from "../store/store";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import Clothing from "../components/svg/ClothingIcon";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import Info from "../components/svg/Info";
import Travel from "../components/svg/TravelIcon";
import Education from "../components/svg/Education";
import OtherIcon from "../components/svg/OtherIcon";

const MainPage = ({ navigation }) => {
  const [moneyRemain, setMoneyRemain] = useState(0);
  // const insets = useSafeAreaInsets();
  const [incomeMoney, setIncomeMoney] = useState(1500);
  const [expenseMoney, setExponseMoney] = useState(0);
  const [percentExpenses, setPercentExpenses] = useState(15);
  const { token, img, fetchUserData } = useUserStore();

  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [grafLoading, setGrafLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const [data, setData] = useState({
    labels: ["January", "February", "March"],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  });
  const [dataChart, setDataChart] = useState({
    labels: ["January", "February", "March"],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  });
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

  useEffect(() => {
    setLoading(true);
    if (!token) return;
    fetchTransactions();
  }, [token]);

  // useEffect(() => {
  //   setLoading(true);
  //   if (!fetchUserData) return;
  //   fetchUserData();
  // }, [fetchUserData]);

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
          datasets: [{ data: [] }],
        };
        const monthTransaction = {};

        const now = new Date();
        const dateNowKey = now.toISOString().slice(0, 7);

        const previousMonthDate = new Date();
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
        const previousMonthKey = previousMonthDate.toISOString().slice(0, 7);

        transaction.forEach((item) => {
          const itemMonth = new Date(item.date).toISOString().slice(0, 7);

          if (itemMonth === dateNowKey) {
            if (!monthTransaction[item.category]) {
              monthTransaction[item.category] = 0;
            }
            monthTransaction[item.category] += item.amount;
          }

          if (!expensesByMonth[itemMonth]) {
            expensesByMonth[itemMonth] = 0;
          }
          expensesByMonth[itemMonth] += item.amount;
        });

        const currentMonthTotal = expensesByMonth[dateNowKey] || 0;
        const previousMonthTotal = expensesByMonth[previousMonthKey] || 0;

        console.log(expensesByMonth);

        const percentChange =
          previousMonthTotal === 0
            ? currentMonthTotal === 0
              ? 0
              : 100
            : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) *
              100;

        setPercentExpenses(percentChange);
        setMoneyRemain(currentMonthTotal);

        Object.keys(expensesByMonth)
          .sort()
          .forEach((monthKey) => {
            const label = new Date(monthKey).toLocaleDateString("en", {
              month: "long",
            });
            chartData.labels.push(label);
            chartData.datasets[0].data.push(expensesByMonth[monthKey]);
          });

        const monthData = {
          labels: Object.keys(monthTransaction),
          datasets: [{ data: Object.values(monthTransaction) }],
        };

        if (monthData.labels.length == 0) {
          setDataChart({
            labels: ["January", "February", "March"],
            datasets: [
              {
                data: [0, 0, 0],
              },
            ],
          });
        } else {
          setDataChart(monthData);
        }

        if (chartData.labels.length == 0) {
          setData({
            labels: ["January", "February", "March"],
            datasets: [
              {
                data: [0, 0, 0],
              },
            ],
          });
        } else {
          setData(chartData);
        }

        // setData(chartData);
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
            <View
              accessebity={true}
              accessibilityLabel="Go to user page"
              accessibilityRole="imagebutton"
            >
              <Image source={{ uri: img }} style={styles.image} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text accessibilityLabel="Spend this month" style={styles.title}>
            Spend this month
          </Text>
          <Text
            accessibilityLabel={`You have ${moneyRemain} dollars spent this month`}
            style={styles.subTitle}
          >
            {new Intl.NumberFormat("de-US", {
              style: "currency",
              currency: "USD",
            }).format(moneyRemain)}
          </Text>
          <Text
            accessibilityLabel={`You spend ${percentExpenses.toFixed(
              2
            )} percent ${
              percentExpenses < 0 ? "less" : "more"
            } than previous month`}
            style={styles.subTitle2}
          >
            You spend {percentExpenses.toFixed(2)}%{" "}
            {percentExpenses < 0 ? "less" : "more"} than previous month
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={[{ flex: 1 }, darkMode ? { backgroundColor: "#1C1C1C" } : null]}
      >
        {grafLoading ? (
          <ActivityIndicator size="small" style={{ height: 210 }} />
        ) : (
          <View
            accessible={true}
            accessibilityLabel="Line chart showing monthly spending trend"
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
                height={200}
                chartConfig={{
                  backgroundGradientFrom: darkMode ? "#1C1C1C" : "#ffffff",
                  backgroundGradientFromOpacity: darkMode
                    ? "#1C1C1C"
                    : "#ffffff",
                  backgroundGradientTo: darkMode ? "#1C1C1C" : "#ffffff",
                  color: (opacity = 1) => `rgba(161, 134, 158, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 1,
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
                height={200}
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
                }}
                accessible={true}
                accessibilityLabel="Bar chart showing categorized spending"
                // verticalLabelRotation={30}
              />
            </ScrollView>
          </View>
        )}

        <View style={styles.container}>
          <Text
            accessible={true}
            accessibilityLabel="List of recent transactions"
            style={[
              styles.classTitle,
              darkMode ? { color: "#fff" } : { color: "#000" },
            ]}
          >
            Transactions
          </Text>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : transactions.length != 0 ? (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <>
                    <View
                      accessible={true}
                      accessibilityLabel={`Transaction for ${
                        item.category || "no category"
                      }, amount ${item.amount} dollars, date ${new Date(
                        item.date
                      ).toLocaleDateString("sk-SK")}, from pool number ${
                        item.budget_id
                      }`}
                      accessibilityRole="summary"
                      style={styles.transactionRow}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.category === "food" ? (
                          <Coffee stroke={darkMode ? "#fff" : "#000"} />
                        ) : item.category === "clothing" ? (
                          <Clothing stroke={darkMode ? "#fff" : "#000"} />
                        ) : item.category === "kids" ? (
                          <EntertaimentSmile
                            stroke={darkMode ? "#fff" : "#000"}
                          />
                        ) : item.category === "travel" ? (
                          <Travel stroke={darkMode ? "#fff" : "#000"} />
                        ) : item.category === "education" ? (
                          <Education stroke={darkMode ? "#fff" : "#000"} />
                        ) : (
                          <OtherIcon stroke={darkMode ? "#fff" : "#000"} />
                        )}

                        <View style={{ paddingLeft: 10 }}>
                          <Text
                            style={[
                              { fontSize: 16, fontWeight: "bold" },
                              darkMode ? { color: "#fff" } : { color: "#000" },
                            ]}
                          >
                            {item.category
                              ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
                              : "No category"}
                          </Text>
                          <Text style={{ fontSize: 14, color: "grey" }}>
                            {new Date(item.date).toLocaleDateString("en", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Text>
                        </View>
                      </View>

                      <View style={{ alignItems: "flex-end" }}>
                        <Text
                          style={[
                            { fontSize: 16, fontWeight: "bold" },
                            darkMode ? { color: "#fff" } : { color: "#000" },
                          ]}
                        >
                          -
                          {new Intl.NumberFormat("de-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.amount)}
                        </Text>
                        <Text style={{ fontSize: 14, color: "grey" }}>
                          From {item.budget_id} Pooly
                        </Text>
                      </View>
                    </View>
                  </>
                );
              }}
              onEndReachedThreshold={1}
              refreshing={loading}
              onRefresh={() => {
                fetchTransactions();
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Succes
                );
              }}
              style={{ paddingTop: 10 }}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    fetchTransactions();
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                  }}
                  // tintColor={darkMode ? "#fff" : "#000"}
                />
              }
            >
              <Text
                style={[
                  { textAlign: "center", marginTop: 20 },
                  darkMode ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                No poolys yet
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default MainPage;

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
    fontSize: 16,
    paddingTop: 0,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    paddingTop: 16,
    color: "white",
    fontFamily: "Montserat",
  },
  subTitle2: {
    textAlign: "center",
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
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
