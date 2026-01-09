import { useState } from 'react';

const SearchOverlay = ({ isOpen, onClose, searchQuery, setSearchQuery, products = [] }) => {
    if (!isOpen) return null;

    const categories = [
        { name: 'Sofas', icon: 'chair' },
        { name: 'Lamps', icon: 'table_lamp' },
        { name: 'Kitchens', icon: 'countertops' },
        { name: 'Drawers', icon: 'shelves' },
        { name: 'Wardrobes', icon: 'door_sliding' },
        { name: 'Tables', icon: 'table_restaurant' },
    ];

    const recentSearches = [
        'Mid-century modern chair',
        'Oak desk',
        'Green lamp'
    ];

    const suggestions = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Show top 5 suggestions

    const handleSuggestionClick = (title) => {
        setSearchQuery(title);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="h-12 w-full bg-background-light dark:bg-background-dark shrink-0"></div>

            {/* Header / Search Bar */}
            <div className="px-4 pb-2 sticky top-0 z-20 bg-background-light dark:bg-background-dark">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl text-on-surface-light dark:text-white">arrow_back</span>
                    </button>

                    <div className="flex-1 h-12 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-primary dark:text-primary">search</span>
                        </div>
                        <input
                            autoFocus
                            className="block w-full h-full pl-12 pr-10 rounded-full bg-secondary dark:bg-white/10 border-2 border-primary/50 focus:border-primary text-on-surface-light dark:text-white placeholder:text-text-sub dark:placeholder-gray-400 focus:ring-0 transition-colors text-base"
                            placeholder="Search furniture..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative flex flex-col px-4 pt-6 pb-24 overflow-y-auto no-scrollbar">
                {!searchQuery ? (
                    <>
                        <div className="mb-6 animate-in fade-in duration-500">
                            <h2 className="text-2xl font-bold tracking-tight text-on-surface-light dark:text-white">What are you looking for?</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Browse by category</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => handleSuggestionClick(cat.name)}
                                    className="group relative flex flex-col items-center justify-center gap-4 p-6 aspect-[4/3] rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/30 shadow-card hover:shadow-soft transition-all active:scale-[0.98]"
                                >
                                    <div className="w-16 h-16 rounded-full bg-surface-variant dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-[32px] text-primary dark:text-primary">{cat.icon}</span>
                                    </div>
                                    <span className="font-semibold text-lg text-on-surface-light dark:text-white group-hover:text-primary-dark dark:group-hover:text-primary transition-colors">{cat.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Searches</h3>
                                <button className="text-sm text-primary font-medium hover:text-primary-dark">Clear all</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => handleSuggestionClick(term)}
                                        className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Suggestions</h3>
                        </div>
                        <div className="space-y-1">
                            {suggestions.length > 0 ? (
                                suggestions.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSuggestionClick(product.title)}
                                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group"
                                    >
                                        <div className="h-12 w-12 rounded-lg bg-cover bg-center shrink-0 shadow-sm" style={{ backgroundImage: `url(${product.image})` }}></div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-medium text-on-surface-light dark:text-white truncate group-hover:text-primary transition-colors">{product.title}</p>
                                            <p className="text-xs text-text-sub dark:text-gray-400">${product.price} • {product.location}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">north_west</span>
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 py-4 text-center">No products found for "{searchQuery}"</p>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 w-full h-12 rounded-full bg-primary text-white font-semibold shadow-soft hover:bg-primary-dark transition-all active:scale-95"
                        >
                            View all results
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Bar Indicator */}
            <div className="h-8 w-full shrink-0 flex items-center justify-center bg-background-light dark:bg-background-dark pb-2">
                <div className="h-1 w-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
        </div>
    );
};

export default SearchOverlay;
