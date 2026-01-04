import { Order, OrderItem, OrderStatus } from '@/types';

const mockItems: Record<string, OrderItem[]> = {
  order1: [
    { id: 'item1', menuItemId: 'menu1', name: 'Margherita Pizza', quantity: 1, price: 12.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item2', menuItemId: 'menu2', name: 'Caesar Salad', quantity: 2, price: 8.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item3', menuItemId: 'menu3', name: 'Garlic Bread', quantity: 1, price: 4.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order2: [
    { id: 'item4', menuItemId: 'menu4', name: 'Grilled Salmon', quantity: 1, price: 18.99, specialInstructions: 'No lemon', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item5', menuItemId: 'menu5', name: 'Mashed Potatoes', quantity: 1, price: 5.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item6', menuItemId: 'menu6', name: 'Steamed Broccoli', quantity: 1, price: 6.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order3: [
    { id: 'item7', menuItemId: 'menu7', name: 'Chicken Burger', quantity: 2, price: 11.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item8', menuItemId: 'menu8', name: 'French Fries', quantity: 2, price: 3.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item9', menuItemId: 'menu9', name: 'Soft Drink', quantity: 2, price: 2.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order4: [
    { id: 'item10', menuItemId: 'menu10', name: 'Pad Thai', quantity: 1, price: 13.99, specialInstructions: 'Extra spicy', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item11', menuItemId: 'menu11', name: 'Spring Rolls', quantity: 1, price: 5.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order5: [
    { id: 'item12', menuItemId: 'menu12', name: 'Sushi Platter', quantity: 1, price: 24.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item13', menuItemId: 'menu13', name: 'Miso Soup', quantity: 1, price: 4.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order6: [
    { id: 'item14', menuItemId: 'menu14', name: 'Veggie Wrap', quantity: 1, price: 9.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item15', menuItemId: 'menu15', name: 'Smoothie Bowl', quantity: 1, price: 7.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order7: [
    { id: 'item16', menuItemId: 'menu16', name: 'BBQ Ribs', quantity: 1, price: 22.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'item17', menuItemId: 'menu17', name: 'Coleslaw', quantity: 1, price: 4.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  order8: [
    { id: 'item18', menuItemId: 'menu18', name: 'Pasta Carbonara', quantity: 1, price: 14.99, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
};

const customerNames = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emma Davis',
  'Robert Wilson',
  'Lisa Anderson',
  'James Martinez',
  'Jennifer Taylor',
  'David Brown',
  'Ashley Garcia',
];

// New workflow statuses
const allStatuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered'];

/**
 * Generate mock orders for testing with realistic distribution
 */
export function generateMockOrders(count: number = 8): Order[] {
  const orders: Order[] = [];
  const now = new Date();

  // Predefined orders with specific statuses for testing
  const predefinedOrders: Array<{ status: OrderStatus; offsetMinutes?: number; offsetHours?: number }> = [
    { status: 'pending', offsetMinutes: 5 },
    { status: 'pending', offsetMinutes: 12 },
    { status: 'confirmed', offsetMinutes: 18 },
    { status: 'preparing', offsetMinutes: 25 },
    { status: 'ready', offsetMinutes: 35 },
    { status: 'delivered', offsetHours: 2 },
    { status: 'delivered', offsetHours: 5 },
    { status: 'delivered', offsetHours: 24 },
  ];

  for (let i = 0; i < count; i++) {
    const items = mockItems[`order${(i % 8) + 1}`] || mockItems.order1;
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const tax = subtotal * 0.1;
    const deliveryFee = 5.99;
    const totalAmount = subtotal + tax + deliveryFee;

    const predefined = predefinedOrders[i] || { status: 'pending' as OrderStatus, offsetMinutes: 10 };

    let createdAt: Date;
    if (predefined.offsetHours !== undefined) {
      createdAt = new Date(now.getTime() - predefined.offsetHours * 60 * 60 * 1000);
    } else {
      const minutes = predefined.offsetMinutes || 10;
      createdAt = new Date(now.getTime() - minutes * 60 * 1000);
    }

    orders.push({
      id: `order_${1000 + i}`,
      customerId: `cust_${i + 1}`,
      customerName: customerNames[i % customerNames.length],
      customerPhone: `+91 ${String(98000 + i * 111).padStart(5, '0')} ${String(10000 + i * 789).padStart(5, '0')}`,
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      deliveryFee,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      status: predefined.status,
      orderType: 'quick',
      deliveryAddress: `${123 + i} Main Street, Apartment ${i + 1}`,
      createdAt: createdAt.toISOString(),
      updatedAt: new Date(createdAt.getTime() + 2 * 60 * 1000).toISOString(),
      specialInstructions: i % 3 === 0 ? 'Please ring doorbell twice' : undefined,
      estimatedPrepTime: 15 + (i * 5),
    });
  }

  // Sort by created date (newest first)
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get a single mock order by ID
 */
export function getMockOrderById(orderId: string): Order | undefined {
  const orders = generateMockOrders(10);
  return orders.find(order => order.id === orderId);
}
