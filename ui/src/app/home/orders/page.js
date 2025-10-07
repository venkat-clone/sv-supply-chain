"use client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import getOrderStatusStyle,{statusMap} from "@/components/enums/OrderStatusStyle"; // Import the getOrderStatusStyle function

export default function RootLayout({ children }) {
    const { user, loading, logout } = useAuth();

    // Sample order data (replace this with actual API data in real app)
    const [orders, setOrders] = useState([
        {
            id: 1,
            customerName: "Venkatesh Lingampally",
            status: "ENROUTE",
            requestedAt: "2025-09-18T17:52:01.643Z",
            loadTons: 10002,
            fromLocation: { pinCode: "500037", address: "home" },
            toLocation: { pinCode: "500037", address: "home" },
            vehicleAssigned: "N/A",
            driverAssigned: "N/A",
            estimatedDistance: "N/A",
            traveledDistance: "N/A",
            extraDistance: "N/A",
            deliveredAt: "N/A",
            totalCharge: "N/A"
        },
        // Add more sample data if needed
    ]);

    const [filters, setFilters] = useState({
        status: "ENROUTE",
        date: null, // For Date Filter
        search: ""  // For Search
    });

    const [sorting, setSorting] = useState("requestedAt");  // Default to sort by request date

    const handleLogout = () => {
        logout();
    };

    const handleViewProfile = () => {
        alert("View Profile clicked for " + user.name);
    };

    const handleSortChange = (sortBy) => {
        setSorting(sortBy);
    };

    const handleFilterChange = (filterBy) => {
        setFilters({
            ...filters,
            status: filterBy
        });
    };

    const handleSearchChange = (e) => {
        setFilters({
            ...filters,
            search: e.target.value
        });
    };

    const handleDateFilterChange = (e) => {
        setFilters({
            ...filters,
            date: e.target.value
        });
    };

    const filterOrders = () => {
        return orders.filter(order => {
            const matchesStatus = filters.status ? order.status === filters.status : true;
            const matchesSearch = filters.search
                ? order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.fromLocation.address.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.toLocation.address.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.id.toString().includes(filters.search)
                : true;
            const matchesDate = filters.date ? order.requestedAt.startsWith(filters.date) : true;

            return matchesStatus && matchesSearch && matchesDate;
        });
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <img src="/truck.gif" alt="Loading..." className="w-96 h-96" />
        </div>
    );

    return (
        <html lang="en">
        <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
            {/* Order Dashboard */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Order Dashboard</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(statusMap).map(status => (
                        <div className="p-4 bg-white shadow-md rounded-lg" key={status}>
                            <p className="text-lg font-medium text-gray-700">{getOrderStatusStyle(status)}</p>
                            <p className="text-xl font-bold">{filterOrders().filter(order => order.status === status).length}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search and Date Filter */}
            <div className="mb-4 flex justify-between items-center">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer, or Location"
                        className="px-4 py-2 border rounded-md w-80"
                        value={filters.search}
                        onChange={handleSearchChange}
                    />
                    <input
                        type="date"
                        className="px-4 py-2 border rounded-md"
                        value={filters.date || ""}
                        onChange={handleDateFilterChange}
                    />
                </div>
            </div>

            {/* Tabs for Filters */}
            <div className="mb-6">
                <div className="flex space-x-4">
                    {Object.keys(statusMap).map(status => (
                        <Button
                            key={status}
                            onClick={() => handleFilterChange(status)}
                            className={`px-6 py-2 text-sm font-medium rounded-md ${filters.status === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {getOrderStatusStyle(status)}
                        </Button>
                    ))}
                </div>
            </div>
            {/* Orders List */}
            <div className="space-y-4">
                {filterOrders().map(order => (
                    <div key={order.id} className="bg-white shadow-lg p-6 rounded-xl flex justify-between items-start hover:shadow-xl transition duration-300">
                        <div className="flex flex-col w-full space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                                <div className="flex items-center">
                                    {getOrderStatusStyle(order.status)}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Customer:</strong> {order.customerName}</p>
                                <p><strong>From:</strong> {order.fromLocation.pinCode} - {order.fromLocation.address.slice(0, 15)}...</p>
                                <p><strong>To:</strong> {order.toLocation.pinCode} - {order.toLocation.address.slice(0, 15)}...</p>
                                <p><strong>Load:</strong> {order.loadTons} Tons</p>
                                <p><strong>Estimated Distance:</strong> {order.estimatedDistance} km</p>
                            </div>
                        </div>
                        <div className="w-40 flex flex-col items-center justify-between text-sm text-gray-700">
                            <p><strong>Requested:</strong> {new Date(order.requestedAt).toLocaleString()}</p>
                            <p><strong>Total Charge:</strong> <span className="font-semibold text-green-500">{order.totalCharge}</span></p>
                        </div>
                    </div>
                ))}
            </div>


            {/* Page Content */}
            {children}
        </div>
        </body>
        </html>
    );
}
