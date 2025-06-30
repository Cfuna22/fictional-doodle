
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Moses Snacks Express
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <Input
                  type="text"
                  placeholder="Search for snacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  variant="ghost"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                  Home
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                  About
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                  Contact
                </Button>
              </Link>
              <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                Track Order
              </Button>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-orange-600">
                  Home
                </Button>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-orange-600">
                  About
                </Button>
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-orange-600">
                  Contact
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-orange-600">
                Track Order
              </Button>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
