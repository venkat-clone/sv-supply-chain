"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Truck, User, LogOut} from "lucide-react";
import React from "react";
import {useAuth} from "@/hooks/useAuth";
import Link from "next/link";

export default function HomeScreen() {
    const {user, loading, logout} = useAuth();

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <img src="/truck.gif" alt="Loading..." className="w-96 h-96"/>
        </div>
    );


    const handleLogout = () => {
        logout();
    };

    const handleViewProfile = () => {
        // Navigate to profile page or open modal
        alert("View Profile clicked for " + user.name);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="relative  rounded-xl overflow-hidden mb-8 shadow-lg ">
                <img
                    src="/international-logistics.1.14.avif"
                    alt="Truck Background"
                    className="w-full h-96 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-start p-8">
                    <div>
                        <h1 className="text-5xl font-bold text-white drop-shadow-md">
                            Your Trusted Logistics Partner
                        </h1>
                        <p className="text-xl text-white mt-3 max-w-md">
                            Streamline your shipping with reliable and efficient services. Book loads today for seamless
                            logistics management.
                        </p>
                        <Button
                            className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-md transition-all">
                            Book Your Load
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-800 font-semibold">
                            <div className="flex items-center gap-2">
                                <Truck className="w-6 h-6 text-blue-600"/>
                                My Orders
                            </div>
                            <div className="ml-auto">
                                <Link href={'/home/orders'}>
                                    <span className="text-blue-600 font-semibold">View All</span>
                                </Link>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Truck className="w-5 h-5 mr-2 text-gray-500"/>
                                    <span className="text-gray-700">Order #12456</span>
                                </div>
                                <span className="text-green-600 font-semibold">In Transit</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Truck className="w-5 h-5 mr-2 text-gray-500"/>
                                    <span className="text-gray-700">Order #48780</span>
                                </div>
                                <span className="text-yellow-600 font-semibold">Pending</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-800">
                            <Truck className="w-6 h-6 text-blue-600"/>
                            Track Order
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Tracking Number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg transition-colors">
                                Track
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-800">
                            <Truck className="w-6 h-6 text-blue-600"/>
                            Contact Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Need assistance? Our team is here to help with any queries or issues.
                            </p>
                            <Button
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg transition-colors">
                                Contact Support
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}