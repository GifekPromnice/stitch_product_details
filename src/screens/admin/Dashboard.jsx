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
        <div className="p-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1 text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500">Welcome back, here's what's happening on the platform.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all text-gray-700 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        Last 30 Days
                    </button>
                    <button className="bg-[#698679] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#567065] transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        Export Data
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#698679] transition-all group flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#698679] border border-gray-100">
                                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                            </div>
                            {stat.isTextTrend ? (
                                <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.label.includes('Transactions') ? 'text-amber-600' : 'text-emerald-600'} uppercase tracking-wider`}>
                                    <span className="material-symbols-outlined text-[14px]">{stat.trendIcon}</span>
                                    {stat.trend.split(' ')[0]}
                                </div>
                            ) : (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</span>
                            )}
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Listings Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-base font-bold text-gray-900">Recent Listings Activity</h2>
                    <button className="text-[#698679] text-xs font-bold hover:bg-[#69867910] px-3 py-1.5 rounded-md transition-all">View All Activity</button>
                </div>
                <div className="overflow-x-auto text-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-widest border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Item Name</th>
                                <th className="px-6 py-3">Seller</th>
                                <th className="px-3 py-3">Price</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentListings.map((listing) => (
                                <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">{listing.item}</td>
                                    <td className="px-6 py-4 text-gray-600">{listing.seller}</td>
                                    <td className="px-3 py-4 font-bold text-gray-900">{listing.price}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${listing.status === 'Live' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            {listing.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-xs text-gray-400 font-medium">{listing.time}</td>
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
