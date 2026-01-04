/**
 * Order Service - Rider App
 * 
 * Handles order management for delivery riders.
 * Currently uses in-memory mock data with generation logic.
 */

import {
    Order,
    OrderStatus,
    OrderItem,
    SIMULATED_NETWORK_DELAY_MS,
} from '@/shared/types';

/**
 * Simulates network delay
 */
const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS));

// In-memory storage (simulates backend)
let availableOrdersStore: Order[] = [];
let activeOrderStore: Order | null = null;
let completedOrdersStore: Order[] = [];

/**
 * Generate mock orders for riders
 */
function generateMockOrders(count: number = 5): Order[] {
    const now = new Date().toISOString();
    const mockOrders: Order[] = [];

    const restaurants = [
        { id: 'rest1', name: 'Pizza Palace', address: '123 Main St', lat: 40.7128, lng: -74.006 },
        { id: 'rest2', name: 'Burger Barn', address: '456 Oak Ave', lat: 40.758, lng: -73.9855 },
        { id: 'rest3', name: 'Sushi Supreme', address: '789 Park Blvd', lat: 40.7489, lng: -73.9680 },
    ];

    const customers = [
        { name: 'John Doe', phone: '+1234567890', address: '100 Broadway', lat: 40.7505, lng: -73.9972 },
        { name: 'Jane Smith', phone: '+1234567891', address: '200 5th Ave', lat: 40.7549, lng: -73.9840 },
        { name: 'Bob Johnson', phone: '+1234567892', address: '300 Madison Ave', lat: 40.7535, lng: -73.9822 },
    ];

    for (let i = 0; i < count; i++) {
        const restaurant = restaurants[i % restaurants.length];
        const customer = customers[i % customers.length];
        const distance = Math.random() * 5 + 1;

        const items: OrderItem[] = [
            {
                id: `item-${i}`,
                menuItemId: `menu-${i}`,
                name: `Item ${i + 1}`,
                price: Math.floor(Math.random() * 500) + 100,
                quantity: Math.floor(Math.random() * 3) + 1,
                createdAt: now,
                updatedAt: now,
            },
        ];

        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.05);
        const deliveryFee = 50;

        mockOrders.push({
            id: `order_${i + 1}`,
            orderNumber: `#${2000 + i}`,
            customerId: `cust_${i}`,
            customerName: customer.name,
            customerPhone: customer.phone,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantAddress: restaurant.address,
            restaurantLatitude: restaurant.lat,
            restaurantLongitude: restaurant.lng,
            deliveryAddress: customer.address,
            deliveryLatitude: customer.lat,
            deliveryLongitude: customer.lng,
            items,
            subtotal,
            tax,
            deliveryFee,
            totalAmount: subtotal + tax + deliveryFee,
            status: 'ready', // Ready for pickup
            orderType: 'quick',
            estimatedPrepTime: 15,
            createdAt: new Date(Date.now() - i * 300000).toISOString(),
            updatedAt: now,
        });
    }

    return mockOrders;
}

// Initialize with mock data
if (availableOrdersStore.length === 0) {
    availableOrdersStore = generateMockOrders(5);
}

/**
 * Get available orders for pickup
 */
export async function getAvailableOrders(): Promise<Order[]> {
    await simulateDelay();
    return [...availableOrdersStore];
}

/**
 * Get currently active order
 */
export async function getActiveOrder(): Promise<Order | null> {
    await simulateDelay();
    return activeOrderStore;
}

/**
 * Get completed orders
 */
export async function getCompletedOrders(): Promise<Order[]> {
    await simulateDelay();
    return [...completedOrdersStore];
}

/**
 * Accept an order
 */
export async function acceptOrder(orderId: string): Promise<void> {
    await simulateDelay();

    const order = availableOrdersStore.find((o) => o.id === orderId);
    if (order) {
        const acceptedOrder: Order = {
            ...order,
            status: 'picked_up',
            updatedAt: new Date().toISOString(),
        };

        activeOrderStore = acceptedOrder;
        availableOrdersStore = availableOrdersStore.filter((o) => o.id !== orderId);
    }
}

/**
 * Reject an order
 */
export async function rejectOrder(orderId: string): Promise<void> {
    await simulateDelay();
    availableOrdersStore = availableOrdersStore.filter((o) => o.id !== orderId);
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await simulateDelay();

    if (activeOrderStore && activeOrderStore.id === orderId) {
        const updatedOrder: Order = {
            ...activeOrderStore,
            status,
            updatedAt: new Date().toISOString(),
            deliveredAt: status === 'delivered' ? new Date().toISOString() : activeOrderStore.deliveredAt,
        };

        activeOrderStore = updatedOrder;

        // Move to completed if delivered or cancelled
        if (status === 'delivered' || status === 'cancelled') {
            completedOrdersStore = [updatedOrder, ...completedOrdersStore];
            activeOrderStore = null;
        }
    }
}

/**
 * Add mock orders (for testing)
 */
export async function addMockOrders(): Promise<void> {
    await simulateDelay();
    const newOrders = generateMockOrders(5);
    availableOrdersStore = [...availableOrdersStore, ...newOrders];
}
