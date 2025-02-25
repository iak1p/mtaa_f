import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";

const AuthScreen = ({ title, description, link }) => {
  return (
    <SafeAreaView>
      <Link to="/">
        <Text style={styles.link}>back</Text>
      </Link>
      <Text style={styles.heade_text}>{title}</Text>
      {}
      <Input placeholder="Email" />
      <Link to={link}>
        <Text style={styles.link}>{description}</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heade_text: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 180,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default AuthScreen;
