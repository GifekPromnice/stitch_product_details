import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Favorites = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { formatPrice, t } = useSettings();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            if (user) {
                const { data, error } = await supabase
                    .from('favorites')
                    .select('product_id, products(*)')
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error fetching favorites:', error);
                } else {
                    // Map result to flatten structure: products object is in products property
                    setFavoriteProducts(data.map(item => item.products).filter(Boolean));
                }
            } else {
                // Local Storage Fallback
                const savedIds = JSON.parse(localStorage.getItem('favorites') || '[]');
                if (savedIds.length > 0) {
                    const { data } = await supabase
                        .from('products')
                        .select('*')
                        .in('id', savedIds);
                    setFavoriteProducts(data || []);
                } else {
                    setFavoriteProducts([]);
                }
            }
            setLoading(false);
        };

        fetchFavorites();
    }, [user]);

    return (
        <div className="flex flex-col bg-background-light dark:bg-background-dark min-h-screen pb-24 animate-in fade-in duration-500">
            <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-6 pb-2 px-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Favorites</h2>
            </header>

            <main className="flex-1 px-3 pt-2">
                {favoriteProducts.length > 0 ? (
                    <div className="masonry-grid w-full">
                        {favoriteProducts.map(product => (
                            <div key={product.id} className="masonry-item relative group" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                                <div className="bg-white dark:bg-[#2C2E2D] rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                                    <div className="relative aspect-[4/5] mb-2 overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute right-2 top-2 rounded-full p-1.5 bg-white/20 backdrop-blur-md text-red-500">
                                            <span className="material-symbols-outlined text-[16px] fill-[1]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 px-1">
                                        <h3 className="text-primary dark:text-primary text-base font-bold tracking-tight">${product.price.toFixed(2)}</h3>
                                        <p className="text-text-main dark:text-gray-100 text-[13px] font-semibold leading-tight line-clamp-2">{product.title}</p>
                                        <p className="text-text-sub dark:text-gray-400 text-[11px] font-normal mt-0.5">{product.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
                        <div className="size-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">favorite_border</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Items you love will appear here.</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all"
                        >
                            Start Exploring
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Favorites;
