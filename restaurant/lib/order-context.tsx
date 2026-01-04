import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/shared/types';
import * as orderService from './services/order-service';

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  removeOrder: (orderId: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getActiveOrders: () => Order[];
  getCompletedOrders: () => Order[];
  refreshOrders: () => Promise<void>;
  addMockOrder: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders on app start
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (order: Order) => {
    // Not implemented for restaurant app (orders come from customers)
    console.warn('addOrder not implemented for restaurant app');
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      // Update local state optimistically
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  };

  const removeOrder = async (orderId: string) => {
    // Not commonly used for restaurant app
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const addMockOrder = async () => {
    try {
      const newOrder = await orderService.addMockOrder();
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    } catch (error) {
      console.error('Failed to add mock order:', error);
    }
  };

  const getActiveOrders = () => {
    return orders.filter(
      (order) => !['delivered', 'cancelled', 'refunded'].includes(order.status)
    );
  };

  const getCompletedOrders = () => {
    return orders.filter((order) => order.status === 'delivered');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        addOrder,
        updateOrderStatus,
        removeOrder,
        getOrderById,
        getActiveOrders,
        getCompletedOrders,
        refreshOrders,
        addMockOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
