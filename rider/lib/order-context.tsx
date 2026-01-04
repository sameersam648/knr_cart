import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, OrderStatus } from "@/shared/types";
import * as orderService from "./services/order-service";

export interface OrderContextType {
  availableOrders: Order[];
  activeOrder: Order | null;
  completedOrders: Order[];
  isLoading: boolean;
  acceptOrder: (orderId: string) => Promise<void>;
  rejectOrder: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  addMockOrders: () => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const [available, active, completed] = await Promise.all([
        orderService.getAvailableOrders(),
        orderService.getActiveOrder(),
        orderService.getCompletedOrders(),
      ]);

      setAvailableOrders(available);
      setActiveOrder(active);
      setCompletedOrders(completed);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptOrder = async(order Id: string) => {
    try {
      await orderService.acceptOrder(orderId);
      await loadOrders(); // Refresh to get updated state
    } catch (error) {
      console.error('Failed to accept order:', error);
    }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      await orderService.rejectOrder(orderId);
      setAvailableOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error('Failed to reject order:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      await loadOrders(); // Refresh to get updated state
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    const found = availableOrders.find((o) => o.id === orderId);
    if (found) return found;
    if (activeOrder?.id === orderId) return activeOrder;
    return completedOrders.find((o) => o.id === orderId);
  };

  const addMockOrders = async () => {
    try {
      await orderService.addMockOrders();
      await loadOrders();
    } catch (error) {
      console.error('Failed to add mock orders:', error);
    }
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const value: OrderContextType = {
    availableOrders,
    activeOrder,
    completedOrders,
    isLoading,
    acceptOrder,
    rejectOrder,
    updateOrderStatus,
    getOrderById,
    addMockOrders,
    refreshOrders,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
