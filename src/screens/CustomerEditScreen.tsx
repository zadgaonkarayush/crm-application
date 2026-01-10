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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { editCustomer } from "../features/customer/customerSlice";

export default function CustomerEditScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = useRoute().params as { id: string };

  const customer = useSelector((state: RootState) =>
    state.customer.customers.find((c) => c.id === id)
  );

  const [fullName, setFullName] = useState(customer?.name || "");
  const [company, setCompany] = useState(customer?.company || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [address, setAddress] = useState(customer?.address || "");

  const TAGS = ["Lead", "VIP", "Tier 1", "Follow-up", "High Priority"];
  const [selectedTag, setSelectedTag] = useState(customer?.status || "");

  const handleSave = () => {
    dispatch(
      editCustomer({
        id,
        name: fullName,
        company,
        email,
        phone,
        address,
        status: selectedTag,
        avatar: customer?.avatar || "",
      })
    );
    navigation.goBack();
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
            Edit Customer
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
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          {/* Company Name */}
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            value={company}
            onChangeText={setCompany}
            style={styles.input}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            multiline
            style={[styles.input, { height: 100 }]}
          />

          {/* Tags */}
          <Text style={styles.label}>Tags / Category</Text>

          <View style={styles.tagContainer}>
            {TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => setSelectedTag(tag)}
                style={[
                  styles.tag,
                  selectedTag === tag && styles.tagActive,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTag === tag && { color: "#fff" },
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =StyleSheet.create(
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
