import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOverlay from '../components/SearchOverlay';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (e, productId) => {
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const products = [
        { id: 1, title: '1970s Velvet Sofa', price: 450, location: 'Brooklyn, NY', category: 'sofas', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_7CdCHlYZUxXinXnnjQHnTkP3fadL1tXiU0Oa_e5RenGOinu8N3_rGY1BqgmqANZdrxiBNIxCTDXrKt3hjjt155D1_RwGgB3HuisKKSRk1JZgOFRWBW9BBt_hE-MLSAPjSwMqmMQaxEvWsu9n8b8ZaGlRI9BzFJuk_h-W76FR9COf6Tt3Ha-_a3hfBvBxMPVgU6Nabdk55UE5pdlM0AC_uqSUgGfooV_4U0I0fP1dVX5p0mFjRIm_gstDlSUPFjy62rQB4lZHovNP', aspect: '3/4' },
        { id: 2, title: 'Oak Coffee Table', price: 120, location: 'Austin, TX', category: 'tables', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRk6ZkMR7el4beJA8EILmTZr97kl-B3chhZ9H6DiBfcqL8KlB9KUhURhiU9lBVwR0y93TKJfTOaMtnLWpSPajFWB0ORqHdaQldebmOsy4nCjFzpoOkdalCqvFqN90rdx6KJfDZZ20YBpN3GI7HF4YsEpFcW9_k4LL0L2FAZjk8CsjoboPMWj27VPIE-A7Hq65JIkEiiDCU2oORJhzI4I5fMYhqTYPa-WcIOvs36N1yejZkb24AO-y7oQNZ5DaV8PxpoFKwJELknBt5', aspect: '1/1' },
        { id: 3, title: 'Industrial Lamp', price: 45, location: 'Portland, OR', category: 'lighting', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiHEDozq89TyD9zpm9DAO9eEPUjKnTJl97HuP4jdeC2lP27Cc1sZIzzhG9d6yl5mF9NuyhXLtqm7yU97nwoSM1NG75h5S7LhaCxvGvXlnhvYkF0ujVB2Ktb4y6qWZvVVE6R0BmqmdZy3dcsS9UaRwc2bz5z74qSpxRXHDmWf5iY76KSIAllmPvF1mc8faHL31E3n_cV8eOHGu6lV6x2y9U7MZsmGEtt9s4W8G6yR8Zz2oelpHerqal_hoUyQP6o9YaHpFWcFZbSRvK', aspect: '3/5' },
        { id: 4, title: 'Danish Armchair', price: 280, location: 'Seattle, WA', category: 'sofas', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6S7b0zkYnUVsvWGjOMjnrrHGDKpXiDi00ALcCvzdC5Fe4ycpiOWdmRTW3VyQKX6qcVkIJ84NQOjXuhdnxe40UV6R3dMHqIK1yKe9exqJqjVDl-vf93VBcGoF9ARhh3vEq2626tU8FSFM4gHjL1tb6aJbdDyKlSecDWL8irPyEwEhD3DZfQWns47oR0KAIXJEImNP0lqOkIdGvdR-vstaMWkyMlg4c72uUEpGzDlrmIMcIWYxeW3syb-8GFtBBbYaoFC1tt2Z6HJ8k', aspect: '4/5' },
        { id: 5, title: 'Large Monstera', price: 35, location: 'Los Angeles, CA', category: 'plants', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjQh1gVJn_V3FJth3MUfKkh6EnWoiNcBByDF1U9FxUWXMK_IG01wwHI1FzIXiKPsqDFU2qYFcre_02CTisEU7nzVMJCSH9_twhNgk0rXLGy96or8u2il8TfKtq452mLBb5ZLIFJklHQPq0LgxrkKPKLh9Dp-SVRI8UenzpjRvMxt5ReAGP7IkmpT__r8Fr-YRlgfhvUBNzTln_km1KfYRzuUQolI7sYyl2c2H4CCSJXeNfb6Dd4i72rSreLybk3ljjHulWki8S-ygM', aspect: '1/1' },
        { id: 6, title: 'Teak Bookshelf', price: 150, location: 'Chicago, IL', category: 'shelves', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOCuicokfWi5DEcsTTXHxars9-hAmFIuCGAyuLi5goXG1L_SL0tMTsKTSqm2JK1w0Id4POEkgFON71Gq1NfqbD8dQh-pzJTyuw9TvRjpU71sYn1QP-mGo5EUGQqtzB9VyMRlX93Ua5NRLzK-KEzGGkUb1PTzeMjSL7wx7PCBi5rkaZvWKYQ1qU3Ose9sXDNO4K2jf2_u5dGUriA1OISMdk3dbQ_p_eZu-040A94AkYOpi718qr7OEJrLOgqUYCu4VkA-UeqOrhW8Y9', aspect: '3/4' },
    ];

    const categories = ['all', 'new arrivals', 'sofas', 'lighting', 'tables', 'rugs'];

    const filteredProducts = products.filter(p =>
        (activeCategory === 'all' || p.category === activeCategory || activeCategory === 'new arrivals') &&
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                            placeholder="Search vintage chairs..."
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

            <main className="w-full max-w-md mx-auto pt-24 px-3 text-text-main dark:text-gray-100">
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
                            <span className={`text-sm ${activeCategory === cat ? 'font-semibold' : 'font-medium'}`}>{cat}</span>
                        </button>
                    ))}
                </div>

                <div className="masonry-grid w-full">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="masonry-item relative group" onClick={() => navigate(`/product/${product.id}`)}>
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
                                    <h3 className="text-primary dark:text-primary text-base font-bold tracking-tight">${product.price}</h3>
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
