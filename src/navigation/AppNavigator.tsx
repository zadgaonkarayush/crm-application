import React from "react";
import InventoryScreen from "../screens/InventoryScreen";
import OrdersScreen from "../screens/OrderScreen";
import CustomersScreen from "../screens/CustomerScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SettingScreen from "../screens/Setting";
import { TabsParamList } from "./types";

const Tab = createBottomTabNavigator<TabsParamList>();
export default function AppNavigator() {        
    return (
        <Tab.Navigator
         screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle:{
        //  position: 'absolute',
        bottom:3,
         left:30,
         right:30,
         height:60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "grid-outline";
          } else if (route.name === "Inventory") {
            iconName = "cube-outline";
          } else if (route.name === "Orders") {
            iconName = "cart-outline";
          } else if (route.name === "Customers") {
            iconName = "people-outline";
          }else if (route.name === "Settings") {
            iconName = "settings-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#377DFF",
        tabBarInactiveTintColor: "gray",
      })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Inventory" component={InventoryScreen} /> 
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Customers" component={CustomersScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
}   
