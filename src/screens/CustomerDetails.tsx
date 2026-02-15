import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import customerStyles from '../styles/customersStyle';
import authStyles from '../styles/authStyles';
import inventoryStyle from '../styles/inventoryStyles';
import dashboardStyles from '../styles/DashboardStyle';
import orderStyles from '../styles/orderStyles';
import detailStyle from '../styles/detailsStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useEffect, useState } from 'react';
import { getOrderByCustomer } from '../api/order.api';
import { Order } from '../features/orders/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CustomerDetails() {
  const navigation = useNavigation<NavigationProp>();
  const { id } = useRoute().params;
  const customer = useSelector((state: RootState) =>
    state.customer.customers.find((c) => c.id === id)
  );
  const tabs = ['Overview', 'Orders', 'Notes'];
  const activeTab = 'Orders';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderByCustomer = async () => {
      setLoading(true);
      try {
        const data = await getOrderByCustomer(id);
        setOrders(data);
       
      } catch (error) {
        console.error('Failed to fetch orders for customer:', error);
      }finally{
         setLoading(false);
      }
    };
    fetchOrderByCustomer();
  }, []);

 
  return (
    <SafeAreaView style={authStyles.safe}>
      <View style={detailStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={24} />
        </TouchableOpacity>
        <Text style={detailStyle.title}>Customer Details</Text>
        <View></View>
      </View>
      <View style={detailStyle.profileCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={detailStyle.nameBox}>
            <Text style={detailStyle.name}>{customer?.name}</Text>
            <Text style={detailStyle.subName}>{customer?.company}</Text>
          </View>
          <TouchableOpacity
            style={detailStyle.edit}
            onPress={() =>
              navigation.navigate('CustomerEditScreen', { id: customer?.id })
            }
          >
            <Ionicons name='create-sharp' size={22} />
          </TouchableOpacity>
        </View>
        <View style={detailStyle.contactBox}>
          <Ionicons name='call' color='blue' size={18} />
          <Text style={detailStyle.contactText}>{customer?.phone}</Text>
        </View>
        <View style={detailStyle.contactBox}>
          <Ionicons name='mail' color='blue' size={18} />
          <Text style={detailStyle.contactText}>{customer?.email}</Text>
        </View>
      </View>
      <View style={detailStyle.tabRow}>
        {tabs.map((t) => (
          <TouchableOpacity key={t} style={detailStyle.tabBox}>
            <Text
              style={[
                detailStyle.tabText,
                activeTab === t && detailStyle.activeTebText,
              ]}
            >
              {t}
            </Text>
            {activeTab === t && <View style={detailStyle.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      {loading && (<ActivityIndicator size={32} color='blue' style={{marginTop:15}} />)}

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {orders.map((o, i) => (
          <View key={i} style={detailStyle.orderCard}>
            <View style={detailStyle.orderLeft}>
              <View style={detailStyle.orderIconWrapper}>
                <Ionicons name='receipt-outline' size={26} color='#1E5EF3' />
              </View>

              <View>
                <Text style={detailStyle.orderId}>
                  Order {o._id?.slice(-6)}
                </Text>
                <Text style={detailStyle.orderDate}>
                  {new Date(o.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View style={detailStyle.orderRight}>
              <Text style={detailStyle.amount}>₹ {o.total}</Text>
              <View
                style={[
                  detailStyle.badge,
                  {
                    backgroundColor:
                      o.status === 'shipped'
                        ? '#3083e8'
                        : o.status === 'pending'
                        ? '#f0df23'
                        : o.status === 'completed'
                        ? '#34C759'
                        : '#ec5656',
                  },
                ]}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  {o.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
