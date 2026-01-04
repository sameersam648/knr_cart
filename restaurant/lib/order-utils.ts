import { OrderStatus } from '@/types';

/**
 * Format timestamp to readable time string
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Get elapsed time from order creation
 */
export function getElapsedTime(createdAt: string | number): string {
  const createdTime = typeof createdAt === 'string' ? new Date(createdAt).getTime() : createdAt;
  const now = Date.now();
  const elapsed = Math.floor((now - createdTime) / 1000);

  if (elapsed < 60) {
    return `${elapsed}s ago`;
  }

  const minutes = Math.floor(elapsed / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

/**
 * Get status badge color
 */
export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: '#3B82F6', // Blue - Order Received
    confirmed: '#8B5CF6', // Purple - Confirmed
    preparing: '#F59E0B', // Amber - Preparing
    ready: '#10B981', // Green - Ready for Delivery
    picked_up: '#06B6D4', // Cyan - Handed to Rider
    in_transit: '#0EA5E9', // Sky Blue - In Transit
    delivered: '#22C55E', // Green - Completed
    cancelled: '#EF4444', // Red - Cancelled
    refunded: '#94A3B8', // Gray - Refunded
  };
  return colors[status] || '#687076';
}

/**
 * Get status label for restaurant workflow
 */
export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Order Received',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready for Delivery',
    picked_up: 'Handed to Rider',
    in_transit: 'In Transit',
    delivered: 'Completed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  return labels[status] || status;
}

/**
 * Get next available status transitions for restaurant workflow
 */
export function getNextStatuses(currentStatus: OrderStatus): OrderStatus[] {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['preparing', 'cancelled'],
    preparing: ['ready', 'cancelled'],
    ready: ['picked_up'], // Rider picks up
    picked_up: [], // Rider handles from here
    in_transit: [], // Rider handles
    delivered: [], // Final state
    cancelled: [], // Final state
    refunded: [], // Final state
  };
  return transitions[currentStatus] || [];
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Get status progress percentage
 */
export function getStatusProgress(status: OrderStatus): number {
  const progress: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 20,
    preparing: 40,
    ready: 60,
    picked_up: 80,
    in_transit: 90,
    delivered: 100,
    cancelled: 0,
    refunded: 0,
  };
  return progress[status] || 0;
}

/**
 * Check if order is in final/completed state
 */
export function isOrderCompleted(status: OrderStatus): boolean {
  return status === 'delivered' || status === 'cancelled' || status === 'refunded';
}

/**
 * Check if order is active (not completed)
 */
export function isOrderActive(status: OrderStatus): boolean {
  return !isOrderCompleted(status);
}
