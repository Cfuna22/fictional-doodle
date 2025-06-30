
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Snack {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  available: boolean;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliveryTime?: string;
  notes?: string;
  createdAt: Date;
}

interface AdminContextType {
  snacks: Snack[];
  orders: Order[];
  addSnack: (snack: Omit<Snack, 'id'>) => void;
  updateSnack: (id: string, updates: Partial<Snack>) => void;
  deleteSnack: (id: string) => void;
  addOrder: (order: Order) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getPopularSnacks: () => Array<{ snack: Snack; orderCount: number }>;
  getTotalRevenue: () => number;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Sample data
const initialSnacks: Snack[] = [
  {
    id: 'snack-1',
    name: 'Crispy Samosas',
    category: 'Savory',
    price: 15,
    image: '/placeholder.svg',
    description: 'Delicious crispy samosas filled with spiced vegetables',
    ingredients: ['Wheat flour', 'Potatoes', 'Peas', 'Spices', 'Oil'],
    available: true
  },
  {
    id: 'snack-2',
    name: 'Sweet Mandazi',
    category: 'Sweet',
    price: 10,
    image: '/placeholder.svg',
    description: 'Traditional Kenyan donuts, soft and sweet',
    ingredients: ['Wheat flour', 'Sugar', 'Coconut milk', 'Cardamom'],
    available: true
  },
  {
    id: 'snack-3',
    name: 'Spiced Popcorn',
    category: 'Snacks',
    price: 20,
    image: '/placeholder.svg',
    description: 'Freshly popped corn with local spices',
    ingredients: ['Corn kernels', 'Salt', 'Spices', 'Oil'],
    available: true
  },
  {
    id: 'snack-4',
    name: 'Banana Chips',
    category: 'Chips',
    price: 25,
    image: '/placeholder.svg',
    description: 'Crispy banana chips made from fresh bananas',
    ingredients: ['Bananas', 'Salt', 'Oil'],
    available: true
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [snacks, setSnacks] = useState<Snack[]>(initialSnacks);
  const [orders, setOrders] = useState<Order[]>([]);

  const addSnack = (snackData: Omit<Snack, 'id'>) => {
    const newSnack: Snack = {
      ...snackData,
      id: `snack-${Date.now()}`
    };
    setSnacks(prev => [...prev, newSnack]);
  };

  const updateSnack = (id: string, updates: Partial<Snack>) => {
    setSnacks(prev => prev.map(snack => 
      snack.id === id ? { ...snack, ...updates } : snack
    ));
  };

  const deleteSnack = (id: string) => {
    setSnacks(prev => prev.filter(snack => snack.id !== id));
  };

  const addOrder = (order: Order): string => {
    setOrders(prev => [...prev, order]);
    return order.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getPopularSnacks = () => {
    const snackCounts: { [key: string]: number } = {};
    
    orders.forEach(order => {
      order.items.forEach(item => {
        snackCounts[item.id] = (snackCounts[item.id] || 0) + item.quantity;
      });
    });

    return snacks
      .map(snack => ({
        snack,
        orderCount: snackCounts[snack.id] || 0
      }))
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5);
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'delivered')
      .reduce((total, order) => total + order.total, 0);
  };

  return (
    <AdminContext.Provider value={{
      snacks,
      orders,
      addSnack,
      updateSnack,
      deleteSnack,
      addOrder,
      updateOrderStatus,
      getPopularSnacks,
      getTotalRevenue
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
