/**
 * Order Service - Restaurant App
 * 
 * Handles order management for restaurant partners.
 * Currently uses mock data generation and AsyncStorage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Order,
    OrderItem,
    OrderStatus,
    SIMULATED_NETWORK_DELAY_MS,
} from '@/shared/types';

const ORDERS_STORAGE_KEY = 'restaurant_orders';

/**
 * Simulates network delay
 */
const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS));

/**
 * Generate mock orders for testing
 */
function generateMockOrders(count: number = 5): Order[] {
    const now = new Date().toISOString();
    const mockOrders: Order[] = [];

    const customerNames = [
        'John Smith',
        'Sarah Johnson',
        'Michael Chen',
        'Emma Davis',
        'Robert Wilson',
    ];

    const menuItems = [
        { id: 'item1', name: 'Margherita Pizza', price: 299 },
        { id: 'item2', name: 'Caesar Salad', price: 199 },
        { id: 'item3', name: 'Grilled Salmon', price: 499 },
        { id: 'item4', name: 'Chicken Burger', price: 249 },
        { id: 'item5', name: 'Pad Thai', price: 279 },
    ];

    const statuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready'];

    for (let i = 0; i < count; i++) {
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const items: OrderItem[] = [];
        let subtotal = 0;

        for (let j = 0; j < itemCount; j++) {
            const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
            const quantity = Math.floor(Math.random() * 2) + 1;

            items.push({
                id: `orderitem-${i}-${j}`,
                menuItemId: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity,
                createdAt: now,
                updatedAt: now,
            });

            subtotal += menuItem.price * quantity;
        }

        const tax = Math.round(subtotal * 0.05);
        const deliveryFee = 50;

        mockOrders.push({
            id: `order_${i + 1}`,
            orderNumber: `#${1000 + i}`,
            customerId: `cust_${i}`,
            customerName: customerNames[i % customerNames.length],
            customerPhone: `(555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i * 111).padStart(4, '0')}`,
            restaurantId: 'restaurant_1',
            restaurantName: 'My Restaurant',
            items,
            subtotal,
            tax,
            deliveryFee,
            totalAmount: subtotal + tax + deliveryFee,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            orderType: 'quick',
            deliveryAddress: `${100 + i * 10} Main St`,
            estimatedPrepTime: 15 + Math.floor(Math.random() * 30),
            createdAt: new Date(Date.now() - i * 300000).toISOString(), // Stagger by 5 minutes
            updatedAt: now,
        });
    }

    return mockOrders;
}

/**
 * Get all orders for the restaurant
 */
export async function getOrders(): Promise<Order[]> {
    await simulateDelay();

    try {
        const ordersJson = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);

        if (!ordersJson) {
            // Initialize with mock data
            const mockOrders = generateMockOrders(5);
            await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
            return mockOrders;
        }

        return JSON.parse(ordersJson);
    } catch (error) {
        console.error('Failed to load orders:', error);
        return [];
    }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
    await simulateDelay();

    const orders = await getOrders();
    return orders.find((order) => order.id === orderId) || null;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
    orderId: string,
    status: OrderStatus
): Promise<void> {
    await simulateDelay();

    const orders = await getOrders();
    const updatedOrders = orders.map((order) =>
        order.id === orderId
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
    );

    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}

/**
 * Add a new mock order (for testing)
 */
export async function addMockOrder(): Promise<Order> {
    await simulateDelay();

    const orders = await getOrders();
    const newOrders = generateMockOrders(1);
    const newOrder = newOrders[0];

    const updatedOrders = [newOrder, ...orders];
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

    return newOrder;
}

/**
 * Clear all orders (for testing)
 */
export async function clearAllOrders(): Promise<void> {
    await AsyncStorage.removeItem(ORDERS_STORAGE_KEY);
}
