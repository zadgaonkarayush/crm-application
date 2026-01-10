import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { fetchOrders, setOrderFilter } from '../features/orders/orderSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const FILTERS = ['All', 'draft', 'pending', 'shipped'] as const;

export default function OrderScreen() {
  const { activeFilter, orders } = useSelector(
    (state: RootState) => state.order
  );

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchOrders());
    setRefreshing(false);
  };

  // const filteredOrderData = orders
  //   .filter((o) =>
  //     activeFilter === 'All' ? true : o.status.toLowerCase() === activeFilter.toLowerCase()
  //   )
  //   .filter((o) =>
  //     o.customer?.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     o._id.toLowerCase().includes(searchText.toLowerCase())
  //   );
  const filteredOrderData = orders
    .filter((o) => {
      if (activeFilter === 'All') return true;
      return o.status && o.status.toLowerCase() === activeFilter.toLowerCase();
    })
    .filter((o) => {
      const customerName = o.customer?.name ?? '';
      const orderId = o._id ?? '';

      return (
        customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        orderId.toLowerCase().includes(searchText.toLowerCase())
      );
    });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <Text style={styles.title}>Orders</Text>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name='search' size={20} color='#888' />
          <TextInput
            placeholder='Search orders by ID or customer...'
            style={styles.input}
            placeholderTextColor='#999'
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {FILTERS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                activeFilter === item && styles.filterBtnActive,
              ]}
              onPress={() => dispatch(setOrderFilter(item))}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Cards */}
        {filteredOrderData.map((o) => (
          <TouchableOpacity
            key={o._id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('OrderDetailScreen',{ order: o })
            }
          >
            <View style={styles.cardLeft}>
              <Text style={styles.orderId}>
                Order #{o._id ? o._id.slice(-6) : '------'}
              </Text>

              <Text style={styles.client}>
                {o.customer?.name ?? 'Deleted Customer'}
              </Text>
              <Text style={styles.date}>
                {new Date(o.createdAt).toLocaleDateString()}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  o.status === 'shipped' && styles.shipped,
                  o.status === 'pending' && styles.pending,
                  o.status === 'draft' && styles.draft,
                  o.status === 'cancelled' && styles.cancelled,
                ]}
              >
                <Text style={styles.statusText}>{o.status}</Text>
              </View>
            </View>

            <View style={styles.cardRight}>
              <Ionicons
                name='chevron-forward'
                size={22}
                color='#888'
                style={{ marginBottom: 8 }}
              />
              <Text style={styles.amount}>
                ₹ {typeof o.total === 'number' ? o.total.toLocaleString() : '0'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredOrderData.length === 0 && (
          <Text style={styles.noOrders}>No orders found</Text>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('CreateOrderScreen')}
      >
        <Ionicons name='add' size={32} color='#fff' />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    color: '#555',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {},
  cardRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  client: {
    fontSize: 14,
    marginBottom: 2,
    color: '#666',
  },
  date: {
    fontSize: 12,
    marginBottom: 6,
    color: '#999',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  shipped: {
    backgroundColor: '#4CAF50',
  },
  pending: {
    backgroundColor: '#FFC107',
  },
  draft: {
    backgroundColor: '#2196F3',
  },
  cancelled: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  noOrders: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});
