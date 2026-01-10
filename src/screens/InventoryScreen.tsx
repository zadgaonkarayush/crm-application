import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import inventoryStyle from '../styles/inventoryStyles';
import authStyles from '../styles/authStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../features/products/productSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function InventoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, error, loading } = useSelector(
    (state: RootState) => state.product
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState<
    'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
  >('ALL');
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };
  const filterProducts = products.filter((p) => {
    switch (activeFilter) {
      case 'IN_STOCK':
        return p.stock > 10;

      case 'LOW_STOCK':
        return p.stock > 0 && p.stock <= 10;

      case 'OUT_OF_STOCK':
        return p.stock === 0;
      default:
        return true;
    }
  });
  return (
    <SafeAreaView style={authStyles.safe}>
      <ScrollView
        style={inventoryStyle.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        {/* header */}
        <View style={inventoryStyle.header}>
          <Text style={inventoryStyle.title}>Inventory</Text>
          {user?.role === 'admin' && (
            <TouchableOpacity
              style={inventoryStyle.addButton}
              onPress={() => navigation.navigate('AddProductScreen')}
            >
              <Ionicons name='add' size={32} color='#fff' />
            </TouchableOpacity>
          )}
        </View>

        {/* search input */}
        <View style={inventoryStyle.searchBox}>
          <Ionicons name='search' size={20} color='#888' />
          <TextInput
            placeholder='Search by name or SKU...'
            style={inventoryStyle.input}
          />
        </View>

        {/* filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          <View style={inventoryStyle.filterRow}>
            {[
              { label: 'All', value: 'ALL' },
              { label: 'In Stock', value: 'IN_STOCK' },
              { label: 'Low Stock', value: 'LOW_STOCK' },
              { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setActiveFilter(item.value as any)}
                style={[
                  inventoryStyle.filterBtn,
                  activeFilter === item.value && inventoryStyle.filterBtnActive,
                ]}
              >
                <Text
                  style={[
                    inventoryStyle.filterText,
                    activeFilter === item.value &&
                      inventoryStyle.filterTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* product cards */}
        {loading && <ActivityIndicator size='large' color='#1E5EF3' />}
        {!loading &&
          filterProducts.map((p, i) => (
            <View key={i} style={inventoryStyle.card}>
              <View style={inventoryStyle.cardHeader}>
                <Text style={inventoryStyle.productName}>{p.name}</Text>
                <View
                  style={[
                    inventoryStyle.stockBadge,
                    p.stock < 10
                      ? inventoryStyle.lowStock
                      : inventoryStyle.inStock,
                  ]}
                >
                  <Text
                    style={[
                      inventoryStyle.stockText,
                      p.stock < 10
                        ? { color: '#C62828' }
                        : { color: '#2E7D32' },
                    ]}
                  >
                    {p.stock < 10
                      ? `Low Stock (${p.stock})`
                      : `In Stock (${p.stock})`}
                  </Text>
                </View>
              </View>
              <Text style={inventoryStyle.skuText}>SKU: {p.sku}</Text>
              <Text style={inventoryStyle.priceText}>{p.price}</Text>

              {/* buttons */}
              <View style={inventoryStyle.btnRow}>
                <TouchableOpacity style={inventoryStyle.actionBtn}>
                  <Text style={inventoryStyle.actionText}>Adjust Stock</Text>
                </TouchableOpacity>
                {user?.role === 'admin' && (
                  <TouchableOpacity
                    style={inventoryStyle.actionBtn}
                    onPress={() =>
                      navigation.navigate('ProductEditScreen', { id: p.id })
                    }
                  >
                    <Text style={inventoryStyle.actionText}>Edit Product</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
