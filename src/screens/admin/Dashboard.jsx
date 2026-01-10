import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSettings } from '../../context/SettingsContext';

const Dashboard = () => {
    const { formatPrice } = useSettings();
    const [stats, setStats] = useState([
        { label: 'Total Listings', value: '...', trend: '...', icon: 'chair', color: 'emerald' },
        { label: 'Total Users', value: '...', trend: '...', icon: 'group', color: 'emerald' },
        { label: 'Total Transactions', value: '...', trend: '...', icon: 'payments', color: 'emerald' },
        { label: 'Listings Today', value: '...', trend: '...', icon: 'add_circle', color: 'emerald', trendIcon: 'trending_up', isTextTrend: true },
        { label: 'New Users Today', value: '...', trend: '...', icon: 'person_add', color: 'emerald', trendIcon: 'trending_up', isTextTrend: true },
        { label: 'Transactions Today', value: '...', trend: '...', icon: 'shopping_bag', color: 'amber', trendIcon: 'trending_flat', isTextTrend: true },
    ]);
    const [recentListings, setRecentListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayISO = today.toISOString();

                // 1. Fetch Totals
                const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
                const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
                const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

                // 2. Fetch Daily Stats
                const { count: productsToday } = await supabase.from('products').select('*', { count: 'exact', head: true }).gt('created_at', todayISO);
                const { count: ordersToday } = await supabase.from('orders').select('*', { count: 'exact', head: true }).gt('created_at', todayISO);

                // 3. Fetch Recent Listings
                const { data: listings } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                const formattedListings = listings?.map(item => ({
                    id: item.id,
                    item: item.title,
                    seller: 'User ' + (item.user_id ? item.user_id.slice(0, 4) : 'Unknown'),
                    price: formatPrice(item.price),
                    status: 'Live',
                    time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                })) || [];

                setRecentListings(formattedListings);

                setStats([
                    { label: 'Total Listings', value: productsCount || 0, trend: '', icon: 'chair', color: 'emerald' },
                    { label: 'Total Users', value: usersCount || 0, trend: '', icon: 'group', color: 'emerald' },
                    { label: 'Total Transactions', value: ordersCount || 0, trend: '', icon: 'payments', color: 'emerald' },
                    { label: 'Listings Today', value: productsToday || 0, trend: 'since midnight', icon: 'add_circle', color: 'emerald', trendIcon: 'trending_up', isTextTrend: true },
                    { label: 'New Users Today', value: '-', trend: 'Data unavailable', icon: 'person_add', color: 'gray', trendIcon: 'remove', isTextTrend: true },
                    { label: 'Transactions Today', value: ordersToday || 0, trend: 'since midnight', icon: 'shopping_bag', color: 'amber', trendIcon: 'trending_flat', isTextTrend: true },
                ]);

            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [formatPrice]);

    return (
        <div className="p-8 md:p-12 animate-in fade-in duration-500">
            {/* Header */}
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1 text-[#1A1A1A]">Overview</h1>
                    <p className="text-[#666666]">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-200 px-4 py-2.5 rounded-full flex items-center gap-2 font-medium hover:bg-gray-50 transition-all text-[#1A1A1A]">
                        <span className="material-symbols-outlined text-xl">calendar_today</span>
                        Last 30 Days
                    </button>
                    <button className="bg-[#698679] text-white px-6 py-2.5 rounded-full flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-[#698679]/20">
                        <span className="material-symbols-outlined text-xl">file_download</span>
                        Export
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[24px] shadow-sm border border-transparent hover:border-[#698679] transition-all group cursor-default">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#6986791a] flex items-center justify-center text-[#698679]">
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            {!stat.isTextTrend && (
                                <span className={`bg-${stat.color}-50 text-${stat.color}-600 px-2 py-1 rounded-lg text-xs font-bold`}>
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <h3 className="text-[#666666] font-medium mb-1">{stat.label}</h3>
                        <p className="text-4xl font-bold tracking-tight text-[#1A1A1A]">{stat.value}</p>

                        {stat.isTextTrend && (
                            <div className={`mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600`}>
                                <span className="material-symbols-outlined text-sm">{stat.trendIcon}</span>
                                {stat.trend}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Recent Listings Table */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Listings</h2>
                    <button className="text-[#698679] text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[#666666] text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">Item</th>
                                <th className="px-6 py-4">Seller</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentListings.map((listing) => (
                                <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">{listing.item}</td>
                                    <td className="px-6 py-4 text-[#1A1A1A]">{listing.seller}</td>
                                    <td className="px-6 py-4 text-[#1A1A1A]">{listing.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${listing.status === 'Live' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                            {listing.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#666666]">{listing.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
