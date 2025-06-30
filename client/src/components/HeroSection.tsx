
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
            Fresh Snacks
            <span className="block text-yellow-200">Delivered Fast</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            From crispy samosas to sweet mandazi, we deliver your favorite Kenyan snacks 
            right to your doorstep. Fresh, fast, and always delicious!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8"
              onClick={scrollToCategories}
            >
              Order Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8"
              onClick={scrollToCategories}
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
