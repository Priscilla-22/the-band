import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the required chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DashboardChartsProps {
    salesData: { date: string; revenue: number }[];
    productComparisonData: { product_name: string; total_revenue: number }[];
    inventoryData: { product_id: number; stock_quantity: number; last_updated: string }[];
    timePeriod: '7days' | '30days' | 'year'; // Add 'year' option
    setTimePeriod: (timePeriod: '7days' | '30days' | 'year') => void; // Update type
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
                                                             salesData,
                                                             productComparisonData,
                                                             inventoryData,
                                                             timePeriod,
                                                             setTimePeriod,
                                                         }) => {
    // Filter sales data based on the selected time period
    const filteredSalesData = React.useMemo(() => {
        switch (timePeriod) {
            case '7days':
                return salesData.slice(-7); // Show last 7 days
            case '30days':
                return salesData.slice(-30); // Show last 30 days
            case 'year':
                return salesData; // Show all data for the year
            default:
                return salesData;
        }
    }, [salesData, timePeriod]);

    // Prepare data for the Bar Chart (Sales Performance)
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

    // Prepare data for the Pie Chart (Product Comparison)
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

    return (
        <div>
            {/* Sales Performance Graph */}
            <div className="mt-8 bg-white shadow-lg rounded-lg">
                <div className="p-4 bg-black text-white rounded-t-lg flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Sales Performance</h2>
                    <select
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value as '7days' | '30days' | 'year')}
                        className="p-2 border rounded bg-gray-700 text-white"
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="year">Year</option> {/* Add this option */}
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
                        This chart shows the total revenue generated from sales over the past{' '}
                        {timePeriod === '7days' ? '7 days' : timePeriod === '30days' ? '30 days' : 'year'}, depending on your selection.
                    </p>
                    <p className="text-sm text-left text-gray-700 mt-2">
                        Last Updated: {new Date().toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Product Comparison Chart */}
            <div className="mt-8 flex-1 bg-white shadow-lg rounded-lg">
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
            <div className="mt-8 bg-white shadow-lg rounded-lg">
                <div className="p-4 bg-black text-white rounded-t-lg">
                    <h2 className="text-xl font-semibold">Inventory Status</h2>
                </div>
                <div className="p-4">
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
    );
};

export default DashboardCharts;