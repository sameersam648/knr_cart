/**
 * Shared Constants - Centralized Enums and Configuration
 * 
 * All apps should import constants from this file to ensure consistency.
 */

import { OrderStatus, OrderType, RiderStatus, UserRole, PaymentStatus } from './models';

// ============================================================================
// ORDER STATUSES
// ============================================================================

export const ORDER_STATUSES: readonly OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'picked_up',
    'in_transit',
    'delivered',
    'cancelled',
    'refunded',
] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-orange-100 text-orange-800',
    ready: 'bg-purple-100 text-purple-800',
    picked_up: 'bg-indigo-100 text-indigo-800',
    in_transit: 'bg-cyan-100 text-cyan-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
};

// Restaurant workflow: pending -> confirmed -> preparing -> ready
export const RESTAURANT_ORDER_STATUSES: readonly OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
] as const;

// Rider workflow: ready -> picked_up -> in_transit -> delivered
export const RIDER_ORDER_STATUSES: readonly OrderStatus[] = [
    'ready',
    'picked_up',
    'in_transit',
    'delivered',
] as const;

// ============================================================================
// ORDER TYPES
// ============================================================================

export const ORDER_TYPES: readonly OrderType[] = [
    'quick',
    'scheduled',
    'subscription',
    'custom',
] as const;

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
    quick: 'Quick Order',
    scheduled: 'Scheduled Order',
    subscription: 'Subscription',
    custom: 'Custom Order',
};

// ============================================================================
// USER ROLES
// ============================================================================

export const USER_ROLES: readonly UserRole[] = [
    'customer',
    'restaurant_owner',
    'rider',
    'admin',
] as const;

export const USER_ROLE_LABELS: Record<UserRole, string> = {
    customer: 'Customer',
    restaurant_owner: 'Restaurant Owner',
    rider: 'Delivery Rider',
    admin: 'Admin',
};

// ============================================================================
// RIDER STATUSES
// ============================================================================

export const RIDER_STATUSES: readonly RiderStatus[] = [
    'offline',
    'online',
    'busy',
    'delivering',
] as const;

export const RIDER_STATUS_LABELS: Record<RiderStatus, string> = {
    offline: 'Offline',
    online: 'Online',
    busy: 'Busy',
    delivering: 'Delivering',
};

export const RIDER_STATUS_COLORS: Record<RiderStatus, string> = {
    offline: 'bg-gray-500',
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    delivering: 'bg-blue-500',
};

// ============================================================================
// PAYMENT STATUSES
// ============================================================================

export const PAYMENT_STATUSES: readonly PaymentStatus[] = [
    'pending',
    'completed',
    'failed',
    'refunded',
] as const;

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    refunded: 'Refunded',
};

// ============================================================================
// CONFIGURATION
// ============================================================================

export const DEFAULT_DELIVERY_FEE = 50; // ₹50
export const DEFAULT_TAX_RATE = 0.05; // 5%

export const SIMULATED_NETWORK_DELAY_MS = 200; // For mock data async simulation

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get display label for order status
 */
export function getOrderStatusLabel(status: OrderStatus): string {
    return ORDER_STATUS_LABELS[status] || status;
}

/**
 * Get CSS classes for order status badge
 */
export function getOrderStatusColor(status: OrderStatus): string {
    return ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Check if order is in a final state (no further updates expected)
 */
export function isOrderFinal(status: OrderStatus): boolean {
    return status === 'delivered' || status === 'cancelled' || status === 'refunded';
}

/**
 * Get next valid status for restaurant workflow
 */
export function getNextRestaurantStatus(currentStatus: OrderStatus): OrderStatus | null {
    const workflow: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready'];
    const currentIndex = workflow.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === workflow.length - 1) return null;
    return workflow[currentIndex + 1];
}

/**
 * Get next valid status for rider workflow
 */
export function getNextRiderStatus(currentStatus: OrderStatus): OrderStatus | null {
    const workflow: OrderStatus[] = ['ready', 'picked_up', 'in_transit', 'delivered'];
    const currentIndex = workflow.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === workflow.length - 1) return null;
    return workflow[currentIndex + 1];
}

/**
 * Format time elapsed since order creation
 */
export function formatElapsedTime(dateString: string): string {
    const created = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
    return `₹${amount.toFixed(2)}`;
}

/**
 * Generate Google Maps URL for coordinates
 */
export function generateMapsUrl(lat: number, lng: number): string {
    return `https://maps.google.com/?q=${lat},${lng}`;
}
