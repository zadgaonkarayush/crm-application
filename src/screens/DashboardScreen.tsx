import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dashboardStyles from '../styles/DashboardStyle';
import authStyles from '../styles/authStyles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  getLast7DaysSale,
  getLowStock,
  getOpenOrders,
  getTotalSale,
} from '../api/dashboard.api';
import { Order } from '../features/orders/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchOrders } from '../features/orders/orderSlice';

interface Last7DaysSale {
  _id: number; // "YYYY-MM-DD"
  total: number;
}

export default function DashboardScreen({ navigation }: any) {
  const [lowstock, setLowStock] = useState(0);
  const [openOrder, setOpenOrder] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [sevenDays, setSevenDays] = useState<Last7DaysSale[]>([]);
  // const [orders,setOrders] =useState<Order[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { orders } = useSelector((state: RootState) => state.order);

  const recentOrders = useMemo(() => {
    return orders
      .slice() // create a copy
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) // newest first
      .slice(0, 4); // only 4
  }, [orders]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [low, open, seven, totalSales] = await Promise.all([
          getLowStock(),
          getOpenOrders(),
          getLast7DaysSale(),
          getTotalSale(),
        ]);
        setLowStock(low);
        setOpenOrder(open);
        setSevenDays(seven);
        setTotalSales(totalSales);
      } catch (err) {
        console.log('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const buildsLast7DaysData = () => {
    const today = new Date();

    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const dayNumber = date.getDate();

      const dayLabel = date.toLocaleDateString('en-US', {
        weekday: 'short',
      });

      const match = sevenDays.find((d) => d._id === dayNumber);

      days.push({
        label: dayLabel,
        total: match ? match.total : 0,
      });
    }
    return days;
  };
  const chartData = useMemo(buildsLast7DaysData, [sevenDays]);
  const maxValue = Math.max(...chartData.map((d) => d.total), 1);
  const BAR_MAX_HEIGHT = 180;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped':
        return '#A7F3D0'; // green
      case 'pending':
        return '#FDE68A'; // yellow
      case 'cancelled':
        return '#FECACA'; // red
      default:
        return '#D1D5DB'; // gray
    }
  };

  return (
    <SafeAreaView style={authStyles.safe}>
      <ScrollView
        style={dashboardStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={dashboardStyles.header}>
          <Text style={dashboardStyles.heeaderTitle}>Dashboard</Text>
          <View style={dashboardStyles.headerIcons}>
            <Ionicons name='search-outline' size={24} color='#000' />
            <Ionicons
              name='notifications-outline'
              size={24}
              color='#000'
              style={{ marginLeft: 15 }}
            />
          </View>
        </View>
        <View style={dashboardStyles.card}>
          <View style={dashboardStyles.iconCircle}>
            <Ionicons name='stats-chart' size={26} color='#377DFF' />
          </View>
          <View>
            <Text style={dashboardStyles.cardTitle}>Total Sales</Text>
            <Text style={dashboardStyles.cardValue}>₹{totalSales}</Text>
          </View>
        </View>
        <View style={dashboardStyles.card}>
          <View style={dashboardStyles.iconCircle}>
            <Ionicons name='calendar-outline' size={26} color='#377DFF' />
          </View>
          <View>
            <Text style={dashboardStyles.cardTitle}>Open</Text>
            <Text style={dashboardStyles.cardValue}>{openOrder}</Text>
          </View>
        </View>
        <View style={dashboardStyles.card}>
          <View style={dashboardStyles.iconCircle}>
            <Ionicons name='cube-outline' size={26} color='#377DFF' />
          </View>
          <View>
            <Text style={dashboardStyles.cardTitle}>Low Stock</Text>
            <Text style={dashboardStyles.cardValue}>{lowstock}</Text>
          </View>
        </View>

        {/* Sales Chart (Static Placeholder Bars) */}
        <View style={dashboardStyles.section}>
          <Text style={dashboardStyles.sectionTitle}>Sales last 7 days</Text>

          <View style={dashboardStyles.chartRow}>
            {chartData.map((item, index) => {
              const height = (item.total / maxValue) * BAR_MAX_HEIGHT;

              return (
                <View key={index} style={dashboardStyles.chartItem}>
                  <View
                    style={[
                      dashboardStyles.bar,
                      { height: height || 4 }, // small bar if 0
                    ]}
                  />
                  <Text style={dashboardStyles.chartLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={dashboardStyles.sectionHeaderRow}>
          <Text style={dashboardStyles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={dashboardStyles.link}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentOrders.map((order, i) => (
          <View key={i} style={dashboardStyles.orderCard}>
            <View style={dashboardStyles.iconCircleSm}>
              <Ionicons name='receipt-outline' size={20} color='#377DFF' />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dashboardStyles.orderId}>{order._id}</Text>
              <Text style={dashboardStyles.orderCompany}>
                {order.customer?.name}
              </Text>
            </View>
            <View
              style={[
                dashboardStyles.statusBox,
                { backgroundColor: getStatusColor(order.status) },
              ]}
            >
              <Text style={dashboardStyles.statusText}>{order.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
