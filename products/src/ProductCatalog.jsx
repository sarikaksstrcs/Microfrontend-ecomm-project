import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import eventBus from 'shared/eventBus';
import faker from 'shared/faker';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const generateProducts = () => {
      return Array.from({ length: 12 }, () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(29, 999)),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(300, 300),
        rating: faker.datatype.number({ min: 3, max: 5 }),
        stock: faker.datatype.number({ min: 0, max: 50 }),
      }));
    };
    setProducts(generateProducts());
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    eventBus.emit('cart:add', product);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="card hover:shadow-xl transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="text-xs text-gray-500 mb-1">{product.category}</div>
            <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={
                product.stock > 0 ? 'btn-primary w-full' : 'btn-secondary w-full opacity-50 cursor-not-allowed'
              }
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;