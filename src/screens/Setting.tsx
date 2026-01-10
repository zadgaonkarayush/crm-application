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
import authStyles from "../styles/authStyles";

import detailStyle from "../styles/detailsStyles";
import settingStyle from "../styles/settingStyle";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>
export default function SettingScreen() {
 const dispatch = useDispatch();
 const navigation = useNavigation<NavigationProp>();
 const auth =useSelector((state:RootState)=>state.auth)
 const user = auth.user
 
useEffect(() => {
  console.log("Redux user:", JSON.stringify(user, null, 2));
}, [user]);
 const handleLogout =()=>{
   dispatch(logout());
  navigation.dispatch(
    CommonActions.reset({
       index: 0,
      routes: [{ name: "Login" }],
    })
  )
 }

  return (
    <SafeAreaView style={authStyles.safe}>
    <View style={detailStyle.header}>
       
        <Text style={detailStyle.title}>My Profile</Text>
        <View></View>
    </View>
     <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        
        {/* PROFILE IMAGE */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
          }}
          style={settingStyle.avatar}
        />
          
        {/* NAME + ROLE */}
        <Text style={settingStyle.name}>{user?.name}</Text>
        <Text style={settingStyle.role}>{user?.role}</Text>

        {/* CONTACT CARD */}
        <View style={settingStyle.contactCard}>
          {/* EMAIL */}
           <View style={settingStyle.row}>
            <Ionicons name="people" size={22} color="#4A4A4A" />
            <Text style={settingStyle.rowText}>{user?.name}</Text>
          </View>
        

          {/* DIVIDER */}
          <View style={settingStyle.divider} />

            <View style={settingStyle.row}>
            <Ionicons name="mail-outline" size={22} color="#4A4A4A" />
            <Text style={settingStyle.rowText}>{user?.email}</Text>
          </View>
         
        </View>

        {/* BUTTONS */}
       

        {/* LOGOUT */}
        <TouchableOpacity style={settingStyle.logoutBtn} onPress={handleLogout}>
          <Text style={settingStyle.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
   
    </SafeAreaView>
  );
}
