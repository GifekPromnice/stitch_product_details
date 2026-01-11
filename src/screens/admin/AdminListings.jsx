import { useState, useEffect, useRef } from 'react';
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
    const [dbError, setDbError] = useState(false);

    // Bulk Actions State
    const [selectedIds, setSelectedIds] = useState([]);

    // Debounce Search
    const [debouncedSearch, setDebouncedSearch] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch Listings
    const fetchListings = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            let query = supabase
                .from('products')
                .select('*', { count: 'exact' });

            // Filters
            // Defense: Only apply status filter if it's not the default
            // If the column doesn't exist, this will cause error 42703
            if (filterStatus !== 'All Status') {
                query = query.eq('status', filterStatus.toLowerCase());
            }

            if (filterCategory !== 'All Categories') {
                query = query.eq('category', filterCategory.toLowerCase());
            }

            if (debouncedSearch) {
                query = query.ilike('title', `%${debouncedSearch}%`);
            }

            // Pagination
            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data: productsData, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) {
                console.error("Listings fetch error:", error);
                if (error.code === '42703') {
                    setDbError(true);
                }
                throw error;
            }

            setDbError(false);

            // Fetch Profiles manually
            if (productsData && productsData.length > 0) {
                const userIds = [...new Set(productsData.map(p => p.user_id).filter(Boolean))];
                if (userIds.length > 0) {
                    const { data: profilesData, error: profilesError } = await supabase
                        .from('profiles')
                        .select('id, full_name, username')
                        .in('id', userIds);

                    const profileMap = {};
                    if (!profilesError && profilesData) {
                        profilesData.forEach(p => {
                            profileMap[p.id] = p.username ? `${p.username} (${p.full_name || ''})` : (p.full_name || 'Anonymous');
                        });
                    }

                    const productsWithNames = productsData.map(p => ({
                        ...p,
                        sellerName: profileMap[p.user_id] || 'Unknown User'
                    }));
                    setListings(productsWithNames || []);
                } else {
                    setListings(productsData.map(p => ({ ...p, sellerName: 'Unknown User' })));
                }
            } else {
                setListings([]);
            }

            setTotalCount(count || 0);

        } catch (err) {
            console.error("Error in fetchListings:", err);
            setListings([]);
        } finally {
            setLoading(false);
        }
    };

    // Main Effect
    useEffect(() => {
        fetchListings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filterStatus, filterCategory, debouncedSearch]);


    // Handle Selection
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(listings.map(l => l.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Actions
    const updateStatus = async (idOrIds, newStatus) => {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
        if (!confirm(`Update status to ${newStatus} for ${ids.length} item(s)?`)) return;

        try {
            const { error } = await supabase
                .from('products')
                .update({ status: newStatus })
                .in('id', ids);

            if (error) throw error;
            fetchListings();
            setSelectedIds([]);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const deleteItems = async (idOrIds) => {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
        if (!confirm(`Delete ${ids.length} item(s) permanently?`)) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .in('id', ids);

            if (error) throw error;
            fetchListings();
            setSelectedIds([]);
        } catch (err) {
            alert("Error: " + err.message);
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
        <div className="p-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Listings Management</h1>
                        <p className="text-sm text-gray-500">Manage, moderate and filter all marketplace listings.</p>
                    </div>
                    {dbError && (
                        <div className="flex-1 max-w-md p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 animate-in fade-in slide-in-from-right-2">
                            <span className="material-symbols-outlined text-red-500">warning</span>
                            <div className="text-[11px]">
                                <p className="font-bold">Schema Fix Required</p>
                                <p className="opacity-90">Please run <code className="bg-red-100 px-1 rounded">FIX_DATABASE_COLUMNS.sql</code> in Supabase.</p>
                            </div>
                        </div>
                    )}
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-1 bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg shadow-lg animate-in slide-in-from-bottom-2">
                            <span className="text-[11px] font-bold px-2 border-r border-gray-700 mr-1">{selectedIds.length} Selected</span>
                            <button onClick={() => updateStatus(selectedIds, 'active')} className="text-[11px] font-bold hover:bg-white/10 px-2.5 py-1 rounded transition">Activate</button>
                            <button onClick={() => updateStatus(selectedIds, 'pending')} className="text-[11px] font-bold hover:bg-white/10 px-2.5 py-1 rounded transition">Suspend</button>
                            <button onClick={() => updateStatus(selectedIds, 'blocked')} className="text-[11px] font-bold hover:bg-white/10 px-2.5 py-1 rounded transition">Block</button>
                            <div className="h-4 w-px bg-gray-700 mx-1"></div>
                            <button onClick={() => deleteItems(selectedIds)} className="p-1 px-2 hover:bg-red-500/20 text-red-400 rounded transition" title="Delete Selected">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg p-3 border border-gray-200 flex flex-wrap items-center gap-3 shadow-sm">
                    <div className="flex-1 min-w-[280px] relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] focus:border-[#698679] transition-all outline-none text-sm"
                            placeholder="Search by title..."
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            setPage(1);
                        }}
                        className="py-2 pl-3 pr-10 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] outline-none cursor-pointer text-sm"
                    >
                        <option>All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    <select
                        value={filterCategory}
                        onChange={(e) => {
                            setFilterCategory(e.target.value);
                            setPage(1);
                        }}
                        className="py-2 pl-3 pr-10 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-[#698679] outline-none cursor-pointer text-sm"
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
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        checked={listings.length > 0 && selectedIds.length === listings.length}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 text-[#698679] focus:ring-[#698679] transition cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Listing</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Seller</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-10 text-center text-gray-400">
                                    <div className="flex justify-center items-center gap-2">
                                        <span className="material-symbols-outlined animate-spin">refresh</span> Loading listings...
                                    </div>
                                </td></tr>
                            ) : listings.length === 0 ? (
                                <tr><td colSpan="6" className="p-10 text-center text-gray-400 font-medium">No listings found matching your filters.</td></tr>
                            ) : (
                                listings.map((listing) => (
                                    <tr
                                        key={listing.id}
                                        className={`hover:bg-gray-50/50 transition-colors group ${selectedIds.includes(listing.id) ? 'bg-[#69867910]' : ''}`}
                                    >
                                        <td className="px-6 py-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(listing.id)}
                                                onChange={() => handleSelectOne(listing.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#698679] focus:ring-[#698679] transition cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden border border-gray-100">
                                                    <img alt={listing.title} className="w-full h-full object-cover" src={listing.image || 'https://via.placeholder.com/150'} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 line-clamp-1 max-w-[240px]">{listing.title}</p>
                                                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-wider">ID: #{listing.id ? String(listing.id).slice(0, 8) : 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold uppercase border border-indigo-100">
                                                    {listing.sellerName ? String(listing.sellerName).slice(0, 1) : 'U'}
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">{listing.sellerName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">{formatPrice(listing.price)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(listing.status || 'active')}`}>
                                                {listing.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                {listing.status === 'blocked' ? (
                                                    <button
                                                        onClick={() => updateStatus(listing.id, 'active')}
                                                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-all" title="Unblock"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">lock_open</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateStatus(listing.id, 'blocked')}
                                                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-100/20 rounded transition-all" title="Block"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">block</span>
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => deleteItems(listing.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all" title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
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
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-500">
                        Showing {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalCount)} of {totalCount} listings
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

export default AdminListings;
