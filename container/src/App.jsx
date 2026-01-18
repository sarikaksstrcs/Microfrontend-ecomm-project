import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ShoppingCart, User, Package, Menu, X, Home } from 'lucide-react';

// Lazy load microfrontends
const ProductCatalog = lazy(() => import('productCatalog/ProductCatalog'));
const ShoppingCartMFE = lazy(() => import('shoppingCart/ShoppingCart'));
const UserProfile = lazy(() => import('userProfile/UserProfile'));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductCatalog />
          </Suspense>
        );
      case 'cart':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ShoppingCartMFE />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <UserProfile />
          </Suspense>
        );
      default:
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Welcome to MicroStore</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Microfrontend E-Commerce Experience
            </p>
            <button
              onClick={() => setCurrentView('products')}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">MicroStore</h1>

            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{renderView()}</main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2025 MicroStore - Built with Microfrontend Architecture</p>
        </div>
      </footer>
    </div>
  );
};

export default App;