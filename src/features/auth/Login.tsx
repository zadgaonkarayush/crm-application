// import React, { useState } from "react";
// import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import authStyles from "../../styles/authStyles";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { loginUser } from "./authSlice";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>
// export default function LoginScreen(){
//     const navigation = useNavigation<NavigationProp>()

//     const dispatch = useDispatch<any>();
//     const {loading,error} = useSelector((state:RootState)=>state.auth)
//     const [email,setEmail] = useState("");
//     const[password,setPassword] = useState("");

//     const handleLogin=async()=>{
//     try{
//        const resultAction = await dispatch(loginUser({email,password}));
//        if(loginUser.fulfilled.match(resultAction)){
//          await AsyncStorage.setItem("token",resultAction.payload.token)
//                console.log("Token saved:", resultAction.payload.token);

//       navigation.navigate("Dashboard");
//        }else {
//       // Login failed
//       console.log("Login failed:", resultAction.payload);
//     }
//     }catch(error){
//        console.log("Login error:", error);
//     }
//     }

//     return(
//       <SafeAreaView style={authStyles.safe}>
//         <KeyboardAvoidingView
//          style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//         >
//             <ScrollView contentContainerStyle={authStyles.scroll}
//              keyboardShouldPersistTaps="handled"
//             >
//                 <View style={authStyles.container}>
//                     <View style={authStyles.logoBox}>
//                         <Image 
//                         source={require('../../../assets/logo2.jpg')}
//                         resizeMode="contain"
//                         style={authStyles.logo}
//                          />
//                     </View>
//                     <Text style={authStyles.title}>Sign In</Text>
//                     <Text style={authStyles.labe}>Email</Text>
//                     <View style={authStyles.inputBox}>
//                         <TextInput 
//                         placeholder="Enter your email"
//                         onChangeText={setEmail}
//                         />
//                     </View>
//                     <Text style={authStyles.labe}>Password</Text>
//                     <View style={authStyles.inputBox}>
//                         <TextInput 
//                         placeholder="Enter your password"
//                         placeholderTextColor="#999"
//                         style={authStyles.input}
//                         onChangeText={setPassword}
//                         />
//                     </View>
//                     {loading && <Text>Loading...</Text>}
//                     {error && <Text style={{ color: "red" }}>{error}</Text>}
//                     {/* <TouchableOpacity style={authStyles.forgotButton}>
//                         <Text style={authStyles.forgotText}>Forgot Password</Text>
//                     </TouchableOpacity> */}
//                     <TouchableOpacity style={authStyles.primaryBtn} onPress={handleLogin}>
//                         <Text style={authStyles.primaryBtnText}>Login</Text>
//                     </TouchableOpacity>

//                     {/* footer */}
                   
                      
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     )
// }
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import authStyles from "../../styles/authStyles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loginUser } from "./authSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
     console.log("login started");
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        await AsyncStorage.setItem("token", resultAction.payload.token);
        console.log("Token saved:", resultAction.payload.token);
        navigation.navigate("Tabs");
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <SafeAreaView style={authStyles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
           contentContainerStyle={authStyles.scroll}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.card}>
            {/* Logo */}
            <View style={authStyles.logoBox}>
              <Image
                source={require("../../../assets/logo2.jpg")}
                resizeMode="contain"
                style={authStyles.logo}
              />
            </View>

            <Text style={authStyles.title}>Welcome Back 👋</Text>
            <Text style={authStyles.subtitle}>
              Sign in to continue
            </Text>

            {/* Email */}
            <Text style={authStyles.label}>Email</Text>
            <View style={authStyles.inputBox}>
              <Ionicons name="mail-outline" size={20} color="#999" />
              <TextInput
                placeholder="Enter your email"
                style={authStyles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <Text style={authStyles.label}>Password</Text>
            <View style={authStyles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color="#999" />
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                style={authStyles.input}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {error && <Text style={authStyles.errorText}>{error}</Text>}

            {/* Button */}
            <TouchableOpacity
              style={[
                authStyles.primaryBtn,
                loading && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={authStyles.primaryBtnText}>
                {loading ? "Signing in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
