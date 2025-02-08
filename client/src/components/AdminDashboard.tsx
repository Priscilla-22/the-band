import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import DashboardCharts from './DashboardCharts'; // Import DashboardCharts component

interface Sale {
    product_id: number;
    quantity: number;
    revenue: number;
    date: string;
}

interface Inventory {
    product_id: number;
    stock_quantity: number;
    last_updated: string;
}

interface ProductComparison {
    product_id: number;
    product_name: string;
    total_sales: number;
    total_revenue: number;
}

const AdminDashboard: React.FC = () => {
    const [message, setMessage] = useState('');
    const [salesData, setSalesData] = useState<Sale[]>([]);
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
    const [productComparisonData, setProductComparisonData] = useState<ProductComparison[]>([]);
    const [timePeriod, setTimePeriod] = useState<'7days' | '30days' | 'year'>('30days');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    setMessage('Access denied. Please log in.');
                    return;
                }

                const response = await fetch('http://localhost:5000/admin/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                } else {
                    setMessage('Access denied. Please log in.');
                }
            } catch (err) {
                setMessage('Error fetching dashboard data.');
            }
        };

        fetchDashboard();
    }, []);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) return;

            try {
                const salesResponse = await fetch('http://localhost:5000/api/analytics/sales', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const sales = await salesResponse.json();
                setSalesData(sales);

                const inventoryResponse = await fetch('http://localhost:5000/api/analytics/inventory', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const inventory = await inventoryResponse.json();
                setInventoryData(inventory);

                const comparisonResponse = await fetch('http://localhost:5000/api/analytics/product-comparison', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const comparison = await comparisonResponse.json();
                setProductComparisonData(comparison);
            } catch (err) {
                console.error('Error fetching analytics data:', err);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="flex">

            <div className="flex-1 p-8 mt-20 ">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>

                {/* Pass all necessary data to the DashboardCharts component */}
                <DashboardCharts
                    salesData={salesData.map((sale) => ({ date: sale.date, revenue: sale.revenue }))}
                    productComparisonData={productComparisonData.map((item) => ({
                        product_name: item.product_name,
                        total_revenue: item.total_revenue,
                    }))}
                    inventoryData={inventoryData} // Pass inventory data here
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
