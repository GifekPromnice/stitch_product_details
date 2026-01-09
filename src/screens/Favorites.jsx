import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const navigate = useNavigate();

    // Mock data for favorite products
    const favoriteProducts = [
        {
            id: 1,
            title: 'Velvet Armchair',
            price: 120.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQgCW4Muk9dbgdy6jBOSVlS0iF72meIguXixSbO_QLNpKcAB4SVg_Si4a8N71L7WXXbKLO7sSbPgfwr9ohK1HLeABfWCw52S3vlaZrQ_CSP3Yoito4qII6yQ9QxynLrNuWD03XioYkAxtkr-tTcf9jDtj9X-rKuNXxhiR0zpD6zlK57qzmtuJHh99X6o_szPSHS3CMkFQCvrwgVbFwVsn_aYN5MLcqoiSVFnTcZdFR4U7zbKEX5xK4iS0a86X3l0d741kNHjL1XC8q',
            location: 'Portland, OR'
        },
        {
            id: 4,
            title: 'Mid-Century Lamp',
            price: 45.00,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAxzR6ZvIQwSF3q2rtABlVYusLMitS3FkpiPAar2f3zLVMaJfZeSozX0pgtlJtkEBZiqGmGBfT6-tEqNAzFcMo377f3RYhPWunf3CeC7-a9TMskOjNA52SfMMMv3wFcrRP2D2JLZUYVxtIMfw1Yi31byrXEXWXxIKqPJ1AbGvM7Adk89IzUjvQIhTX9OOxYATczkO_wnX_gfAXGIEOcIC1Wlg8xRXKqmeirLz97QCzu9j1cIeLzPoT6aizu93TI7mUO5yNCu7YHStm",
            location: 'Seattle, WA'
        },
        {
            id: 3,
            title: 'Ceramic Vase',
            price: 30.00,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yJzK3Yd4XQ3rLgBqZp8xT6aN2cW5eH4vJ7oM1uI8kR9sP2lF0tV3yE5wA6bN7cD8fG9hI0jK1L2mO3nQ4p5qS6rT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4cE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5z",
            location: 'Eugene, OR'
        }
    ];

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
