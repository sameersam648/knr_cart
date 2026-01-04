import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { OrderCard } from '@/components/order-card';
import { useOrders } from '@/lib/order-context';
import { generateMockOrders } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { orders, isLoading, addOrder, refreshOrders, getActiveOrders } = useOrders();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasInitialData, setHasInitialData] = useState(false);

  // Initialize with mock data on first load
  useEffect(() => {
    const initializeMockData = async () => {
      if (!hasInitialData && orders.length === 0) {
        const mockOrders = generateMockOrders(5);
        for (const order of mockOrders) {
          await addOrder(order);
        }
        setHasInitialData(true);
      }
    };

    initializeMockData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshOrders();
      // Simulate adding a new order on refresh
      const newOrder = generateMockOrders(1)[0];
      newOrder.id = `order_${Date.now()}`;
      await addOrder(newOrder);
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOrderPress = (orderId: string) => {
    router.push({
      pathname: '/order-details',
      params: { orderId },
    });
  };

  // Show only new orders that need immediate attention (pending and confirmed)
  const homeOrders = orders.filter(order => ['pending', 'confirmed'].includes(order.status));
  const pendingOrders = homeOrders.filter(order => order.status === 'pending');
  const confirmedOrders = homeOrders.filter(order => order.status === 'confirmed');

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-16 px-8">
      <View className="bg-muted/10 p-6 rounded-full mb-6">
        <Ionicons name="receipt-outline" size={64} color="#94A3B8" />
      </View>
      <Text className="text-xl font-bold text-foreground mb-2">No new orders</Text>
      <Text className="text-base text-muted text-center">
        New orders will appear here. Pull down to refresh
      </Text>
    </View>
  );

  return (
    <ScreenContainer className="p-0 bg-background">
      <View className="flex-1">
        {/* Header with Stats */}
        <View className="px-5 pt-6 pb-4 bg-surface border-b border-border/40">
          <Text className="text-3xl font-extrabold text-foreground mb-4">New Orders</Text>
          <View className="flex-row gap-4">
            <View className="flex-1 bg-primary/10 rounded-xl p-3 border border-primary/20">
              <Text className="text-xs font-bold text-muted uppercase tracking-wider">Pending</Text>
              <Text className="text-2xl font-extrabold text-primary mt-1">{pendingOrders.length}</Text>
            </View>
            <View className="flex-1 bg-purple-100 rounded-xl p-3 border border-purple-300">
              <Text className="text-xs font-bold text-muted uppercase tracking-wider">Confirmed</Text>
              <Text className="text-2xl font-extrabold text-purple-600 mt-1">{confirmedOrders.length}</Text>
            </View>
            <View className="flex-1 bg-muted/10 rounded-xl p-3 border border-border/50">
              <Text className="text-xs font-bold text-muted uppercase tracking-wider">Total</Text>
              <Text className="text-2xl font-extrabold text-foreground mt-1">{homeOrders.length}</Text>
            </View>
          </View>
        </View>

        {/* Orders List */}
        {homeOrders.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={homeOrders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View className="px-4">
                <OrderCard
                  order={item}
                  onPress={() => handleOrderPress(item.id)}
                />
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor="#FF6B35"
              />
            }
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
