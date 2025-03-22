import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../components/Header";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Menu from "../components/Menu";
import Banka from "../components/Banka";
import Button from "../components/Button";
import List from "../components/svg/List";
import ButtonComponent from "../components/ButtonComponent";
import { Link } from "react-router-native";

const BudgetPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const sharedSavings = [
    { id: 0, name: "title", money: 1002, curentMoney: 230 },
    { id: 1, name: "title1", money: 943, curentMoney: 450 },
    { id: 2, name: "title2", money: 433, curentMoney: 400 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          marginTop: -insets.top,
          backgroundColor: "tomato",
        }}
      >
        <Text style={styles.title}>Shared savings</Text>
        <Text style={styles.subTitle}>2 954.45 $</Text>
      </SafeAreaView>
      <View style={{ top: -25 }}>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginHorizontal: 20,
            }}
          >
            <ButtonComponent
              title={"Creater new"}
              // func={() => navigation.navigate("SignIn")}
            />
            <ButtonComponent title={"Creater new"} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={styles.classTitle}>Joint Budgets</Text>
        <Text>Savings 2 954.45 $</Text>
        <FlatList
          data={sharedSavings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Banka item={item} />;
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 16,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 16,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  classSubtitle: {
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
