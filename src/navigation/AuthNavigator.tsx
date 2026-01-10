import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/Login";
import SignupScreen from "../features/auth/Signup";

const Stack = createNativeStackNavigator()
export default function Authavigator() {        
    return (
     <Stack.Navigator  screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name='Signup' component={SignupScreen} />
     </Stack.Navigator>
    );
}   
