import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addProduct } from '../features/products/productSlice'
import { SafeAreaView } from "react-native-safe-area-context";
import authStyles from "../styles/authStyles";
export default function AddProductScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [price, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [lowStock, setLowStock] = useState("");
  const [description, setDescription] = useState("");

  const pickImage =async()=>{
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    quality:0.7
  })
  if(!result.canceled){
     setImage(result.assets[0].uri)
  }
  }

  const handleSave = () => {
    const newData = {
      name,
      sku,
      category,
       price,
      stock,
      lowStock,
      description,
      image,
      status: "active",
      id: Date.now().toString(),
    };

    // dispatch(addProduct(newData));
    navigation.goBack();
  };

  return (
  <SafeAreaView style={authStyles.safe}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.productImage} />
        ) : (
          <>
            <Ionicons name="image-outline" size={48} color="#3478F6" />
            <Text style={styles.uploadTitle}>Upload Product Image</Text>
            <Text style={styles.uploadText}>Tap to select image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Inputs */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          placeholder="e.g. Premium Office Chair"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>SKU / Code</Text>
        <TextInput
          placeholder="e.g. CHR-001-BLK"
          style={styles.input}
          value={sku}
          onChangeText={setSku}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Select a category"
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />
      </View>

      {/* Price Row */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="$ 0.00"
            keyboardType="numeric"
            style={styles.input}
            value={price}
            onChangeText={setUnitPrice}
          />
        </View>
      </View>

      {/* Stock Row */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Current Stock</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            style={styles.input}
            value={stock}
            onChangeText={setStock}
          />
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Low Stock Alert</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            style={styles.input}
            value={lowStock}
            onChangeText={setLowStock}
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Enter product description..."
          multiline
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#D0D7E2",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderStyle: "dashed",
    marginBottom: 20,
  },
  uploadTitle: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  uploadText: { fontSize: 14, color: "#8A8A8A" },
  productImage: { width: "100%", height: 200, borderRadius: 10 },
  fieldGroup: { marginBottom: 14 },
  label: { marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#F4F6F9",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  col: { width: "48%" },
  textArea: {
    backgroundColor: "#F4F6F9",
    padding: 12,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  saveText: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
