"use client";
import {Button} from "@/components/ui/button";
import {LogOut, User} from "lucide-react";
import React from "react";
import {useAuth} from "@/hooks/useAuth";

export default function RootLayout({ children }) {
    const { user, loading, logout } = useAuth();

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <img src="/truck.gif" alt="Loading..." className="w-96 h-96" />
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

            <html lang="en">
            <body
                className={``}
            >
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
                {/* Header */}
                <div className="flex justify-between  items-center mb-8 border-b pb-4">
                    <h1
                        className="text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                        tabIndex={0}
                        role="link"
                        aria-label="Go to homepage"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        onKeyDown={(e) =>
                            e.key === "Enter" && window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        SV Supply Chain
                    </h1>
                    <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">
            Hello, {(user?.name||'').split(" ")[0]}!
          </span>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleViewProfile}
                                className="flex items-center gap-2 hover:bg-gray-100"
                            >
                                <User className="w-4 h-4" />
                                View Profile
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="flex items-center gap-2 hover:bg-red-100 text-red-600"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            {children}
            </div>
            </body>
            </html>

    );
}
