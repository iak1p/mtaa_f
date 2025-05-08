import { color, Input } from "@rneui/base";
import React, { useEffect, useState } from "react";
import Arrow from "./svg/Arrow";
import { useColorScheme } from "react-native";

export default function BaseForm({ inputs }) {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  return (
    <>
      {inputs.map(
        (
          { lable, placeholder, state, error: { hasError, message }, type },
          index
        ) => {
          return (
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              key={index}
              placeholder={placeholder}
              containerStyle={{
                paddingLeft: 0,
                paddingBottom: 0,
                paddingRight: 0,
              }}
              keyboardType={type == "numeric" ? "numeric" : "default"}
              label={lable}
              inputContainerStyle={
                hasError
                  ? {
                      borderRadius: 10,
                      borderColor: "red",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderBottomWidth: 1,
                      paddingLeft: 10,
                    }
                  : {
                      borderRadius: 10,
                      borderColor: "#86939e",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderBottomWidth: 1,
                      paddingLeft: 10,
                    }
              }
              inputStyle={[
                {
                  fontSize: 14,
                  paddingTop: 15,
                  paddingBottom: 15,
                },
                darkMode ? { color: "#fff" } : { color: "#000" },
              ]}
              labelStyle={
                hasError
                  ? {
                      color: "red",
                      fontSize: 12,
                      paddingBottom: 5,
                    }
                  : {
                      color: darkMode ? "#fff" : "#000",
                      fontSize: 12,
                      paddingBottom: 5,
                    }
              }
              errorStyle={
                hasError
                  ? {
                      fontSize: 12,
                      marginTop: 5,
                      marginLeft: 0,
                      marginBottom: 5,
                    }
                  : {
                      fontSize: 12,
                      marginTop: 0,
                      marginBottom: 0,
                    }
              }
              onChangeText={state}
              rightIcon={hasError ? <Arrow stroke="#000" /> : undefined}
              errorMessage={hasError ? message : null}
            />
          );
        }
      )}
    </>
  );
}
