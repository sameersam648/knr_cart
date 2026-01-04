/**
 * Order Service - Data Access Layer
 * 
 * Provides async functions for order management.
 * Currently uses AsyncStorage, designed to be swapped with Supabase calls.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Order,
    OrderItem,
    CartItem,
    OrderType,
    SubscriptionData,
    CustomOrderData,
    SIMULATED_NETWORK_DELAY_MS,
} from '@/shared/types';

const ORDERS_STORAGE_KEY = 'orders';

/**
 * Simulates network delay for realistic async behavior
 */
const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS));

/**
 * Generate a unique order ID
 */
function generateOrderId(): string {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Create a new order
 */
export async function createOrder(orderData: {
    customerId: string;
    customerName: string;
    customerPhone?: string;
    restaurantId?: string;
    restaurantName?: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    deliveryAddress: string;
    orderType?: OrderType;
    scheduledDateTime?: Date | null;
    subscriptionData?: SubscriptionData | null;
    customOrderData?: CustomOrderData | null;
    specialInstructions?: string;
}): Promise<Order> {
    await simulateDelay();

    // Convert CartItems to OrderItems
    const orderItems: OrderItem[] = orderData.items.map((cartItem, index) => ({
        id: `item-${index}`,
        menuItemId: cartItem.menuItem.id,
        name: cartItem.menuItem.name,
        price: cartItem.menuItem.price,
        quantity: cartItem.quantity,
        specialInstructions: cartItem.specialInstructions,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));

    const now = new Date().toISOString();

    const newOrder: Order = {
        id: generateOrderId(),
        orderNumber: generateOrderId(),
        customerId: orderData.customerId,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        restaurantId: orderData.restaurantId,
        restaurantName: orderData.restaurantName,
        items: orderItems,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        deliveryFee: orderData.deliveryFee,
        totalAmount: orderData.subtotal + orderData.tax + orderData.deliveryFee,
        status: 'pending',
        orderType: orderData.orderType || 'quick',
        deliveryAddress: orderData.deliveryAddress,
        specialInstructions: orderData.specialInstructions,
        scheduledDateTime: orderData.scheduledDateTime?.toISOString(),
        subscriptionData: orderData.subscriptionData || undefined,
        customOrderData: orderData.customOrderData || undefined,
        createdAt: now,
        updatedAt: now,
    };

    // Save to AsyncStorage
    const existingOrders = await getOrders();
    const updatedOrders = [newOrder, ...existingOrders];
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

    return newOrder;
}

/**
 * Get all orders for the current user
 */
export async function getOrders(): Promise<Order[]> {
    await simulateDelay();

    try {
        const ordersJson = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
        if (!ordersJson) return [];

        const orders: Order[] = JSON.parse(ordersJson);
        return orders;
    } catch (error) {
        console.error('Failed to load orders:', error);
        return [];
    }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
    await simulateDelay();

    const orders = await getOrders();
    return orders.find((order) => order.id === orderId) || null;
}

/**
 * Cancel an order
 */
export async function cancelOrder(orderId: string): Promise<void> {
    await simulateDelay();

    const orders = await getOrders();
    const updatedOrders = orders.map((order) =>
        order.id === orderId
            ? { ...order, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
            : order
    );

    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status: string): Promise<Order[]> {
    await simulateDelay();

    const orders = await getOrders();
    return orders.filter((order) => order.status === status);
}

/**
 * Clear all orders (for testing/debugging)
 */
export async function clearAllOrders(): Promise<void> {
    await AsyncStorage.removeItem(ORDERS_STORAGE_KEY);
}
