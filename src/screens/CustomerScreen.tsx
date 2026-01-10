// import { Ionicons } from "@expo/vector-icons";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import customerStyles from "../styles/customersStyle";
// import authStyles from "../styles/authStyles";
// import inventoryStyle from "../styles/inventoryStyles";
// import dashboardStyles from "../styles/DashboardStyle";
// import orderStyles from "../styles/orderStyles";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store/store";
// import { useEffect, useState } from "react";
// import { fetchCustomers } from "../features/customer/customerSlice";
// import { useNavigation } from "@react-navigation/native";

// export default function CustomerScreen() {
//   const navigation = useNavigation();
//   const dispatch:AppDispatch =useDispatch();
//   const [activeTab,setActiveTab] = useState('All');

//   const customers = useSelector((state:RootState)=>state.customer.customers)

// useEffect(() => {
//   dispatch(fetchCustomers()).then((res) => {
//     console.log("Fetched customers:", res.payload);
//   });
// }, []);


//    const filteredCustomer = activeTab === 'All' ?
//    customers :
//    customers.filter((item)=>item.status.toLowerCase() === activeTab.toLowerCase());   

//   return (
//     <SafeAreaView style={authStyles.safe}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={orderStyles.container}
//       >
//         {/* Header */}
//         <Text style={inventoryStyle.title}>Customers</Text>

//         {/* Search Bar */}
//         <View style={inventoryStyle.searchBox}>
//           <Ionicons name="search" size={20} color="#9CA3AF" />
//           <TextInput
//             placeholder="Search customers..."
//             placeholderTextColor="#9CA3AF"
//             style={inventoryStyle.input}
//           />
//         </View>

//         {/* Filter Tabs */}
//      <ScrollView
//      horizontal
//      showsHorizontalScrollIndicator={false}
//         style={{ marginVertical: 10 }}
//      >
//          <View style={customerStyles.filterRow}>
//           {["All", "Lead", "Active", "Inactive"].map((item, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[
//                 customerStyles.filterBtn,
//                 activeTab === item && customerStyles.filterBtnActive,
//               ]}
//               onPress={()=>setActiveTab(item)}
//             >
//               <Text
//                 style={[
//                   customerStyles.filterText,
//                   activeTab === item && customerStyles.filterTextActive,
//                 ]}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//      </ScrollView>

//         {/* Customer List */}
//         {filteredCustomer.map((c, i) => (
//           <TouchableOpacity key={i} style={customerStyles.card} 
//           onPress={()=>navigation.navigate('CustomerDetails',{id:c.id})}
//           >
//             <Image source={{   uri: "https://cdn-icons-png.flaticon.com/512/921/921071.png" }} style={customerStyles.avatar} />

//             <View style={customerStyles.cardInfo}>
//               <Text style={customerStyles.name}>{c.name}</Text>
//               <Text style={customerStyles.company}>{c.company}</Text>
//               <Text style={customerStyles.details}>
//                 {c.email}, {c.phone}
//               </Text>
//             </View>

//             <Ionicons
//               name="chevron-forward"
//               size={22}
//               color="#9CA3AF"
//               style={{ marginLeft: "auto" }}
//             />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Floating Add Button */}
//       <TouchableOpacity style={orderStyles.floatingBtn}
//       onPress={()=>navigation.navigate('AddCustomerScreen')}
//       >
//         <Ionicons name="add" size={32} color="#fff" />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import customerStyles from "../styles/customersStyle";
import authStyles from "../styles/authStyles";
import inventoryStyle from "../styles/inventoryStyles";
import orderStyles from "../styles/orderStyles";

import { AppDispatch, RootState } from "../store/store";
import { fetchCustomers } from "../features/customer/customerSlice";

export default function CustomerScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const { customers, loading } = useSelector(
    (state: RootState) => state.customer
  );

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCustomers());
    setRefreshing(false);
  };
const filteredCustomers = customers
  .filter(Boolean) // removes undefined / null
  .filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <SafeAreaView style={authStyles.safe}>
      <ScrollView
        style={orderStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* HEADER */}
        <View style={{ marginBottom: 20 }}>
          <Text style={inventoryStyle.title}>Customers</Text>
          <Text style={{ color: "#64748B", marginTop: 4 }}>
            Manage your customer list
          </Text>
        </View>

        {/* SEARCH */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F8FAFC",
            paddingHorizontal: 14,
            height: 48,
            borderRadius: 14,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search customers"
            placeholderTextColor="#94A3B8"
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 15,
              color: "#0F172A",
            }}
          />
        </View>

        {/* LOADING */}
       {/* {loading && (
          <View
    style={{
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ActivityIndicator  size="large" color="#1E5EF3" />
    <Text style={{ marginTop: 10, color: "#64748B", fontSize: 14 }}>
      Loading customers...
    </Text>
  </View>
       )} */}
        {/* EMPTY STATE */}
        {!loading && filteredCustomers.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Ionicons
              name="people-outline"
              size={48}
              color="#CBD5E1"
            />
            <Text
              style={{
                marginTop: 12,
                fontSize: 15,
                color: "#64748B",
              }}
            >
              No customers found
            </Text>
          </View>
        )}

        {/* CUSTOMER LIST */}
        {filteredCustomers.map((c) => (
          
          <TouchableOpacity
            key={c.id}
            activeOpacity={0.75}
            style={customerStyles.card}
            onPress={() =>
              navigation.navigate("CustomerDetails", { id: c.id })
            }
          >
            <Image
              source={{
                uri:
                 
                  "https://cdn-icons-png.flaticon.com/512/921/921071.png",
              }}
              style={customerStyles.avatar}
            />

            <View style={customerStyles.cardInfo}>
              <Text style={customerStyles.name} numberOfLines={1}>
                {c.name}
              </Text>

              {c.company && (
                <Text
                  style={customerStyles.company}
                  numberOfLines={1}
                >
                  {c.company}
                </Text>
              )}

              <View style={{ marginTop: 4 }}>
                {c.email && (
                  <Text style={customerStyles.details} numberOfLines={1}>
                    {c.email}
                  </Text>
                )}
                {c.phone && (
                  <Text style={customerStyles.details}>
                    {c.phone}
                  </Text>
                )}
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ADD CUSTOMER BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={orderStyles.floatingBtn}
        onPress={() => navigation.navigate("AddCustomerScreen")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
