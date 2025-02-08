import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { ProductProvider, useProductContext } from './context/ProductContext';
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import ProductDetail from "./components/ProductDetails";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <ProductProvider>
            <AuthProvider> {/* Wrap the whole app in AuthProvider so that `useAuth` can be used globally */}
                <Router>
                    <MainApp />
                </Router>
            </AuthProvider>
        </ProductProvider>
    );
};

const MainApp: React.FC = () => {
    const { products, addToCart, cartCount } = useProductContext();

    return (
        <div className="App">
            <Navbar cartCount={cartCount} />

            <Routes>
                {/* Homepage Route (with HeroSection, Product Card grid, and Testimonials) */}
                <Route path="/" element={
                    <>
                        <HeroSection />
                        <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product}  />
                            ))}
                        </main>
                        <Testimonials />
                    </>
                } />

                {/* Product Detail Page Route (without HeroSection or Testimonials, directly below Navbar) */}
                <Route path="/product/:id" element={
                    <div className="product-detail-page">
                        <ProductDetail />
                    </div>
                } />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
