import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSettings } from '../../context/SettingsContext';

const AdminOrders = () => {
    const { formatPrice } = useSettings();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const [totalCount, setTotalCount] = useState(0);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const [updatingStatus, setUpdatingStatus] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // 1. Build base query
            let query = supabase
                .from('orders')
                .select('*', { count: 'exact' });

            // 2. Apply Status Filter
            if (filterStatus !== 'All Statuses') {
                query = query.eq('status', filterStatus.toLowerCase());
            }

            // 3. Apply Search
            // Search is tricky because User info is in a different table and Items are in JSONB.
            // Simplified Strategy:
            // - If query looks like UUID -> search ID.
            // - If query is text -> search items JSONB.
            // - For User search, we technically need to search profiles first, but for MVP we might rely on Client Side match if list is small, or skip user search on server side for now unless we do joined query.
            if (searchQuery) {
                // Check if simple text search on ID or Items
                // Note: searching inside JSONB with 'ilike' requires casting to text
                query = query.or(`id.ilike.%${searchQuery}%,items.ilike.%${searchQuery}%`);
            }

            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data: ordersData, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;

            // 4. Fetch User Profiles for these orders
            if (ordersData && ordersData.length > 0) {
                const userIds = [...new Set(ordersData.map(o => o.user_id))];
                const { data: profilesData } = await supabase
                    .from('profiles')
                    .select('id, email, full_name, username')
                    .in('id', userIds);

                // Join data
                const enrichedOrders = ordersData.map(order => {
                    const profile = profilesData?.find(p => p.id === order.user_id);
                    return {
                        ...order,
                        user_email: profile?.email || 'Unknown',
                        user_name: profile?.full_name || profile?.username || 'Anonymous'
                    };
                });
                setOrders(enrichedOrders);
            } else {
                setOrders([]);
            }

            setTotalCount(count || 0);

        } catch (err) {
            console.error("Error fetching orders:", err);
            // alert("Error fetching orders. Ensure you have run the RLS policy SQL in Supabase Dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchOrders();
        }, 500); // Debounce
        return () => clearTimeout(timer);
    }, [searchQuery, filterStatus, page]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        setUpdatingStatus(orderId);
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Optimistic update
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert("Failed to update status: " + err.message);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const toggleExpand = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="p-8 animate-in fade-in duration-500">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-sm text-gray-500">Track and manage customer orders.</p>
            </header>

            {/* Filters */}
            <section className="bg-white border border-gray-200 rounded-lg p-3 mb-6 flex flex-wrap items-center gap-3 shadow-sm">
                <div className="relative flex-1 min-w-[240px]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 text-sm border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] focus:border-[#698679] border transition-all"
                        placeholder="Search by Order ID or Item Name..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="text-sm border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] focus:border-[#698679] py-2 pr-10 pl-3 bg-white"
                    >
                        <option>All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </section>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Customer</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && orders.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                        <span>Loading orders...</span>
                                    </div>
                                </td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-medium">No orders found.</td></tr>
                            ) : (
                                orders.map((order) => (
                                    <>
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                                #{order.id.slice(0, 8).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{order.user_name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium tracking-tight">{order.user_email}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {formatPrice(order.total_amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toggleExpand(order.id)}
                                                    className="text-gray-400 hover:text-[#698679] font-medium text-xs flex items-center justify-end gap-1 ml-auto"
                                                >
                                                    {expandedOrderId === order.id ? 'Collapse' : 'Details'}
                                                    <span className={`material-symbols-outlined text-[16px] transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}>expand_more</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedOrderId === order.id && (
                                            <tr className="bg-gray-50/50">
                                                <td colSpan="6" className="px-6 py-4">
                                                    <div className="flex gap-8">
                                                        {/* Items List */}
                                                        <div className="flex-1">
                                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Order Items</h4>
                                                            <div className="space-y-3">
                                                                {order.items && order.items.map((item, idx) => (
                                                                    <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                                                        {item.image && (
                                                                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover border border-gray-100" />
                                                                        )}
                                                                        <div>
                                                                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                                                            <p className="text-xs text-gray-500">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Status Controls */}
                                                        <div className="w-64 shrink-0">
                                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Update Status</h4>
                                                            <div className="flex flex-col gap-2">
                                                                {['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(status => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => handleStatusUpdate(order.id, status)}
                                                                        disabled={updatingStatus === order.id || order.status === status}
                                                                        className={`text-left px-3 py-2 rounded text-xs font-medium border transition-colors flex items-center justify-between ${order.status === status
                                                                            ? 'bg-[#698679] text-white border-[#698679]'
                                                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                                            }`}
                                                                    >
                                                                        <span className="uppercase">{status}</span>
                                                                        {order.status === status && <span className="material-symbols-outlined text-[14px]">check</span>}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Simplified) */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-xs text-gray-500">Page {page}</span>
                    <button
                        disabled={orders.length < itemsPerPage}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
