import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import Header from "../components/Header";

const BudgetPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Savings</Text>
      <Text style={styles.subTitle}>1 000 $</Text>
    </SafeAreaView>
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    marginTop: -StatusBar.currentHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 40,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 16,
  },
});
