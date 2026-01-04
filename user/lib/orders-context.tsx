import React, { createContext, useContext, useEffect, useState } from "react";
import { Order, CartItem } from "@/shared/types";
import * as orderService from "./services/order-service";

interface OrdersContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, deliveryAddress: string) => Promise<void>;
  getOrders: () => Order[];
  isLoading: boolean;
  refreshOrders: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const fetchedOrders = await orderService.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (items: CartItem[], total: number, deliveryAddress: string) => {
    try {
      // Calculate breakdown (matching cart context logic)
      const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
      const tax = Math.round(subtotal * 0.05);
      const deliveryFee = 50;

      const newOrder = await orderService.createOrder({
        customerId: "user-1", // TODO: Get from auth context
        customerName: "Guest User", // TODO: Get from auth context
        items,
        subtotal,
        tax,
        deliveryFee,
        deliveryAddress,
        orderType: "quick",
      });

      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  };

  const getOrders = () => {
    return orders;
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const value = {
    orders,
    addOrder,
    getOrders,
    isLoading,
    refreshOrders,
  };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
