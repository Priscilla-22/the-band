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
import ProductManagement from "./components/ProductManagement";
import CreateProduct from "./components/CreateProduct";
import AdminLayout from "./components/AdminLayout";
import AboutUs from "./components/AboutUs"; // Import the AdminLayout component

const App: React.FC = () => {
    return (
        <ProductProvider>
            <AuthProvider>
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
        <div className="App flex flex-col min-h-screen">
            <Navbar cartCount={cartCount} />

            {/* Main Content */}
            <main className="flex-grow">
                <Routes>
                    {/* Homepage Route */}
                    <Route path="/" element={
                        <>
                            <HeroSection />
                            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <Testimonials />
                        </>
                    } />

                    <Route path="/about" element={<AboutUs />} />  {/* Add About Us route */}


                    {/* Product Detail Page Route */}
                    <Route path="/product/:id" element={
                        <div className="product-detail-page">
                            <ProductDetail />
                        </div>
                    } />

                    {/* Admin Login Route */}
                    <Route path="/login" element={<AdminLogin />} />

                    {/* Admin Routes Wrapped with AdminLayout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="create-product" element={<CreateProduct />} /> {/* Add Create Product Route */}

                        {/* Add more admin routes here */}
                    </Route>
                </Routes>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default App;