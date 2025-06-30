
import { Users, Heart, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Moses Snacks Express
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with passion for delivering fresh, authentic Kenyan snacks 
            right to your doorstep. We're more than just a delivery service - 
            we're your neighborhood snack specialists.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Moses Snacks Express was born from Moses Ochieng's love for traditional 
              Kenyan snacks and his desire to share these delicious treats with his community. 
              What started as a small local operation has grown into a trusted name for 
              fresh, quality snacks delivered with care.
            </p>
            <p className="text-gray-600 mb-4">
              Every samosa, mandazi, and crispy chip is prepared with authentic recipes 
              passed down through generations. We believe that great snacks bring people 
              together, and we're honored to be part of your daily moments of joy.
            </p>
            <p className="text-gray-600">
              Today, we serve customers across Nairobi with the same commitment to 
              quality and freshness that started it all. When you order from Moses 
              Snacks Express, you're not just getting snacks - you're getting a 
              piece of Kenyan culinary tradition.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-24 w-24 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Family-Owned</h3>
              <p className="text-gray-600">
                A small business with big dreams, serving our community one snack at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We use only the freshest ingredients and traditional recipes to ensure 
                every bite is as delicious as homemade.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Your time is precious. We deliver fresh snacks quickly so you can 
                enjoy them at their best.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
              <p className="text-gray-600">
                We're proud to serve our local community and support other small 
                businesses in our supply chain.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Moses Section */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Moses Ochieng</h2>
              <p className="text-gray-600 mb-4">
                The founder and heart of Moses Snacks Express, Moses brings over 10 years 
                of experience in the food industry and an unwavering commitment to quality. 
                His passion for authentic Kenyan flavors drives everything we do.
              </p>
              <p className="text-gray-600 mb-6">
                "Every order that goes out represents our promise to deliver not just snacks, 
                but happiness. I personally ensure that every customer receives the same 
                quality I would serve to my own family."
              </p>
              <blockquote className="text-lg italic text-orange-600 border-l-4 border-orange-600 pl-4">
                "Great snacks bring people together, and we're honored to be part of your daily moments of joy."
              </blockquote>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Users className="h-32 w-32 mx-auto mb-4" />
                <p className="text-lg">Moses Ochieng</p>
                <p className="text-sm">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-orange-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Our Snacks?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied customers who trust Moses Snacks Express 
            for their daily snack needs.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8"
          >
            Order Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
