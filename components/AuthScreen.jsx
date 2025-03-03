import { Input } from "@rneui/themed";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import Arrow from "./svg/Arrow";
import { Button } from "@rneui/base";

const AuthScreen = ({ title, subtitle, description, link, inputs, func }) => {
  return (
    <SafeAreaView
      style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
    >
      <View>
        <Link to="/" style={{ paddingTop: 10 }}>
          <Arrow />
        </Link>
        <Text style={styles.header_text}>{title}</Text>
        <Text style={styles.header2_text}>{subtitle}</Text>

        <View style={{ paddingTop: 50 }}>
          {inputs.map(({ lable, placeholder, state }, index) => {
            return (
              <>
                <Input
                  key={index}
                  placeholder={placeholder}
                  containerStyle={{
                    paddingLeft: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                  }}
                  label={lable}
                  inputContainerStyle={{
                    borderRadius: 10,
                    borderColor: "#86939e",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                  }}
                  inputStyle={{
                    fontSize: 14,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                  labelStyle={{
                    color: "black",
                    fontSize: 12,
                    paddingBottom: 5,
                  }}
                  errorStyle={{
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 12,
                    marginBottom: 0,
                  }}
                  onChange={state}
                />
              </>
            );
          })}
        </View>
      </View>

      <View>
        <Link to={link}>
          <Text style={styles.link}>{description}</Text>
        </Link>

        <Button
          title={"Login"}
          radius={10}
          color={"#012E4A"}
          buttonStyle={{
            padding: 15,
            marginBottom: 15,
            borderColor: "#012E4A",
            borderStyle: "solid",
            borderWidth: 1,
          }}
          titleStyle={{ fontSize: 14 }}
          onPress={() => func()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 70,
  },
  header2_text: {
    fontSize: 25,
    color: "gray",
    paddingTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 0,
    textAlign: "center",
    paddingBottom: 5,
  },
});

export default AuthScreen;
