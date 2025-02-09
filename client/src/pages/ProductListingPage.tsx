import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProductContext } from '../context/ProductContext';

const ProductListingPage: React.FC = () => {
    console.log("ProductListingPage rendered");

    const { products } = useProductContext();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'priceLowToHigh' | 'priceHighToLow' | 'name'>('priceLowToHigh');
    const [filterBy, setFilterBy] = useState<string>('');

    // Filter and sort products
    const filteredAndSortedProducts = React.useMemo(() => {
        let filteredProducts = products;

        if (filterBy) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(filterBy.toLowerCase())
            );
        }

        switch (sortBy) {
            case 'priceLowToHigh':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'priceHighToLow':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'name':
                return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return filteredProducts;
        }
    }, [products, sortBy, filterBy]);

    return (
        <div className="relative w-full min-h-screen flex flex-col">

            <div
                className="absolute inset-0 bg-cover bg-center blur-lg"
                style={{ backgroundImage: `url('/images/rrrb.jpg')` }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content Container */}
            <div className="relative container mx-auto p-8 mt-24 flex-grow pb-40">
                {/* Filter and Sort Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    {/* Filter by Name */}
                    <div className="mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            className="p-2 border rounded-lg w-full md:w-64"
                        />
                    </div>

                    {/* Sort Options */}
                    <div className="mb-4 md:mb-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'priceLowToHigh' | 'priceHighToLow' | 'name')}
                            className="p-2 border rounded-lg"
                        >
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="name">Name</option>
                        </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg`}
                        >
                            <i className="fas fa-th"></i> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg`}
                        >
                            <i className="fas fa-list"></i> List
                        </button>
                    </div>
                </div>

                {/* Product Listing */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8' : 'space-y-8 mb-56'}>
                    {filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} isProductListingPage={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
