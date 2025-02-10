import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { ProductProvider, useProductContext } from './context/ProductContext';
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import ProductDetail from "./pages/ProductDetails";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from './context/AuthContext';
import ProductManagement from "./pages/ProductManagement";
import CreateProduct from "./pages/CreateProduct";
import AdminLayout from "./components/AdminLayout";
import AboutUs from "./pages/AboutUs";
import ProductListingPage from "./pages/ProductListingPage";
import OfferPage from "./pages/Offers";
import EditProduct from "./components/EditProduct";

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
                            <div className="container mx-auto text-center mt-10">
                                <h3 className="text-lg sm:text-3xl font-bold mb-4">Welcome to MyStore</h3>
                                <p className="text-lg sm:text-xl mb-8">Discover the best deals and amazing products at unbeatable prices.</p>
                            </div>
                            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                                {Array.isArray(products) ? (
                                    products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <p>Loading products...</p> // Or show a fallback UI
                                )}

                            </div>
                            <Testimonials />
                        </>
                    } />

                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route path="/offers" element={<OfferPage />} />


                    {/* Product Detail Page Route */}
                    <Route path="/product/:id" element={
                        <div className="product-detail-page">
                            <ProductDetail />
                        </div>
                    } />


                    <Route path="/login" element={<AdminLogin onSuccess={() => {}}  />} />

                    {/* Admin Routes Wrapped with AdminLayout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="create-product" element={<CreateProduct />} />
                        <Route path="edit-product/:id" element={<EditProduct />} />
                    </Route>
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;