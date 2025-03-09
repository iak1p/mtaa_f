import { Input } from "@rneui/base";
import React from "react";

export default function BaseForm({ inputs }) {
  return (
    <>
      {inputs.map(
        (
          { lable, placeholder, state, error: { hasError, message } },
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
              inputStyle={{
                fontSize: 14,
                paddingTop: 15,
                paddingBottom: 15,
              }}
              labelStyle={
                hasError
                  ? {
                      color: "red",
                      fontSize: 12,
                      paddingBottom: 5,
                    }
                  : {
                      color: "black",
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
              rightIcon={
                hasError ? { type: "font-awesome", name: "xmark" } : undefined
              }
              errorMessage={hasError ? message : null}
            />
          );
        }
      )}
    </>
  );
}
