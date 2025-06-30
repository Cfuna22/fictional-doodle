
// import { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Header from '../components/Header';
// import HeroSection from '../components/HeroSection';
// import CategoryGrid from '../components/CategoryGrid';
// import FeaturedSnacks from '../components/FeaturedSnacks';
// import Footer from '../components/Footer';
// import { CartProvider } from '../context/CartContext';
// import { AdminProvider } from '../context/AdminContext';
// import { NotificationProvider } from '../context/NotificationContext';

// const Index = () => {
//   return (
//     <AdminProvider>
//       <CartProvider>
//         <NotificationProvider>
//           <div className="min-h-screen bg-gray-50">
//             <Header />
//             <HeroSection />
//             <CategoryGrid />
//             <FeaturedSnacks />
//             <Footer />
//           </div>
//         </NotificationProvider>
//       </CartProvider>
//     </AdminProvider>
//   );
// };

// export default Index;





import { useEffect, useState } from "react";
import { placeOrder, getSnacks } from "@/services/api";
import { Button } from "@/components/ui/button";

interface Snack {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export default function Index() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch snacks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSnacks();
        setSnacks(data);
      } catch (err) {
        console.error("Failed to fetch snacks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle order placement
  const handleOrder = async (snack: Snack) => {
    setPlacingOrder(true);
    setMessage("");
    try {
      const orderData = {
        customerName: "Test Customer",
        phone: "0712345678",
        address: "Kibra, Nairobi",
        items: [
          {
            snackId: snack._id,
            quantity: 1,
          },
        ],
      };

      const response = await placeOrder(orderData);
      if (response.order) {
        setMessage("✅ Order placed successfully for: " + snack.name);
      } else {
        setMessage("❌ Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error placing order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading snacks...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🍿 Moses Snacks Express</h1>

      {message && <div className="text-center text-green-600 font-medium mb-4">{message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <div
            key={snack._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            {snack.image && (
              <img
                src={snack.image}
                alt={snack.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{snack.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Ksh {snack.price}</p>
            {snack.description && (
              <p className="text-sm text-gray-500 mb-2">{snack.description}</p>
            )}
            <Button
              onClick={() => handleOrder(snack)}
              disabled={placingOrder}
              className="mt-auto"
            >
              {placingOrder ? "Ordering..." : "Order"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
