import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const MyListings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { formatPrice } = useSettings();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'sold'

    useEffect(() => {
        const fetchMyListings = async () => {
            if (!user) return;
            setLoading(true);
            try {
                // Fetch products and count favorites (viewers/observers)
                const { data, error } = await supabase
                    .from('products')
                    .select('*, favorites(count)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Process the data to flatten counts
                const processedListings = data.map(product => ({
                    ...product,
                    observerCount: product.favorites?.[0]?.count || 0,
                    // Mock views and likes for now if not in DB, but observerCount is real
                    views: Math.floor(Math.random() * 200) + 10,
                }));

                setListings(processedListings);
            } catch (err) {
                console.error("Error fetching my listings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, [user]);

    const activeListings = listings.filter(l => l.status !== 'sold');
    const soldListings = listings.filter(l => l.status === 'sold');
    const currentListings = activeTab === 'active' ? activeListings : soldListings;

    const handleMarkSold = async (id, e) => {
        e.stopPropagation();
        if (!confirm("Mark this item as sold?")) return;
        try {
            const { error } = await supabase.from('products').update({ status: 'sold' }).eq('id', id);
            if (error) throw error;
            // Update local state
            setListings(prev => prev.map(l => l.id === id ? { ...l, status: 'sold' } : l));
        } catch (err) {
            alert("Error updating status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this listing? This cannot be undone.")) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setListings(prev => prev.filter(l => l.id !== id));
        } catch (err) {
            console.error("Error deleting listing:", err);
            alert("Failed to delete listing.");
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-text-main dark:text-gray-100 selection:bg-primary selection:text-black animate-in fade-in duration-500">
            {/* Top App Bar */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/profile')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
                        </button>
                        <h1 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">My Listings</h1>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 px-4 pb-24 overflow-y-auto no-scrollbar">
                {/* Segmented Controls / Tabs */}
                <div className="mt-4 mb-6">
                    <div className="flex p-1 bg-[#e4e4dd] dark:bg-surface-dark rounded-full">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`flex-1 py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${activeTab === 'active' ? 'bg-primary shadow-sm text-black' : 'text-text-secondary dark:text-gray-400 hover:text-text-main'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setActiveTab('sold')}
                            className={`flex-1 py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${activeTab === 'sold' ? 'bg-primary shadow-sm text-black' : 'text-text-secondary dark:text-gray-400 hover:text-text-main'}`}
                        >
                            Sold
                        </button>
                    </div>
                </div>

                {/* Listings Feed */}
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <div className="text-center py-10 opacity-50">Loading your listings...</div>
                    ) : currentListings.length === 0 ? (
                        <div className="text-center py-10 opacity-50">
                            <p>No {activeTab} listings found.</p>
                            <button onClick={() => navigate('/add-listing')} className="mt-4 text-primary font-bold">Create a new listing</button>
                        </div>
                    ) : (
                        currentListings.map(item => (
                            <article
                                key={item.id}
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="group relative bg-surface-light dark:bg-[#2C2E2D] rounded-2xl p-3 shadow-sm border border-black/5 dark:border-white/5 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                <div className="flex gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url('${item.image}')` }}></div>
                                        {item.status === 'active' && (
                                            <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-green-700 dark:text-primary">
                                                Live
                                            </div>
                                        )}
                                        {item.status === 'pending' && (
                                            <div className="absolute top-2 left-2 bg-orange-100 dark:bg-orange-900/50 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                                                Pending
                                            </div>
                                        )}
                                        {item.status === 'sold' && (
                                            <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                                                Sold
                                            </div>
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="flex flex-col flex-1 justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-base leading-tight text-text-main dark:text-white line-clamp-2 pr-2">{item.title}</h3>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                    className="text-gray-400 hover:text-red-500 -mt-1 -mr-1 p-1 rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                            <p className="text-text-secondary dark:text-gray-400 text-sm mt-1">
                                                {item.views} views • {item.observerCount} observers
                                            </p>
                                        </div>
                                        <div className="flex items-end justify-between mt-2">
                                            <span className="text-lg font-bold text-text-main dark:text-primary">{formatPrice(item.price)}</span>
                                            {/* Quick Actions */}
                                            <div className="flex gap-2">
                                                {item.status !== 'sold' && (
                                                    <>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); navigate('/add-listing', { state: { product: item } }); }}
                                                            aria-label="Edit"
                                                            className="h-9 w-9 flex items-center justify-center rounded-full bg-background-light dark:bg-white/10 text-text-main dark:text-white border border-black/5 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); alert("Boost feature coming soon!"); }}
                                                            aria-label="Boost Listing"
                                                            className="h-9 px-3 flex items-center justify-center rounded-full bg-primary text-black font-medium text-sm gap-1 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                                            <span className="material-symbols-outlined filled text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                                            <span>Boost</span>
                                                        </button>
                                                    </>
                                                )}
                                                {item.status === 'active' && (
                                                    <button
                                                        onClick={(e) => handleMarkSold(item.id, e)}
                                                        className="h-9 px-3 flex items-center justify-center rounded-full bg-background-light dark:bg-white/10 text-xs font-semibold hover:bg-gray-200">
                                                        Mark Sold
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
                {/* Bottom padding for scroll */}
                <div className="h-10"></div>
            </main>
        </div>
    );
};

export default MyListings;
