import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the required scales and elements
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Define interfaces directly in the file
interface Sale {
    product_id: number;
    quantity: number;
    revenue: number;
    date: string; // Assuming the API returns a date string
}

interface Inventory {
    product_id: number;
    stock_quantity: number;
    last_updated: string; // Assuming the API returns a date string
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
    const [timePeriod, setTimePeriod] = useState<'7days' | '30days'>('30days');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('auth_token'); // Get token from localStorage
                if (!token) {
                    setMessage('Access denied. Please log in.');
                    return;
                }

                const response = await fetch('http://localhost:5000/admin/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
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
                // Fetch sales data
                const salesResponse = await fetch('http://localhost:5000/api/analytics/sales', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const sales = await salesResponse.json();
                setSalesData(sales);

                // Fetch inventory data
                const inventoryResponse = await fetch('http://localhost:5000/api/analytics/inventory', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const inventory = await inventoryResponse.json();
                setInventoryData(inventory);

                // Fetch product comparison data
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

    // Function to filter and group sales data by day
    const filterAndGroupSalesData = (data: Sale[], period: '7days' | '30days') => {
        const currentDate = new Date();
        const daysToSubtract = period === '7days' ? 7 : 30;
        const startDate = new Date(currentDate.setDate(currentDate.getDate() - daysToSubtract));

        // Filter data to only include the last 7 or 30 days
        const filteredData = data.filter((sale) => {
            const saleDate = new Date(sale.date);
            return saleDate >= startDate;
        });

        // Group data by day
        const groupedData = filteredData.reduce((acc, sale) => {
            const saleDate = new Date(sale.date).toLocaleDateString(); // Group by date string (e.g., "10/15/2023")
            if (!acc[saleDate]) {
                acc[saleDate] = { date: saleDate, revenue: 0 };
            }
            acc[saleDate].revenue += sale.revenue;
            return acc;
        }, {} as { [key: string]: { date: string; revenue: number } });

        // Convert grouped data to an array and sort by date
        const result = Object.values(groupedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // If period is 7 days, ensure only 7 bars are shown
        if (period === '7days' && result.length > 7) {
            return result.slice(-7); // Take the last 7 days
        }

        return result;
    };

    // Function to determine stock status and background color
    const getStockStatus = (stockQuantity: number) => {
        if (stockQuantity > 20) {
            return { status: 'In Stock', color: 'bg-green-100' };
        } else if (stockQuantity > 0) {
            return { status: 'Low Stock', color: 'bg-yellow-100' };
        } else {
            return { status: 'Out of Stock', color: 'bg-red-100' };
        }
    };

    const filteredSalesData = filterAndGroupSalesData(salesData, timePeriod);

    // Prepare data for the Bar Chart
    const barChartData = {
        labels: filteredSalesData.map((item) => item.date),
        datasets: [
            {
                label: 'Revenue ($)',
                data: filteredSalesData.map((item) => item.revenue),
                backgroundColor: '#8884d8',
                borderColor: '#8884d8',
                borderWidth: 1,
            },
        ],
    };

    // Prepare data for the Pie Chart
    const pieChartData = {
        labels: productComparisonData.map((item) => item.product_name),
        datasets: [
            {
                label: 'Total Revenue ($)',
                data: productComparisonData.map((item) => item.total_revenue),
                backgroundColor: productComparisonData.map(
                    () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
                ),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8 mt-20">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            {/* Sales Performance Graph */}
            <div className="mt-8 bg-white shadow-lg rounded-lg">
                <div className="p-4 bg-black text-white rounded-t-lg flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Sales Performance</h2>
                    {/* Filter Toggle for the Bar Chart */}
                    <select
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value as '7days' | '30days')}
                        className="p-2 border rounded bg-gray-700 text-white"
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                    </select>
                </div>
                <div style={{ width: '100%', height: '400px' }}>
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'category',
                                    title: {
                                        display: true,
                                        text: 'Date',
                                    },
                                },
                                y: {
                                    type: 'linear',
                                    title: {
                                        display: true,
                                        text: 'Revenue ($)',
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
                <div className="border-t mt-2 pt-2">
                    <p className="text-sm text-left text-gray-700">
                        This chart shows the total revenue generated from sales over the past 7 or 30 days, depending on your selection.
                    </p>
                    <p className="text-sm text-left text-gray-700 mt-2">
                        Last Updated: {new Date().toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Product Comparison Chart and Inventory Status Table */}
            <div className="mt-8 flex gap-8">
                {/* Product Comparison Chart */}
                <div className="flex-1 bg-white shadow-lg rounded-lg">
                    <div className="p-4 bg-black text-white rounded-t-lg">
                        <h2 className="text-xl font-semibold">Product Comparison</h2>
                    </div>
                    <div style={{ width: '100%', height: '400px' }}>
                        <Pie
                            data={pieChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                    <div className="border-t mt-2 pt-2">
                        <p className="text-sm text-left text-gray-700">
                            This pie chart compares the total revenue generated by each product, allowing you to visualize their contribution.
                        </p>
                        <p className="text-sm text-left text-gray-700 mt-2">
                            Last Updated: {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Inventory Status Table */}
                <div className="flex-1 bg-white shadow-lg rounded-lg">
                    <div className="p-4 bg-black text-white rounded-t-lg">
                        <h2 className="text-xl font-semibold">Inventory Status</h2>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="text-left p-2">Product ID</th>
                                <th className="text-left p-2">Stock</th>
                                <th className="text-left p-2">Last Updated</th>
                                <th className="text-left p-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inventoryData.map((item) => {
                                const { status, color } = getStockStatus(item.stock_quantity);
                                return (
                                    <tr key={item.product_id} className="border-t">
                                        <td className="p-2">{item.product_id}</td>
                                        <td className="p-2">{item.stock_quantity}</td>
                                        <td className="p-2">{item.last_updated}</td>
                                        <td className={`p-2 ${color} text-center rounded`}>{status}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t mt-2 pt-2">
                        <p className="text-sm text-left text-gray-700">
                            This table provides an overview of your product inventory status, including stock levels and the last time they were updated.
                        </p>
                        <p className="text-sm text-left text-gray-700 mt-2">
                            Last Updated: {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
