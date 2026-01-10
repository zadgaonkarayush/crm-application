import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../features/customer/customerSlice";
import { RootState } from "../store/store";

export default function AddCustomerScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();

  const loading = useSelector((state:RootState)=>state.customer.loading)

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [selectedTag, setSelectedTag] = useState("Lead");

  const handleAdd = async() => {
    if(!fullName) return;

    const result = await dispatch(
      addCustomer({
        name:fullName,
         company,
      email,
      phone,
      address,
      })
    )
    if (addCustomer.fulfilled.match(result)) {
    navigation.goBack();
  }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F6FA" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginLeft: 16,
            }}
          >
            Add Customer
          </Text>
        </View>

        {/* Form */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            marginTop: 20,
            borderRadius: 20,
          }}
        >
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <Text style={styles.label}>Company Name</Text>
          <TextInput
            value={company}
            onChangeText={setCompany}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            multiline
            style={[styles.input, { height: 100 }]}
          />


         
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
          <Text style={styles.saveBtnText}>Add Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
    {
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F0F2F5",
    padding: 14,
    marginTop: 6,
    borderRadius: 18,
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#E8ECF3",
  },
  tagActive: {
    backgroundColor: "#1E5EF3",
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  saveBtn: {
    backgroundColor: "#1E5EF3",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 16,
    color: "#555",
  },
}
)
