import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data based on the armchair example in legacy
    const product = {
        title: 'Vintage Velvet Armchair',
        price: 120.00,
        originalPrice: 180.00,
        location: 'Brooklyn, NY',
        condition: 'Good Condition',
        timeListed: 'Listed 2h ago',
        seller: {
            name: 'Sarah J.',
            rating: 4.8,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRjBy5olySuBu-5aexKNm5gVzcaLVENlzMbx-eDhuhKvO1XxKLTh_gP-anraJdzXADlPSisSJdJm6FBU5zvj2inKqVkQCRQsbCkJQYUp-ohxlu73dGky0GaBcgG6bwvsAw_BERre9BPYg2kq2wzxJcoAVqlYRxoIkfQSNo4MMhuX66q4W5D19pjp2e_EkaeocBeACUM2IzuO1M2P9l7tExubYFO1fEfNqK95q6x4ys42VAsQTNID9FBxr9-UgOHRAMDWxmCIVnKzZs"
        },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnL8q_KkKo5Zi5VoxcxzycrSt4lkiv-ZEldyK0qLnqvnNJgAI18mVpuV3YiZep8yuZGbu71VY0fxvyija031i5kiQQUAJ36Uqkkxi1Q4VJhF6CLlm6G6_b7ADtf0oOml8Yb0iyskMbt3RPrNTLpLJ-51U0Gcavj-w77FFZBUvzTXpydTS8yxf5GXJAUS-kS8_-Btq5JDrezeQf3K9Kh5VnHF3h6C8kNxIcL7ZoEM679z3Du-QZ3Bn_zKqNDWXEnfyr8nURQjHyKOo_",
        dimensions: { height: '32"', width: '28"', depth: '30"' },
        shipping: '~$45',
        description: 'Beautiful mid-century modern style velvet armchair in a rich emerald green. Perfect accent piece for a living room or reading nook. The fabric is soft and luxurious.',
        mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv416prnqJ93spioHVTa2lPQ4Y4I9NxkbED4cysFMsqRvAgm1aKCTjGWjub7grvVkyhcGsis7Gn_c0psDoV9M1EfEHdqybSjbMMxalTY6ckvZzAXDxDKpy7OuEL0R6vT-Jld6q9WFtaA2ZEhPqO7aJsTzJMi47Sv_iuyop0eWo3IeToaGqdYatdZznm-sNp2_kZAfkVvfhPzbPpw6BGSK8wpLc9IaMOuvxVo0o7BzFs83BoA541SswaC5laH-YfHUFTCSGOVm56rJE"
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col pb-32 mx-auto max-w-md bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden animate-in fade-in duration-500">
            {/* Header / Image Section */}
            <div className="relative w-full h-[45vh] shrink-0">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${product.image}")` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex justify-between items-center z-20">
                    <button onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <button
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">ios_share</span>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative flex flex-col flex-1 -mt-10 bg-background-light dark:bg-background-dark rounded-t-[2.5rem] px-6 pt-8 pb-6 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-black/50">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

                <div className="mb-6">
                    <div className="flex justify-between items-start gap-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{product.title}</h1>
                    </div>
                    <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium line-through">${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {product.condition}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {product.timeListed}
                        </span>
                    </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between p-1 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center border-2 border-white dark:border-gray-800 shadow-sm"
                                style={{ backgroundImage: `url("${product.seller.image}")` }}>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-background-dark"></div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sold by {product.seller.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-[1]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
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

                {/* Dimensions & Shipping */}
                <div className="bg-[#F5F7F6] dark:bg-[#2c302e] rounded-lg p-5 mb-8 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Dimensions</h3>
                        <div className="flex items-center gap-1.5 pl-3 pr-2 py-1 bg-primary text-white rounded-full shadow-md shadow-primary/20">
                            <span className="text-[11px] font-bold tracking-wide uppercase">Shipping:</span>
                            <span className="text-[11px] font-medium opacity-90">{product.shipping}</span>
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 relative z-10">
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#222524] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                            <span className="material-symbols-outlined text-primary mb-1 text-[24px]">height</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Height</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{product.dimensions.height}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#222524] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                            <span className="material-symbols-outlined text-primary mb-1 text-[24px]">straighten</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Width</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{product.dimensions.width}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#222524] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                            <span className="material-symbols-outlined text-primary mb-1 text-[24px]">deployed_code</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Depth</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{product.dimensions.depth}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {product.description} <span className="text-gray-400 text-xs mx-1">•</span>
                        <button className="text-primary font-medium hover:underline">Read more</button>
                    </p>
                </div>

                {/* Location */}
                <div className="mt-4 mb-8">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-base mb-3 text-gray-900 dark:text-white">Pickup Location</h3>
                    <div className="w-full h-32 rounded-lg overflow-hidden relative">
                        <img alt="Map" className="w-full h-full object-cover opacity-80" src={product.mapImage} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
                                <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-8 pt-3 px-6 mx-auto max-w-md">
                <div className="flex items-center gap-4">
                    <button className="flex-1 h-12 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-colors">Message</button>
                    <button onClick={() => navigate('/checkout')}
                        className="flex-[2] h-12 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
