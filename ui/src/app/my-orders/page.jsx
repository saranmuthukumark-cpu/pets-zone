"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function MyOrders() {
    const [dbOrders, setDbOrders] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders");
                const result = await response.json();

                if (user && user.name) {
                    const accountName = user.name.trim().toLowerCase();
                    const userOrders = result.filter(order =>
                        order.name && order.name.trim().toLowerCase() === accountName
                    );
                    setDbOrders(userOrders);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                setLoading(false);
            }
        };
        if (user) {
            fetchOrders();
        }
    }, [user]);


    if (!isAuthenticated && !user) {
        return <div className="text-center mt-20 text-xl font-bold text-[#7f5539]">Please login to view your orders.</div>;
    }

    const completedCount = dbOrders.filter((o) => o.status === "Completed").length;
    const pendingCount = dbOrders.filter((o) => o.status !== "Completed").length;

    return (
        <div className="flex min-h-screen bg-white">
            <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
                <h1 className="text-3xl text-[#7f5539] font-bold mb-6 flex items-center  gap-3 pb-4">
                   My Orders:
                </h1>

                <div className="bg-[#fff2ee] p-6 rounded-2xl mb-10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-[#7f5539]/20 text-[#7f5539] p-6 rounded-xl text-center font-medium shadow-sm">
                            <p className="text-sm">Total Orders</p>
                            <p className="text-3xl font-bold mt-2">{dbOrders.length}</p>
                        </div>
                        <div className="bg-white border border-[#7f5539]/20 text-[#7f5539] p-6 rounded-xl text-center font-medium shadow-sm">
                            <p className="text-sm">Completed Orders</p>
                            <p className="text-3xl font-bold mt-2">{completedCount}</p>
                        </div>
                        <div className="bg-white border border-[#7f5539]/20 text-[#7f5539] p-6 rounded-xl text-center font-medium shadow-sm">
                            <p className="text-sm">Pending Orders</p>
                            <p className="text-3xl font-bold mt-2">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-lg mt-20 text-[#7f5539] font-bold animate-pulse">
                        Loading your orders...
                    </p>
                ) : dbOrders.length > 0 ? (
                    <div className="space-y-12">
                        {dbOrders.map((order) => {
                            const subtotal = order?.items?.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0) || 0;
                            const actualTax = subtotal * 0.05;

                            return (
                                <div key={order._id} className="bg-[#fff2ee] p-6 md:p-8 rounded-2xl shadow-md  mx-auto">
                                    <div className="flex flex-col md:flex-row justify-between items-center mb-6  pb-4 gap-4 border-b border-[#7f5539]/20">
                                        <h2 className="text-2xl text-[#7f5539] font-bold">Order Details</h2>
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-bold border ${order.status === "Completed"
                                                ? " text-green-600 bg-green-50 border-green-500"
                                                : " text-yellow-600 bg-yellow-50 border-yellow-500"
                                                }`}>
                                            {order.status === "Completed" ? "Completed" : "Pending / Incomplete"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 mb-8 border-b border-[#7f5539]/20 pb-8">
                                        <div>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">Customer:</strong> <span className="capitalize">{order.name}</span>
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">Phone:</strong> {order.phone}
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">Method:</strong> {order.paymentMethod}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">Address:</strong> {order.address}
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">City:</strong> {order.city}
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-[#7f5539]">Date:</strong>{" "}
                                                {order.createdAt
                                                    ? new Date(order.createdAt).toLocaleString('en-IN', {
                                                        dateStyle: 'medium',
                                                        timeStyle: 'short'
                                                    })
                                                    : "Unknown"}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#7f5539] mb-4">
                                        Purchased Items ({order.items?.length || 0}):
                                    </h3>
                                    
                                    <div className="space-y-3 mb-8">
                                        {order.items && order.items.length > 0 ? (
                                            <>
                                                {order.items.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                        <span className="font-semibold text-gray-800 text-lg">
                                                            {item.name}{" "}
                                                            <span className="text-[#7f5539] font-bold ml-2">
                                                                (x{item.quantity})
                                                            </span>
                                                        </span>
                                                        <span className="font-bold text-xl text-[#7f5539]">
                                                            ₹{(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}

                                                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                    <span className="font-semibold text-gray-800 text-lg">TAX (5%)</span>
                                                    <span className="font-bold text-xl text-[#7f5539]">
                                                        ₹{actualTax.toFixed(2)}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 italic">No items found</p>
                                        )}
                                    </div>

                                    <div className="flex justify-end items-center border-t border-[#7f5539]/20 pt-6">
                                        <p className="font-bold text-2xl text-[#7f5539]">
                                            Total: ₹{(order.totalAmount || (actualTax + subtotal)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300 py-16">
                        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-xl font-medium">No orders found.</p>
                        <Link href="/livestocks">
                           <button className="mt-6 bg-[#7f5539] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#6a462f]">
                             Start Shopping
                           </button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
