import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import customerStyles from "../styles/customersStyle";
import authStyles from "../styles/authStyles";
import inventoryStyle from "../styles/inventoryStyles";
import dashboardStyles from "../styles/DashboardStyle";
import orderStyles from "../styles/orderStyles";
import detailStyle from "../styles/detailsStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function CustomerDetails() {
  const navigation = useNavigation<NavigationProp>()
  const { id } = useRoute().params;
  const customer = useSelector((state:RootState)=>state.customer.customers.find((c)=>c.id === id))
 const tabs = ["Overview", "Orders", "Notes"];
  const activeTab = "Orders";

  const orders = [
    {
      id: "#7452",
      date: "Oct 26, 2023",
      amount: "$1,250.00",
      status: "Shipped",
      color: "#C7F4D6",
      textColor: "#0B8A43",
    },
    {
      id: "#7398",
      date: "Oct 21, 2023",
      amount: "$875.50",
      status: "Pending",
      color: "#FFE9B3",
      textColor: "#B47A00",
    },
    {
      id: "#7312",
      date: "Oct 15, 2023",
      amount: "$2,500.00",
      status: "Canceled",
      color: "#FFD4D4",
      textColor: "#D40000",
    },
  ];

  return (
    <SafeAreaView style={authStyles.safe}>
    <View style={detailStyle.header}>
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        >
            <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={detailStyle.title}>Customer Details</Text>
        <View></View>
    </View>
    <View style={detailStyle.profileCard}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <View style={detailStyle.nameBox}>
            <Text style={detailStyle.name}>{customer?.name}</Text>
            <Text style={detailStyle.subName}>{customer?.company}</Text>
        </View>
        <TouchableOpacity style={detailStyle.edit}
         onPress={()=>navigation.navigate("CustomerEditScreen",{id:customer?.id})}
        >
          <Ionicons name="create-sharp" size={22} />
        </TouchableOpacity>
       </View>
        <View style={detailStyle.contactBox}>
            <Ionicons name="call" color='blue' size={18} />
            <Text style={detailStyle.contactText}>{customer?.phone}</Text>
        </View>
         <View style={detailStyle.contactBox}>
            <Ionicons name="mail" color='blue' size={18} />
             <Text style={detailStyle.contactText}>{customer?.email}</Text>
        </View>
    </View>
   <View style={detailStyle.tabRow}>
      {tabs.map((t)=>(
        <TouchableOpacity key={t} style={detailStyle.tabBox}>
          <Text
          style={[
            detailStyle.tabText,
            activeTab === t && detailStyle.activeTebText
          ]}
          >
            {t}
          </Text>
          {activeTab===t && <View  style={detailStyle.tabUnderline}/>}
        </TouchableOpacity>
      ))}
   </View>

   <ScrollView contentContainerStyle={{paddingBottom:40}}>
{orders.map((o,i)=>(
    <View key={i} style={detailStyle.orderCard}>
      <View style={detailStyle.orderLeft}>
              <View style={detailStyle.orderIconWrapper}>
                <Ionicons name="receipt-outline" size={26} color="#1E5EF3" />
              </View>

              <View>
                <Text style={detailStyle.orderId}>Order {o.id}</Text>
                <Text style={detailStyle.orderDate}>{o.date}</Text>
              </View>
            </View>

            <View style={detailStyle.orderRight}>
              <Text style={detailStyle.amount}>{o.amount}</Text>
              <View
                style={[
                  detailStyle.badge,
                  { backgroundColor: o.color },
                ]}
              >
                <Text style={{ color: o.textColor, fontWeight: "600" }}>
                  {o.status}
                </Text>
              </View>
            </View>
    </View>
))}
   </ScrollView>
    </SafeAreaView>
  );
}
