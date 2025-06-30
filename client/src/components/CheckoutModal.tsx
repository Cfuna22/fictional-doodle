
import { useState } from 'react';
import { X, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete?: () => void;
}

const CheckoutModal = ({ isOpen, onClose, onOrderComplete }: CheckoutModalProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: '',
    notes: ''
  });

  const { cartItems, clearCart, getTotalPrice } = useCart();
  const { addOrder } = useAdmin();
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      customer: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      items: cartItems.map(item => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: getTotalPrice(),
      status: 'pending' as const,
      deliveryTime: customerInfo.deliveryTime,
      notes: customerInfo.notes,
      createdAt: new Date()
    };

    // Add order to admin context
    const orderId = addOrder(order);
    
    // Add notification for admin
    addNotification({
      type: 'order',
      title: 'New Order',
      message: `New order from ${customerInfo.name}`
    });

    // Clear cart and close modal
    clearCart();
    onClose();
    onOrderComplete?.();
    
    // Reset form
    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      deliveryTime: '',
      notes: ''
    });

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order #${orderId} has been received. Moses will contact you soon!`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>KSh {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold">
              Total: KSh {getTotalPrice().toFixed(2)}
            </div>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <span>Full Name *</span>
              </Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                placeholder="e.g. 0725 819198"
                required
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Delivery Address *</span>
              </Label>
              <Textarea
                id="address"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                placeholder="Enter your complete delivery address"
                required
              />
            </div>

            <div>
              <Label htmlFor="deliveryTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Preferred Delivery Time</span>
              </Label>
              <Input
                id="deliveryTime"
                value={customerInfo.deliveryTime}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    deliveryTime: e.target.value,
                  })
                }
                placeholder="e.g. 2:00 PM - 4:00 PM"
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, notes: e.target.value })
                }
                placeholder="Any special instructions for delivery..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Place Order - KSh {getTotalPrice().toFixed(2)}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
