import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, formatPrice } = useSettings();
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const passedProduct = location.state?.product;

    // Format relative time helper
    const formatTimeListed = (dateString) => {
        if (!dateString) return t('time.justNow');
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return t('time.justNow');
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ${t('time.ago')}`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ${t('time.ago')}`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ${t('time.ago')}`;
    };

    const product = useMemo(() => {
        return {
            title: passedProduct?.title || '',
            price: passedProduct?.price || 0,
            originalPrice: passedProduct?.price ? (passedProduct.price * 1.2) : 0, // Simplified markup for demo
            location: passedProduct?.location || '',
            condition: passedProduct?.is_new ? t('cond.new') : t('cond.good'),
            timeListed: formatTimeListed(passedProduct?.created_at),
            seller: {
                name: 'Sarah J.', // Fallback for fixed seller for now
                rating: 4.8,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRjBy5olySuBu-5aexKNm5gVzcaLVENlzMbx-eDhuhKvO1XxKLTh_gP-anraJdzXADlPSisSJdJm6FBU5zvj2inKqVkQCRQsbCkJQYUp-ohxlu73dGky0GaBcgG6bwvsAw_BERre9BPYg2kq2wzxJcoAVqlYRxoIkfQSNo4MMhuX66q4W5D19pjp2e_EkaeocBeACUM2IzuO1M2P9l7tExubYFO1fEfNqK95q6x4ys42VAsQTNID9FBxr9-UgOHRAMDWxmCIVnKzZs"
            },
            images: [passedProduct?.image].filter(Boolean),
            dimensions: { height: '32"', width: '28"', depth: '30"' }, // Default dimensions
            tags: Array.isArray(passedProduct?.tags) ? passedProduct.tags : [],
            description: passedProduct?.description || '',
            mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv416prnqJ93spioHVTa2lPQ4Y4I9NxkbED4cysFMsqRvAgm1aKCTjGWjub7grvVkyhcGsis7Gn_c0psDoV9M1EfEHdqybSjbMMxalTY6ckvZzAXDxDKpy7OuEL0R6vT-Jld6q9WFtaA2ZEhPqO7aJsTzJMi47Sv_iuyop0eWo3IeToaGqdYatdZznm-sNp2_kZAfkVvfhPzbPpw6BGSK8wpLc9IaMOuvxVo0o7BzFs83BoA541SswaC5laH-YfHUFTCSGOVm56rJE"
        };
    }, [passedProduct, t]);

    const handleScroll = (e) => {
        const width = e.target.offsetWidth;
        const scrollLeft = e.target.scrollLeft;
        const index = Math.round(scrollLeft / width);
        setCurrentImageIndex(index);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col mx-auto max-w-md bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden pb-24 animate-in fade-in duration-500">
            {/* Header / Image Section */}
            <div className="relative w-full h-[45vh] shrink-0 overflow-hidden">
                <div
                    className="flex overflow-x-auto h-full no-scrollbar snap-x snap-mandatory"
                    onScroll={handleScroll}
                >
                    {product.images.map((img, idx) => (
                        <div key={idx} className="flex-none w-full h-full relative snap-start">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("${img}")`,
                                    filter: idx === 1 ? 'brightness(0.85) hue-rotate(15deg)' : idx === 2 ? 'brightness(0.7) contrast(1.1)' : 'none'
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                <div className="absolute top-[104px] right-4 z-30">
                    <div className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <span className="text-[11px] font-semibold text-white tracking-wider">
                            {currentImageIndex + 1}/{product.images.length}
                        </span>
                    </div>
                </div>

                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {product.images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-3' : 'bg-white/40'}`}
                        ></div>
                    ))}
                </div>

                <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex justify-between items-center z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white">
                        <span className="material-symbols-outlined text-[20px]">ios_share</span>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative flex flex-col flex-1 -mt-10 bg-background-light dark:bg-background-dark rounded-t-[2.5rem] pt-8 z-10 antialiased">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

                <div className="px-6 mb-6">
                    <div className="flex justify-between items-start gap-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{product.title}</h1>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium line-through">{formatPrice(product.originalPrice)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {product.condition}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {product.timeListed}
                        </span>
                    </div>
                </div>

                {/* Dimensions Grid */}
                <div className="mb-8 w-full bg-white dark:bg-surface-dark border-y border-gray-100 dark:border-gray-800">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3 flex-1 justify-start">
                            <span className="material-symbols-outlined text-primary text-[20px]">height</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t('product.height')}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{product.dimensions.height}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800"></div>
                        <div className="flex items-center gap-3 flex-1 justify-center">
                            <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t('product.width')}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{product.dimensions.width}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800"></div>
                        <div className="flex items-center gap-3 flex-1 justify-end">
                            <span className="material-symbols-outlined text-primary text-[20px]">deployed_code</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t('product.depth')}</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{product.dimensions.depth}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="px-6 mb-6">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{t('product.description')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="px-6 mb-8">
                    <div className="flex flex-wrap gap-2 text-sm">
                        {product.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Pickup Location */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 px-6">
                        {t('product.pickupLocation')} <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">{product.location}</span>
                    </h3>
                    <div className="w-full h-48 overflow-hidden relative">
                        <img
                            alt="Map showing pickup location"
                            className="w-full h-full object-cover grayscale opacity-60 dark:opacity-40"
                            src={product.mapImage}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary p-3 rounded-full shadow-xl shadow-primary/30">
                                <span className="material-symbols-outlined text-white text-[28px]">location_on</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 flex justify-center">
                        <button className="mt-4 px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider font-bold rounded-full flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                            {t('product.estimateTransport')}
                        </button>
                    </div>
                </div>

                {/* Seller Info */}
                <div className="px-6 mb-8 mt-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div
                                    className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center border-2 border-white dark:border-gray-800 shadow-sm"
                                    style={{ backgroundImage: `url("${product.seller.image}")` }}
                                ></div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-background-dark"></div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t('product.soldBy')} {product.seller.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span>{product.seller.rating}</span>
                                    <span className="px-1">•</span>
                                    <span>{product.location}</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center gap-3 z-50">
                <button
                    onClick={() => navigate('/chat')}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                    <span className="material-symbols-outlined">chat_bubble</span>
                </button>
                <button
                    onClick={() => navigate(`/negotiate/${id}`)}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                    <span className="material-symbols-outlined">gavel</span>
                </button>
                <button
                    onClick={() => navigate('/checkout', { state: { product } })}
                    className="flex-1 h-12 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    {t('product.buyNow')}
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
