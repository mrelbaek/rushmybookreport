'use client';

// lib/local-storage-db.ts
// This is a simple client-side storage solution for demo purposes
// In a production app, you would use a real database like Supabase

export interface BookReport {
  id: string;
  bookTitle: string;
  author: string;
  level: string;
  length: number;
  rush: boolean;
  email: string;
  sampleText?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reportText?: string;
  createdAt: string;
  completedAt?: string;
  stripeSessionId?: string;
}

const STORAGE_KEY = 'rushmybookreport_orders';

/**
 * Saves an order to local storage
 */
export function saveOrder(order: Omit<BookReport, 'id' | 'createdAt'>): BookReport {
  // Generate a random ID
  const id = 'order_' + Math.random().toString(36).substring(2, 9);
  
  // Create the full order object
  const fullOrder: BookReport = {
    ...order,
    id,
    createdAt: new Date().toISOString(),
  };
  
  // Get existing orders
  const existingOrders = getOrders();
  
  // Add the new order
  const updatedOrders = [...existingOrders, fullOrder];
  
  // Save to local storage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  }
  
  return fullOrder;
}

/**
 * Gets all orders from local storage
 */
export function getOrders(): BookReport[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const ordersJson = localStorage.getItem(STORAGE_KEY);
  
  if (!ordersJson) {
    return [];
  }
  
  try {
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error('Error parsing orders from local storage:', error);
    return [];
  }
}

/**
 * Gets an order by ID from local storage
 */
export function getOrderById(id: string): BookReport | null {
  const orders = getOrders();
  return orders.find(order => order.id === id) || null;
}

/**
 * Updates an order in local storage
 */
export function updateOrder(id: string, updates: Partial<BookReport>): BookReport | null {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return null;
  }
  
  // Create updated order
  const updatedOrder = {
    ...orders[orderIndex],
    ...updates,
  };
  
  // Update the orders array
  orders[orderIndex] = updatedOrder;
  
  // Save to local storage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }
  
  return updatedOrder;
}

/**
 * Marks an order as completed with the report text
 */
export function completeOrder(id: string, reportText: string): BookReport | null {
  return updateOrder(id, {
    status: 'completed',
    reportText,
    completedAt: new Date().toISOString(),
  });
}

/**
 * Clears all orders from local storage (for testing)
 */
export function clearOrders(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}