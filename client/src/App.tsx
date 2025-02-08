// src/App.tsx
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { ProductProvider, useProductContext } from './context/ProductContext';
import HeroSection from "./components/HeroSection";

const App: React.FC = () => {
  return (
      <ProductProvider>
        <MainApp />
      </ProductProvider>
  );
};

const MainApp: React.FC = () => {
  const { products, addToCart, cartCount } = useProductContext();

  return (
      <div className="App">
        <Navbar cartCount={cartCount} />
          <HeroSection />
        <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </main>
        <Footer />
      </div>
  );
}

export default App;
