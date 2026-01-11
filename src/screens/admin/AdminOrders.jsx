import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSettings } from '../../context/SettingsContext.jsx';

const AdminOrders = () => {
    const { formatPrice } = useSettings();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
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

            // 3. Apply Search (on ID only initially)
            if (searchQuery) {
                // Search by ID only for DB query, precise list filtering later if needed
                // Note using text cast for bigint ID
                query = query.or(`id.eq.${searchQuery}`); // Strict ID search if number?
                // Or let's try casting
                // query = query.filter('id', 'eq', searchQuery); 
                // Actually simplified: if numeric search ID, else wait for client side?
                // Let's assume ID search for now.
            }

            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data: ordersData, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;

            let enrichedOrders = ordersData || [];

            if (enrichedOrders.length > 0) {
                // 4. Fetch User Profiles
                const userIds = [...new Set(enrichedOrders.map(o => o.user_id))];
                const { data: profilesData } = await supabase
                    .from('profiles')
                    .select('id, email, full_name, username')
                    .in('id', userIds);

                // 5. Fetch Product Details
                const productIds = [...new Set(enrichedOrders.map(o => o.product_id).filter(Boolean))];
                const { data: productsData } = await supabase
                    .from('products')
                    .select('id, title, price, image')
                    .in('id', productIds);


                // Join data
                enrichedOrders = enrichedOrders.map(order => {
                    const profile = profilesData?.find(p => p.id === order.user_id);
                    const product = productsData?.find(p => p.id === order.product_id);
                    return {
                        ...order,
                        user_email: profile?.email || 'Unknown',
                        user_name: profile?.full_name || profile?.username || 'Anonymous',
                        product_title: product?.title || 'Unknown Product',
                        product_image: product?.image,
                        product_price: product?.price
                    };
                });
            }

            // CLIENT SIDE SEARCH FILTER for Product Name or User Name
            if (searchQuery) {
                const lowerQ = searchQuery.toLowerCase();
                // If the search wasn't an ID match (which would return data), we might need to filter manually?
                // But wait, we applied ID search at DB level.
                // If we want to search by Product Name, we can't do it easily at DB level without Joins.
                // Strategy: For MVP, since pagination is server side, this is tricky.
                // Revert to: Search ID only at DB level.
                // If user wants search by Name, we might need a join or RPC.
                // For now, let's stick to ID search in the input logic.
                // OR: if we really want, fetch more and filter.
            }

            setOrders(enrichedOrders);
            setTotalCount(count || 0);

        } catch (err) {
            console.error("Error fetching orders:", err);
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
                        placeholder="Search by Order ID..."
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
                                                #{order.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{order.user_name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium tracking-tight">{order.user_email}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {formatPrice(order.amount)}
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
                                                        {/* Product Details (Single Item) */}
                                                        <div className="flex-1">
                                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Ordered Item</h4>
                                                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                                                {order.product_image && (
                                                                    <img src={order.product_image} alt={order.product_title} className="w-16 h-16 rounded object-cover border border-gray-100" />
                                                                )}
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900">{order.product_title}</p>
                                                                    <p className="text-xs text-gray-500">Price: {formatPrice(order.product_price)}</p>
                                                                    <div className="flex gap-2 mt-1">
                                                                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">Payment: {order.payment_method}</span>
                                                                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">Delivery: {order.delivery_method}</span>
                                                                    </div>
                                                                </div>
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
                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-500">
                        Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalCount)} of {totalCount} orders
                    </p>
                    <div className="flex gap-1">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>

                        <div className="w-8 h-8 flex items-center justify-center rounded bg-[#698679] text-white font-bold text-xs shadow-sm">{page}</div>

                        <button
                            disabled={page * itemsPerPage >= totalCount}
                            onClick={() => setPage(p => p + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                        >
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
