import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useSettings();

    const orderId = location.state?.orderId || "7821-9231";
    const shortOrderId = orderId.slice(0, 8).toUpperCase();
    const product = {
        title: 'Eames Molded Plastic Chair',
        price: 150.00,
        seller: 'Studio99',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVa0EyR9wwNFfpzpQuwyb9NYY7BPfunN0N4k1x7h4Ee-qHm-K3pnRJAM8k_9jJmlg9YJhBc1UUMK8_0_a27nfQ0fvTqfiiWyt6Lse6ml3ivK_QaX25tmdFw607fXOgT_Wu46sgE-sYinsDU90IC69rV1t4q-mTV_iRjdvANYRWGsztXrEF4R-U3VUyXS_nrVeI6vqeH1Fal8HlJFWhMfFplczsfjCQmfRQPm3YjWmqMsFHAb87atjXqV07R1TdAB2iu6eJAYNCZzwY"
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark animate-in fade-in slide-in-from-bottom-8 duration-500">
            <header className="flex items-center p-4 justify-between pt-12">
                <button onClick={() => navigate('/home')}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-text-main dark:text-white text-2xl">close</span>
                </button>
                <div className="size-10"></div>
            </header>

            <main className="flex-1 px-5 pb-32">
                <div className="flex flex-col items-center gap-6 py-6 text-center">
                    <div className="relative">
                        <div className="size-24 rounded-full bg-primary flex items-center justify-center shadow-[0_8px_30px_rgba(105,134,121,0.3)] animate-in zoom-in duration-500 delay-200">
                            <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-gray-900 dark:text-white text-3xl font-extrabold leading-tight tracking-tight">Order Confirmed!</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed max-w-[280px]">
                            Thank you for your purchase. A receipt has been sent to your email.
                        </p>
                        <div className="mt-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
                            <p className="text-gray-900 dark:text-white text-xs font-semibold tracking-wide">Order #{orderId}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#2C2E2D] shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex items-start gap-4">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 shrink-0 bg-gray-200"
                            style={{ backgroundImage: `url("${product.image}")` }}>
                        </div>
                        <div className="flex flex-col flex-1 h-full justify-between py-1 text-left">
                            <div>
                                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight line-clamp-1">{product.title}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Sold by {product.seller}</p>
                                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-stone-100 dark:bg-white/10 text-[10px] font-medium text-gray-500 dark:text-gray-300">Good Condition</span>
                            </div>
                        </div>
                        <div className="shrink-0 py-1">
                            <p className="text-gray-900 dark:text-white text-base font-bold">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mt-6 px-2 text-left">
                    <div className="grid grid-cols-[32px_1fr] gap-x-3">
                        <div className="flex flex-col items-center gap-1 pt-1">
                            <div className="size-6 rounded-full bg-primary flex items-center justify-center shadow-sm z-10 ring-4 ring-background-light dark:ring-background-dark">
                                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                            </div>
                            <div className="w-[2px] bg-primary h-full min-h-[24px] grow rounded-full opacity-50"></div>
                        </div>
                        <div className="flex flex-1 flex-col pt-1 pb-6 text-left">
                            <p className="text-gray-900 dark:text-white text-sm font-bold leading-none">Order Placed</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Oct 21, 2:30 PM</p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <div className="w-[2px] bg-gray-200 dark:bg-gray-700 h-2 rounded-full"></div>
                            <div className="size-6 rounded-full bg-white dark:bg-[#2C2E2D] border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center z-10">
                                <span className="material-symbols-outlined text-gray-400 text-sm">local_shipping</span>
                            </div>
                            <div className="w-[2px] bg-gray-200 dark:bg-gray-700 h-full min-h-[24px] grow rounded-full"></div>
                        </div>
                        <div className="flex flex-1 flex-col pt-0 pb-6 opacity-60 text-left">
                            <p className="text-gray-900 dark:text-white text-sm font-medium leading-none">Shipped</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Est. Oct 22</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-full">
                        <span className="text-stone-500 dark:text-stone-400 font-medium">Order ID:</span>
                        <span className="font-mono font-bold text-stone-900 dark:text-white tracking-wider">#{shortOrderId}</span>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 pb-8">
                <button onClick={() => navigate('/home')}
                    className="w-full bg-primary hover:bg-opacity-90 active:scale-[0.98] transition-all h-14 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                    <span className="text-white font-bold text-base">Continue Shopping</span>
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
