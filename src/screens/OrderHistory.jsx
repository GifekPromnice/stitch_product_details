import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const OrderHistory = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t, currency } = useSettings();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            try {
                // 1. Fetch Orders
                const { data: ordersData, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                let enrichedOrders = ordersData || [];

                if (enrichedOrders.length > 0) {
                    // 2. Fetch Product Details
                    const productIds = [...new Set(enrichedOrders.map(o => o.product_id).filter(Boolean))];

                    if (productIds.length > 0) {
                        const { data: productsData } = await supabase
                            .from('products')
                            .select('id, title, price, image')
                            .in('id', productIds);

                        // Join product data
                        enrichedOrders = enrichedOrders.map(order => {
                            const product = productsData?.find(p => p.id === order.product_id);
                            return {
                                ...order,
                                product_title: product?.title || 'Unknown Product',
                                product_image: product?.image,
                                product_price: product?.price
                            };
                        });
                    }
                }

                setOrders(enrichedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'delivered': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-neutral-900 dark:text-gray-100 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center gap-4 px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-200 dark:border-white/10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold">Order History</h1>
            </header>

            <main className="p-4 max-w-md mx-auto">
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-neutral-400">receipt_long</span>
                        </div>
                        <h3 className="text-lg font-bold">No orders yet</h3>
                        <p className="text-neutral-500 max-w-[200px]">Looks like you haven't placed any orders yet.</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-[#232524] rounded-2xl p-4 shadow-sm border border-neutral-100 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-medium">Order #{order.id}</span>
                                        <span className="text-sm font-semibold mt-1">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t border-neutral-100 dark:border-neutral-700 py-3 flex gap-3">
                                    {order.product_image && (
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                            <img src={order.product_image} alt={order.product_title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">{order.product_title}</p>
                                        <p className="text-sm text-neutral-500 mt-1">Qty: 1</p>
                                    </div>
                                </div>

                                <div className="border-t border-neutral-100 dark:border-neutral-700 pt-3 flex justify-between items-center">
                                    <span className="text-sm font-medium text-neutral-500">Total Amount</span>
                                    <span className="text-lg font-bold text-primary">
                                        {formatPrice(order.amount)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrderHistory;
