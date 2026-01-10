import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOverlay from '../components/SearchOverlay';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { t, formatPrice } = useSettings();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let data = [];

            // 1. Fetch Products
            if (searchQuery.trim().length > 0) {
                const { data: searchData, error } = await supabase.rpc('search_products', { keyword: searchQuery });
                if (!error) data = searchData || [];
                else console.error("Search error:", error);
            } else {
                const { data: productsData, error } = await supabase.from('products').select('*');
                if (!error) data = productsData || [];
                else console.error('Error fetching products:', error);
            }

            // 2. Fetch Usernames (Join Profiles)
            if (data.length > 0) {
                const userIds = [...new Set(data.map(p => p.user_id).filter(Boolean))];

                if (userIds.length > 0) {
                    const { data: profiles, error: profilesError } = await supabase
                        .from('profiles')
                        .select('id, username')
                        .in('id', userIds);

                    if (!profilesError && profiles) {
                        const userMap = {};
                        profiles.forEach(p => userMap[p.id] = p.username);

                        // Attach username to product
                        data = data.map(p => ({
                            ...p,
                            seller_username: userMap[p.user_id] || 'Unknown User'
                        }));
                    }
                }
            }

            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, [searchQuery]); // Re-run when searchQuery changes

    const categories = ['all', 'new arrivals', 'sofas', 'lighting', 'tables', 'rugs'];

    const getCategoryLabel = (cat) => {
        if (cat === 'all') return t('cat.all');
        if (cat === 'new arrivals') return t('cat.newArrivals');
        return t(`cat.${cat}`);
    };

    const filteredProducts = products.filter(p =>
        (activeCategory === 'all' || p.category === activeCategory || activeCategory === 'new arrivals')
        // Title filtering is now handled by the backend RPC search_products, but we can keep client-side backup/refinement if needed,
        // or rely solely on Supabase for the search part.
        // For 'new arrivals', we might just filter by date in real app, here it's static.
    );

    return (
        <div className="animate-in fade-in duration-500 bg-background-light dark:bg-background-dark">
            <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="flex gap-3 items-center w-full max-w-md mx-auto">
                    <div
                        className="flex-1 h-12 bg-white dark:bg-[#2C2E2D] shadow-soft rounded-full flex items-center px-4 transition-shadow hover:shadow-float group cursor-pointer"
                        onClick={() => setShowSearchOverlay(true)}
                    >
                        <span className="material-symbols-outlined text-text-sub dark:text-gray-400 mr-3">search</span>
                        <input
                            className="flex-1 bg-transparent border-none p-0 text-text-main dark:text-white placeholder:text-text-sub focus:ring-0 text-base font-medium leading-normal cursor-pointer"
                            placeholder={t('home.searchPlaceholder')}
                            type="text"
                            value={searchQuery}
                            readOnly
                        />
                    </div>
                    <button className="shrink-0 h-12 w-12 rounded-full overflow-hidden shadow-soft border-2 border-white dark:border-[#2C2E2D]">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3SyI4DXsM3hsK0ptMgWfsE5n70w88P2IqBSJATriL4gATFuAvat6RQtFttDKgjDzvPQ4N8Z8yJ9-80jBVvj_DqlXvLD_495eGOT7MUOw-ODx5-tfn6z_zJUydvb6doWwEwZArdWikx6zo5IGZOjd-Q8d2l5H1k4ByPMn0MjAunIh1cMRtRubFAzlOxrBbn4kf7zN4g_eU4aw1mE_cALO6UJ97LbWidfHUENIyYySdEDf8OFUu-gX3lI1XwQvTj3WZV7ZT8IR2Si64")' }}></div>
                    </button>
                </div>
            </header>

            <SearchOverlay
                isOpen={showSearchOverlay}
                onClose={() => setShowSearchOverlay(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                products={products}
            />

            <main className="w-full max-w-md mx-auto pt-24 px-3 text-text-main dark:text-gray-100 pb-20">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-3 px-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`shrink-0 h-10 px-5 flex items-center justify-center rounded-full transition-all capitalize ${activeCategory === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-secondary dark:bg-[#2C2E2D] text-primary dark:text-primary-dark border border-transparent hover:bg-primary/10 dark:hover:bg-primary/20'
                                }`}
                        >
                            <span className={`text-sm ${activeCategory === cat ? 'font-semibold' : 'font-medium'}`}>{getCategoryLabel(cat)}</span>
                        </button>
                    ))}
                </div>

                <div className="masonry-grid w-full">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="masonry-item relative group" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                            <div className="bg-white dark:bg-[#2C2E2D] rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                                <div className="relative w-full overflow-hidden rounded-lg mb-2">
                                    <div className="w-full h-auto bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${product.image}")`, aspectRatio: product.aspect }}>
                                    </div>
                                    <button
                                        onClick={(e) => toggleFavorite(e, product.id)}
                                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                    >
                                        <span className={`material-symbols-outlined text-primary text-[20px] transition-all ${favorites.includes(product.id) ? 'font-variation-settings-fill' : 'opacity-70 hover:opacity-100'}`}>favorite</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-0.5 px-1">
                                    <h3 className="text-primary dark:text-primary text-base font-bold tracking-tight">{formatPrice(product.price)}</h3>
                                    <p className="text-text-main dark:text-gray-100 text-[13px] font-semibold leading-tight line-clamp-2">{product.title}</p>
                                    <p className="text-text-sub dark:text-gray-400 text-[11px] font-normal mt-0.5">{product.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
