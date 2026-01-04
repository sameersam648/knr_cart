import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { OrderCard } from '@/components/order-card';
import { useOrders } from '@/lib/order-context';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
    const router = useRouter();
    const { getCompletedOrders, refreshOrders } = useOrders();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const completedOrders = getCompletedOrders();

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshOrders();
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

    const renderEmptyState = () => (
        <View className="flex-1 justify-center items-center py-16 px-8">
            <View className="bg-muted/10 p-6 rounded-full mb-6">
                <Ionicons name="checkmark-done-circle-outline" size={64} color="#94A3B8" />
            </View>
            <Text className="text-xl font-bold text-foreground mb-2">No completed orders</Text>
            <Text className="text-base text-muted text-center">
                Completed orders will appear here
            </Text>
        </View>
    );

    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = completedOrders.filter(
        (order) => new Date(order.createdAt).getTime() >= today.getTime()
    );

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    const weekOrders = completedOrders.filter(
        (order) => new Date(order.createdAt).getTime() >= weekAgo.getTime()
    );

    return (
        <ScreenContainer className="p-0 bg-background">
            <View className="flex-1">
                {/* Header with Stats */}
                <View className="px-5 pt-6 pb-4 bg-surface border-b border-border/40">
                    <Text className="text-3xl font-extrabold text-foreground mb-4">Order History</Text>
                    <View className="flex-row gap-4">
                        <View className="flex-1 bg-success/10 rounded-xl p-3 border border-success/20">
                            <Text className="text-xs font-bold text-muted uppercase tracking-wider">Today</Text>
                            <Text className="text-2xl font-extrabold text-success mt-1">{todayOrders.length}</Text>
                        </View>
                        <View className="flex-1 bg-primary/10 rounded-xl p-3 border border-primary/20">
                            <Text className="text-xs font-bold text-muted uppercase tracking-wider">This Week</Text>
                            <Text className="text-2xl font-extrabold text-primary mt-1">{weekOrders.length}</Text>
                        </View>
                        <View className="flex-1 bg-muted/10 rounded-xl p-3 border border-border/50">
                            <Text className="text-xs font-bold text-muted uppercase tracking-wider">Total</Text>
                            <Text className="text-2xl font-extrabold text-foreground mt-1">{completedOrders.length}</Text>
                        </View>
                    </View>
                </View>

                {/* Completed Orders List */}
                {completedOrders.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={completedOrders}
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
                                tintColor="#22C55E"
                            />
                        }
                        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
                    />
                )}
            </View>
        </ScreenContainer>
    );
}
