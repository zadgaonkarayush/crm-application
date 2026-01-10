import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import CustomerDetails from "../screens/CustomerDetails";
import AddCustomerScreen from "../screens/AddCustomerScreen";
import CustomerEditScreen from "../screens/CustomerEditScreen";
import AddProductScreen from "../screens/AddProductScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import CreateOrderScreen from "../screens/CreateOrderScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppStackNavigator(){
return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tabs" component={AppNavigator} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="AddCustomerScreen" component={AddCustomerScreen} />
        <Stack.Screen name="CustomerEditScreen" component={CustomerEditScreen} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
        <Stack.Screen name="ProductEditScreen" component={ProductEditScreen} />
        <Stack.Screen name="CreateOrderScreen" component={CreateOrderScreen} />
                <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />

    </Stack.Navigator>
)
}