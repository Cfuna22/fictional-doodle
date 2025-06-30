
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 1,
    name: 'Samosas',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop',
    count: 8,
    description: 'Crispy, golden triangular pastries'
  },
  {
    id: 2,
    name: 'Mandazi',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    count: 6,
    description: 'Sweet, fluffy fried doughnuts'
  },
  {
    id: 3,
    name: 'Chips',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    count: 12,
    description: 'Crispy potato chips & fries'
  },
  {
    id: 4,
    name: 'Popcorn',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300&h=200&fit=crop',
    count: 5,
    description: 'Freshly popped corn varieties'
  },
  {
    id: 5,
    name: 'Nuts & Seeds',
    image: 'https://images.unsplash.com/photo-1605819939049-4adc80e0e3c6?w=300&h=200&fit=crop',
    count: 10,
    description: 'Roasted groundnuts & sunflower seeds'
  },
  {
    id: 6,
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=200&fit=crop',
    count: 15,
    description: 'Fresh juices & sodas'
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide variety of fresh snacks, from traditional Kenyan favorites to modern treats
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {category.count} items
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
