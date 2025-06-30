
import { useState } from 'react';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminHeader from '../components/AdminHeader';
import { useAdmin } from '../context/AdminContext';
import { formatDistanceToNow } from 'date-fns';

const AdminDashboard = () => {
  const { orders, snacks, updateOrderStatus } = useAdmin();
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = snacks.length;
  const availableProducts = snacks.filter(p => p.available).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingOrders.length} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All time earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {availableProducts} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 10).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.phone}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-lg">KSh {order.total}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                      
                      <div className="flex gap-2 mt-2">
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'preparing')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start Preparing
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'out_for_delivery')}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Out for Delivery
                          </Button>
                        )}
                        {order.status === 'out_for_delivery' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, 'delivered')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Mark Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
