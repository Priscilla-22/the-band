// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { ProductProvider, useProductContext } from './context/ProductContext';
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import ProductDetail from "./components/ProductDetails";

const App: React.FC = () => {
  return (
      <ProductProvider>
          <Router>
          <MainApp />
          </Router>
      </ProductProvider>
  );
};

const MainApp: React.FC = () => {
  const { products, addToCart, cartCount } = useProductContext();

  return (
      <div className="App">
        <Navbar cartCount={cartCount} />
          <HeroSection />
          <Routes> {/* Routes for the app */}
              {/* Add Route for the homepage */}
              <Route path="/" element={
                  <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {products.map(product => (
                          <ProductCard key={product.id} product={product} addToCart={addToCart} />
                      ))}
                  </main>
              } />

              {/* Add Route for Product Detail Page */}
              <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>

          <Testimonials />
        <Footer />
      </div>
  );
}

export default App;
