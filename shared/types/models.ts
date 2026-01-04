/**
 * Unified Data Models - Database Ready
 * 
 * These interfaces represent the canonical data structures for the entire platform.
 * All apps (user, restaurant, rider, admin) should use these types.
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export type UserRole = 'customer' | 'restaurant_owner' | 'rider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatarUrl?: string;
  defaultAddressId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string; // "Home", "Work", etc.
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// RESTAURANT & MENU
// ============================================================================

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  address?: string;
  phone?: string;
  email?: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  items?: MenuItem[]; // Optional: menu items (can be loaded separately)
}

export interface MenuItem {
  id: string;
  restaurantId?: string; // Optional for backward compatibility
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ORDERS
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type OrderType = 'quick' | 'scheduled' | 'subscription' | 'custom';

export interface OrderItem {
  id: string;
  orderId?: string;
  menuItemId: string;
  name: string; // Denormalized for display
  price: number; // Snapshot at order time
  quantity: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber?: string; // Human-readable order number
  customerId: string;
  customerName: string;
  customerPhone?: string;
  restaurantId?: string;
  restaurantName?: string;
  riderId?: string;
  riderName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  orderType: OrderType;
  deliveryAddress: string;
  deliveryLatitude?: number;
  deliveryLongitude?: number;
  restaurantAddress?: string;
  restaurantLatitude?: number;
  restaurantLongitude?: number;
  specialInstructions?: string;
  estimatedPrepTime?: number; // in minutes
  estimatedDeliveryTime?: string; // ISO 8601
  scheduledDateTime?: string; // ISO 8601 - for scheduled orders
  subscriptionData?: SubscriptionData;
  customOrderData?: CustomOrderData;
  createdAt: string; // ISO 8601
  updatedAt: string;
  acceptedAt?: string;
  deliveredAt?: string;
}

export interface SubscriptionData {
  frequency: 'daily' | 'weekly' | 'monthly';
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  occurrences: number;
  nextDeliveryDate?: string;
}

export interface CustomOrderData {
  photoUri?: string;
  audioUri?: string;
  description?: string;
}

// ============================================================================
// CART (User App)
// ============================================================================

export interface CartItem {
  id: string;
  restaurantId: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

// ============================================================================
// RIDER
// ============================================================================

export type RiderStatus = 'offline' | 'online' | 'busy' | 'delivering';

export interface Rider {
  id: string;
  userId: string;
  name: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  status: RiderStatus;
  currentLatitude?: number;
  currentLongitude?: number;
  rating: number;
  totalDeliveries: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PAYMENT
// ============================================================================

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type PaymentMethod = 'cash' | 'card' | 'upi' | 'wallet';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
