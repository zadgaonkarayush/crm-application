import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { RootState } from "../store/store";
import AppStackNavigator from "./AppStackNavigator";


export default function RootNavigator() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <AppStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
