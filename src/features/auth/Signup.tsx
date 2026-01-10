import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import authStyles from "../../styles/authStyles";
import { useDispatch } from "react-redux";
import { signupUser } from "./authSlice";
export default function SignupScreen() {
  const dispatch = useDispatch<any>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup=()=>{
    dispatch(signupUser({fullName,email,phone,role,password,confirmPassword}))
  }

  return (
    <SafeAreaView style={authStyles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scroll}
            showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.container}>

            {/* Logo */}
            <View style={authStyles.logoBox}>
              <Image
                source={require("../../../assets/logo2.jpg")}
                style={authStyles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={authStyles.title}>Create Account</Text>

            {/* Full Name */}
            <Text style={authStyles.labe}>Full Name</Text>
            <View style={authStyles.inputBox}>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                style={authStyles.input}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
            <Text style={authStyles.labe}>Work Email</Text>
            <View style={authStyles.inputBox}>
              <TextInput
                placeholder="Enter your work email"
                placeholderTextColor="#999"
                style={authStyles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone */}
            <Text style={authStyles.labe}>Phone Number</Text>
            <View style={authStyles.inputBox}>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                style={authStyles.input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Role */}
            <Text style={authStyles.labe}>Role</Text>
            <View style={authStyles.pickerWrapper}>
              <Picker
                selectedValue={role}
                onValueChange={setRole}
                style={authStyles.picker}
              >
                <Picker.Item label="Select role" value="" />
                <Picker.Item label="Sales" value="sales" />
                <Picker.Item label="Marketing" value="marketing" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
            </View>

            {/* Password */}
            <Text style={authStyles.labe}>Password</Text>
            <View style={authStyles.inputBox}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                style={authStyles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Confirm Password */}
            <Text style={authStyles.labe}>Confirm Password</Text>
            <View
              style={[
                authStyles.inputBox,
                confirmPassword !== "" && confirmPassword !== password
                  ? authStyles.errorInput
                  : null,
              ]}
            >
              <TextInput
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry
                style={authStyles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {confirmPassword !== "" && confirmPassword !== password && (
              <Text style={authStyles.errorText}>Passwords do not match.</Text>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity style={authStyles.primaryBtn} onPress={handleSignup}>
              <Text style={authStyles.primaryBtnText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={authStyles.footerRow}>
              <Text style={authStyles.footerText}>Already have an account? </Text>
              <TouchableOpacity>
                <Text style={authStyles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
