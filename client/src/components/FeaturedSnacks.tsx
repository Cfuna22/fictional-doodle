
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';

const featuredSnacks = [
  {
    id: 1,
    name: 'Beef Samosa',
    price: 25,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    description: 'Crispy triangular pastry filled with spiced beef and vegetables',
    category: 'Samosas',
    available: true
  },
  {
    id: 2,
    name: 'Sweet Mandazi',
    price: 15,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    description: 'Traditional sweet fried doughnut, perfect with tea or coffee',
    category: 'Mandazi',
    available: true
  },
  {
    id: 3,
    name: 'Masala Chips',
    price: 80,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Golden fries seasoned with aromatic spices and served hot',
    category: 'Chips',
    available: true
  },
  {
    id: 4,
    name: 'Caramel Popcorn',
    price: 40,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop',
    description: 'Sweet and crunchy popcorn coated in rich caramel',
    category: 'Popcorn',
    available: true
  },
  {
    id: 5,
    name: 'Roasted Groundnuts',
    price: 30,
    image: 'https://images.unsplash.com/photo-1605819939049-4adc80e0e3c6?w=400&h=300&fit=crop',
    description: 'Fresh groundnuts roasted to perfection with a hint of salt',
    category: 'Nuts & Seeds',
    available: true
  },
  {
    id: 6,
    name: 'Fresh Mango Juice',
    price: 60,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop',
    description: 'Freshly squeezed mango juice, no artificial flavors',
    category: 'Drinks',
    available: true
  }
];

const FeaturedSnacks = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (snack: typeof featuredSnacks[0]) => {
    addToCart({
      id: snack.id,
      name: snack.name,
      price: snack.price,
      image: snack.image,
      quantity: 1
    });
    
    toast({
      title: "Added to cart!",
      description: `${snack.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Featured Snacks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try our most popular snacks, loved by customers across the city
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSnacks.map((snack) => (
            <Card 
              key={snack.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!snack.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {snack.name}
                    </h3>
                    <span className="text-lg font-bold text-orange-600">
                      KSh {snack.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {snack.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {snack.category}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(snack)}
                      disabled={!snack.available}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSnacks;
