import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    // Mock data based on legacy
    const product = {
        title: 'Mid-Century Modern Sofa',
        price: 450.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkE3rA2NIQskELOYMgSnSUxwAR9E9oG5x0CGhleUTVUuFxDwy3Z9vP8lyxnNEQy2jXldAodnybheumIhj4ZbG3W5Qpy7oEicrvFVRsPCkAKpoNbO2CqVFzhtRxD5yz8_19pT5H1Ds_1Sc6X9vt43wHMCWN-7nLHkxKflQkTagb4gV17wGu5aAFluGVQ3HFJnkqtBUcMnuO8KEtdKciYNtceDc1OceSWTZssPucfT2FsudbLXjKevK49PIozGIk6fqll4GXyy2QEeqB"
    };

    const fees = {
        subtotal: 450.00,
        delivery: 50.00,
        service: 15.00,
        total: 515.00
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 pb-safe pt-12">
                <button onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Checkout</h1>
                <div className="flex size-10 items-center justify-center">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">Step 2/3</span>
                </div>
            </header>

            <main className="flex flex-col gap-6 px-4 pt-2 pb-32">
                {/* Order Summary */}
                <section aria-label="Order Summary">
                    <div className="flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="shrink-0 bg-center bg-no-repeat bg-cover rounded-xl size-16"
                            style={{ backgroundImage: `url("${product.image}")` }}>
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                            <p className="text-base font-semibold leading-snug line-clamp-1">{product.title}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Quantity: 1</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </section>

                {/* Shipping Address */}
                <section aria-label="Shipping Address">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold">Shipping Address</h3>
                    </div>
                    <div className="bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 size-10 mt-1">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-base">Home</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                                            123 Maple Ave<br />
                                            Portland, OR 97205
                                        </p>
                                    </div>
                                    <button className="text-primary text-sm font-semibold hover:underline px-2 py-1">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Delivery Method */}
                <section aria-label="Delivery Method">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold">Delivery Method</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="relative flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border-2 border-primary cursor-pointer transition-all">
                            <input checked readOnly className="peer sr-only" name="delivery_method" type="radio" />
                            <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 size-12">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-base font-semibold">Professional Delivery</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Arrives by Fri, Oct 24</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-primary">$50.00</p>
                            </div>
                            <div className="absolute right-4 top-4 text-primary opacity-100">
                                <span className="material-symbols-outlined fill-[1]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                        </label>

                        <label className="relative flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 cursor-pointer transition-all hover:border-primary/50">
                            <input className="peer sr-only" name="delivery_method" type="radio" />
                            <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-12">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-base font-semibold">Self Pickup</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">15 miles away</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600 dark:text-green-400">Free</p>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Costs */}
                <section aria-label="Cost Breakdown" className="px-2 pt-2 pb-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-gray-900 dark:text-white font-medium">${fees.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Delivery Fee</span>
                            <span className="text-gray-900 dark:text-white font-medium">${fees.delivery.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <span>Service Fee</span>
                                <span className="material-symbols-outlined text-[14px] cursor-help">info</span>
                            </div>
                            <span className="text-gray-900 dark:text-white font-medium">${fees.service.toFixed(2)}</span>
                        </div>
                        <div className="h-px w-full bg-stone-200 dark:bg-stone-700 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold">Total</span>
                            <span className="text-xl font-bold text-primary">${fees.total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2C2E2D] border-t border-stone-200 dark:border-stone-800 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total Amount</span>
                        <span className="text-xl font-bold">${fees.total.toFixed(2)}</span>
                    </div>
                    <button onClick={() => navigate('/order-confirmation')}
                        className="flex-1 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold h-14 rounded-full shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg">
                        <span>Place Order</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
