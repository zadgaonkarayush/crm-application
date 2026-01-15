// OrderDetailScreen.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { generateInvoice } from "../api/order.api";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";
// Assume we pass isAdmin prop to know if user can change status
export default function OrderDetailScreen({ route, navigation }: any) {
  const { order, isAdmin = false } = route.params; 
  const [status, setStatus] = useState(order.status);
 const userRole = useSelector((state:RootState)=>state.auth.user?.role)
  const total = order.lines.reduce(
    (sum: number, i: any) => sum + i.quantity * i.price,
    0
  );

 const handleDownloadInvoice = async () => {
  try {
    const pdfData = await generateInvoice(order._id);

    const fileUri =
      FileSystem.documentDirectory + `invoice_${order._id}.pdf`;

    const base64Data = Buffer.from(pdfData).toString("base64");

    await FileSystem.writeAsStringAsync(
      fileUri,
      base64Data,
      { encoding: "base64" } // ✅ STRING, NOT EncodingType
    );

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert("Success", "Invoice saved at: " + fileUri);
    }

  } catch (error) {
    console.error("Failed to download invoice:", error);
    Alert.alert("Error", "Failed to download invoice");
  }
};


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.orderId}>Order ID: {order._id}</Text>

        {/* CUSTOMER */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="person" size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Customer</Text>
          </View>
          <Text style={styles.value}>{order.customer?.name ?? "Deleted Customer"}</Text>
          <Text style={styles.subValue}>
            <Ionicons name="call-outline" size={14} /> {order.customer?.phone ?? "-"}
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="info-outline" size={20} color="#2563eb" />
            <Text style={styles.sectionTitle}>Order Status</Text>
          </View>

          <Text style={styles.statusBadge(status)}>{status}</Text>

          {userRole === "admin" && (
            <View style={styles.statusRow}>
              {["pending", "shipped", "completed"].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  style={[styles.statusBtn, status === s && styles.statusActive]}
                >
                  <Text style={[styles.statusText, status === s && { color: "#fff" }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* ITEMS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="inventory-2" size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Items</Text>
          </View>
          {order.lines.map((l: any, i: number) => (
            <View key={i} style={styles.itemRow}>
              <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
                <Ionicons name="cube-outline" size={16} color="#374151"/>
                <View>
                  <Text style={styles.itemName}>{l.name}</Text>
                  <Text style={styles.subValue}>{l.quantity} × ₹{l.price}</Text>
                </View>
              </View>
              <Text style={styles.itemTotal}>₹{l.quantity * l.price}</Text>
            </View>
          ))}
        </View>

        {/* TOTAL */}
        <View style={styles.totalCard}>
          <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
            <MaterialIcons name="attach-money" size={20} color="#0369a1"/>
            <Text style={styles.totalLabel}>Total Amount</Text>
          </View>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

        {/* INVOICE */}
        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={handleDownloadInvoice}
        >
          <Ionicons name="document-text-outline" size={18} color="#fff" />
          <Text style={styles.invoiceText}>Generate Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827",
  },
  orderId: {
    color: "#6b7280",
    marginBottom: 20,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  subValue: {
    color: "#6b7280",
    marginTop: 2,
    fontSize: 14,
  },

  /* STATUS */
  statusBadge: (status: string) => ({
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor:
      status === "completed"
        ? "#dcfce7"
        : status === "shipped"
        ? "#e0f2fe"
        : "#fef3c7",
    color:
      status === "completed"
        ? "#166534"
        : status === "shipped"
        ? "#075985"
        : "#92400e",
    fontWeight: "600",
    textTransform: "capitalize",
  }),
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusActive: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  statusText: {
    textTransform: "capitalize",
    color: "#374151",
    fontWeight: "600",
  },

  /* ITEMS */
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  itemName: {
    fontWeight: "600",
  },
  itemTotal: {
    fontWeight: "700",
  },

  /* TOTAL */
  totalCard: {
    backgroundColor: "#ecfeff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  totalLabel: {
    color: "#0369a1",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },

  /* INVOICE */
  invoiceBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  invoiceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
