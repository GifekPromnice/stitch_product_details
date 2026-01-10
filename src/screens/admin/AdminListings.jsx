import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSettings } from '../../context/SettingsContext';

const AdminListings = () => {
    const { formatPrice } = useSettings();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [totalCount, setTotalCount] = useState(0);

    const fetchListings = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('products')
                .select('*', { count: 'exact' });

            // Filters
            if (filterStatus !== 'All Status') {
                query = query.eq('status', filterStatus.toLowerCase()); // active, pending, sold, blocked
            }
            if (filterCategory !== 'All Categories') {
                query = query.eq('category', filterCategory.toLowerCase());
            }
            if (searchQuery) {
                // Simple search on title or description. For strict requirements we might need .or()
                // Assuming 'search_products' RPC is for frontend search, here we can use simple ILIKE for admin
                query = query.ilike('title', `%${searchQuery}%`);
            }

            // Pagination
            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;

            setListings(data);
            setTotalCount(count);

        } catch (err) {
            console.error("Error fetching listings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [page, filterStatus, filterCategory]); // Search is triggered manually usually or debounced, here attached to Enter or button? Let's add Apply button.

    // Handle Search Apply
    const handleApplyFilters = () => {
        setPage(1);
        fetchListings();
    };

    // Actions
    const handleStatusChange = async (id, newStatus) => {
        if (!confirm(`Are you sure you want to set status to ${newStatus}?`)) return;

        try {
            const { error } = await supabase
                .from('products')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchListings(); // Refresh
        } catch (err) {
            alert("Error updating status: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(`Are you sure you want to delete this listing?`)) return;
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchListings();
        } catch (err) {
            alert("Error deleting: " + err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-50 text-green-700';
            case 'pending': return 'bg-yellow-50 text-yellow-700';
            case 'sold': return 'bg-slate-100 text-slate-600';
            case 'blocked': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusDot = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'pending': return 'bg-yellow-500';
            case 'sold': return 'bg-slate-400';
            case 'blocked': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="p-8 md:p-12 animate-in fade-in duration-500 max-w-[1440px] mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Listings Management</h1>

                {/* Filters */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[280px]">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search Listings</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-[#698679] transition-all outline-none"
                                placeholder="Search by title..."
                            />
                        </div>
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-50 border-none rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-[#698679] outline-none cursor-pointer"
                        >
                            <option>All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="sold">Sold</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-50 border-none rounded-2xl ring-1 ring-gray-200 focus:ring-2 focus:ring-[#698679] outline-none cursor-pointer"
                        >
                            <option>All Categories</option>
                            <option value="sofas">Sofas</option>
                            <option value="chairs">Chairs</option>
                            <option value="tables">Tables</option>
                            <option value="lighting">Lighting</option>
                            <option value="plants">Plants</option>
                            <option value="shelves">Shelves</option>
                        </select>
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date Range</label>
                        <button className="w-full py-3 px-4 bg-gray-50 border-none rounded-2xl ring-1 ring-gray-200 text-left text-gray-600 flex justify-between items-center text-sm">
                            Last 30 Days
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>
                    </div>
                    <button
                        onClick={handleApplyFilters}
                        className="bg-[#698679] hover:opacity-90 text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#698679]/20"
                    >
                        <span className="material-symbols-outlined">filter_list</span>
                        Apply
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Listing</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Seller</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Posted</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-10 text-center text-gray-500">Loading listings...</td></tr>
                            ) : listings.length === 0 ? (
                                <tr><td colSpan="6" className="p-10 text-center text-gray-500">No listings found.</td></tr>
                            ) : (
                                listings.map((listing) => (
                                    <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img alt={listing.title} className="w-full h-full object-cover" src={listing.image || 'https://via.placeholder.com/150'} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#1A1A1A] group-hover:text-[#698679] transition-colors line-clamp-1 max-w-[200px]">{listing.title}</p>
                                                    <p className="text-xs text-gray-400 mt-1">ID: #{listing.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-[#698679] flex items-center justify-center text-[10px] text-white font-bold">
                                                    U
                                                </div>
                                                <span className="text-sm font-medium text-[#1A1A1A]">User {listing.user_id ? listing.user_id.slice(0, 4) : 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-bold text-[#1A1A1A]">{formatPrice(listing.price)}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm text-gray-500">{new Date(listing.created_at).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(listing.status || 'active')}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getStatusDot(listing.status || 'active')}`}></span>
                                                {(listing.status || 'active').charAt(0).toUpperCase() + (listing.status || 'active').slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Edit (Mock) */}
                                                <button className="p-2 text-gray-400 hover:text-[#698679] hover:bg-gray-100 rounded-lg transition-all" title="Edit">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>

                                                {/* Block/Unblock */}
                                                {listing.status === 'blocked' ? (
                                                    <button
                                                        onClick={() => handleStatusChange(listing.id, 'active')}
                                                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Unblock"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">lock_open</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusChange(listing.id, 'blocked')}
                                                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-gray-100 rounded-lg transition-all" title="Block"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">block</span>
                                                    </button>
                                                )}

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(listing.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all" title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-bold text-[#1A1A1A]">{listings.length > 0 ? (page - 1) * itemsPerPage + 1 : 0}-{Math.min(page * itemsPerPage, totalCount)}</span> of <span className="font-bold text-[#1A1A1A]">{totalCount}</span> listings
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        {/* Simplified Pagination: just prev/current/next for now */}
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#698679] text-white font-bold">{page}</button>

                        <button
                            disabled={page * itemsPerPage >= totalCount}
                            onClick={() => setPage(p => p + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminListings;
