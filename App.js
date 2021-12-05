import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import Signup from "./Components/Authentication/Signup";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Components/Navigation/index";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
