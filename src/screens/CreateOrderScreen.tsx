import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../features/products/productSlice';
import { fetchCustomers } from '../features/customer/customerSlice';
import { createOrderThunk } from '../features/orders/orderSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>
const { height } = Dimensions.get('window');

export default function CreateOrderScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [customer, setCustomer] = useState<any>(null);
  const [lines, setLines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [customerModal, setCustomerModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const customers = useSelector((state: RootState) => state.customer.customers);
  const products = useSelector((state: RootState) => state.product.products);

  const addProduct = (product: any) => {
    setLines((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id && p.quantity < p.stock
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setProductModal(false);
  };

  const total = lines.reduce((sum, l) => sum + l.quantity * l.price, 0);

  const createOrder = async () => {
    const payload = {
      customer: customer.id,
      lines: lines.map((l) => ({
        product: l.id,
        quantity: l.quantity,
        price: l.price,
        tax: 0,
      })),
    };

    try{
      setLoading(true);
      await dispatch(createOrderThunk(payload)).unwrap()
//       navigation.navigate("Tabs", {
//   screen: "Orders",
// });
navigation.dispatch(
  CommonActions.navigate({
    name: "Tabs",
    params: {
      screen: "Orders",
    },
  })
)

    }catch(error:any){
    console.log("Order Failed", error);
    }finally {
    setLoading(false);
  }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Order</Text>
        <Text style={styles.subtitle}>Static Order Screen</Text>

        {/* CUSTOMER */}
        <Text style={styles.section}>Customer</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setCustomerModal(true)}
        >
          <Text style={styles.dropdownText}>
            {customer ? customer.name : 'Select Customer'}
          </Text>
        </TouchableOpacity>

        {/* PRODUCT */}
        <Text style={styles.section}>Products</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setProductModal(true)}
        >
          <Text style={styles.dropdownText}>Add Product</Text>
        </TouchableOpacity>

        {/* ITEMS */}
        {lines.map((l) => (
          <View key={l.id} style={styles.card}>
            <View>
              <Text style={styles.itemName}>{l.name}</Text>
              <Text style={styles.itemSub}>
                ₹{l.price} • Stock {l.stock}
              </Text>
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity
                onPress={() =>
                  setLines((p) =>
                    p
                      .map((x) =>
                        x.id === l.id ? { ...x, quantity: x.quantity - 1 } : x
                      )
                      .filter((x) => x.quantity > 0)
                  )
                }
              >
                <Text style={styles.qtyBtn}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{l.quantity}</Text>

              <TouchableOpacity
                onPress={() =>
                  setLines((p) =>
                    p.map((x) =>
                      x.id === l.id && x.quantity < x.stock
                        ? { ...x, quantity: x.quantity + 1 }
                        : x
                    )
                  )
                }
              >
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Items: {lines.length}</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        {/* SUBMIT */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            (!customer || lines.length === 0) && { opacity: 0.5 },
          ]}
          disabled={!customer || lines.length === 0 || loading}
          onPress={createOrder}
        >
          {loading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.submitText}>Create Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* ================= CUSTOMER BOTTOM SHEET ================= */}
      <Modal transparent visible={customerModal} animationType='slide'>
        <View style={styles.sheetOverlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Customer</Text>
              <TouchableOpacity onPress={() => setCustomerModal(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder='Search customer...'
              style={styles.search}
              value={searchCustomer}
              onChangeText={setSearchCustomer}
            />

            <ScrollView>
              {customers
                .filter((c) =>
                  c.name.toLowerCase().includes(searchCustomer.toLowerCase())
                )
                .map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={styles.sheetItem}
                    onPress={() => {
                      setCustomer(c);
                      setCustomerModal(false);
                    }}
                  >
                    <Text>{c.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= PRODUCT BOTTOM SHEET ================= */}
      <Modal transparent visible={productModal} animationType='slide'>
        <View style={styles.sheetOverlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Product</Text>
              <TouchableOpacity onPress={() => setProductModal(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder='Search product...'
              style={styles.search}
              value={searchProduct}
              onChangeText={setSearchProduct}
            />

            <ScrollView>
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(searchProduct.toLowerCase())
                )
                .map((p) => (
                  <TouchableOpacity
                    key={p.sku}
                    style={styles.sheetItem}
                    onPress={() => addProduct(p)}
                  >
                    <Text style={{ fontWeight: '600' }}>{p.name}</Text>
                    <Text style={{ color: '#6b7280' }}>
                      ₹{p.price} • Stock {p.stock}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  container: { padding: 16 },

  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#6b7280', marginBottom: 20 },

  section: { fontWeight: '600', marginBottom: 6, marginTop: 12 },

  dropdown: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownText: { color: '#374151' },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: { fontWeight: '600' },
  itemSub: { color: '#6b7280', fontSize: 12 },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  qty: { fontWeight: '600' },

  summary: {
    backgroundColor: '#ecfeff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  summaryText: { color: '#0369a1' },
  total: { fontSize: 20, fontWeight: '700', marginTop: 4 },

  submitBtn: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  /* Bottom Sheet */
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    height: height * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700' },
  close: { fontSize: 18 },

  search: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  sheetItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
});
