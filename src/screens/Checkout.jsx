
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, formatPrice } = useSettings();

    const passedProduct = location.state?.product;

    const [deliveryMethod, setDeliveryMethod] = useState('courier');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    // Use passed data or fallback to mock
    const product = useMemo(() => {
        return {
            title: passedProduct?.title || 'Mid-Century Modern Sofa',
            price: passedProduct?.price || 450.00,
            image: passedProduct?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBkE3rA2NIQskELOYMgSnSUxwAR9E9oG5x0CGhleUTVUuFxDwy3Z9vP8lyxnNEQy2jXldAodnybheumIhj4ZbG3W5Qpy7oEicrvFVRsPCkAKpoNbO2CqVFzhtRxD5yz8_19pT5H1Ds_1Sc6X9vt43wHMCWN-7nLHkxKflQkTagb4gV17wGu5aAFluGVQ3HFJnkqtBUcMnuO8KEtdKciYNtceDc1OceSWTZssPucfT2FsudbLXjKevK49PIozGIk6fqll4GXyy2QEeqB"
        };
    }, [passedProduct]);

    const fees = useMemo(() => {
        const subtotal = product.price;
        let delivery = 0;
        if (deliveryMethod === 'courier') delivery = 50.00;
        else if (deliveryMethod === 'furgonetka') delivery = 45.00;

        const service = subtotal * 0.03; // 3% service fee
        return {
            subtotal,
            delivery,
            service,
            total: subtotal + delivery + service
        };
    }, [product, deliveryMethod]);

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark animate-in fade-in duration-500 pb-32">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 pb-safe pt-12">
                <button onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">{t('checkout.title')}</h1>
                <div className="flex size-10 items-center justify-center">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">{t('checkout.step')}</span>
                </div>
            </header>

            <main className="flex flex-col gap-6 px-4 pt-2">
                {/* Order Summary */}
                <section aria-label="Order Summary">
                    <div className="flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="shrink-0 bg-center bg-no-repeat bg-cover rounded-xl size-16"
                            style={{ backgroundImage: `url("${product.image}")` }}>
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                            <p className="text-base font-semibold leading-snug line-clamp-1">{product.title}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{t('checkout.quantity')}: 1</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                        </div>
                    </div>
                </section>

                {/* Shipping Address */}
                <section aria-label="Shipping Address">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold">{t('checkout.shippingAddress')}</h3>
                    </div>
                    <div className="bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 size-10 mt-1">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-base">{t('checkout.address.home')}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                                            123 Maple Ave<br />
                                            Portland, OR 97205
                                        </p>
                                    </div>
                                    <button className="text-primary text-sm font-semibold hover:underline px-2 py-1">{t('checkout.address.edit')}</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 w-full h-24 rounded-lg bg-stone-200 dark:bg-stone-700 overflow-hidden relative">
                            <img alt="Map showing location" className="w-full h-full object-cover opacity-80 dark:opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_28XfGmWGkWnlX_EA97ElMMr9O-htxy7wAunyxuJIUW4QYFmqZ9jt-buRdtdemDVfhjZEBitm55ajAFUNu1Hm589EMoAu7-G8Nvn6OInCG6ZRwIS3tOvqpfL3uWCawfEZwOSAcOSbPwixLTy4C18jWBCJN1XzZbsLTNHuqCUIQE-fZn80bhSFExVlDxK5SyJpxbVYUVkGIo89fVQfDUS9dD44ZnCaD-WWaJr4xiEYd7AKgs6PFLMDlhrYu1NYn2JMKOiBKsajttqB" />
                            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                                <div className="bg-white dark:bg-stone-800 p-1 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-sm block">location_on</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Delivery Method */}
                <section aria-label="Delivery Method">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold">{t('checkout.deliveryMethod')}</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="relative block cursor-pointer group" onClick={() => setDeliveryMethod('furgonetka')}>
                            <input className="peer sr-only" name="delivery_method" type="radio" checked={deliveryMethod === 'furgonetka'} readOnly />
                            <div className="flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-sm">
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-12 peer-checked:text-primary peer-checked:bg-primary/20 transition-colors group-hover:bg-primary/10 group-hover:text-primary/70">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-base font-semibold">{t('checkout.delivery.furgonetka')}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('checkout.delivery.estimate')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">~ {formatPrice(45.00)}</p>
                                </div>
                                <div className="absolute right-4 top-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined fill-current text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>

                        <label className="relative block cursor-pointer group" onClick={() => setDeliveryMethod('courier')}>
                            <input className="peer sr-only" name="delivery_method" type="radio" checked={deliveryMethod === 'courier'} readOnly />
                            <div className="flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-sm">
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-12 peer-checked:text-primary peer-checked:bg-primary/20 transition-colors group-hover:bg-primary/10 group-hover:text-primary/70">
                                    <span className="material-symbols-outlined">directions_car</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-base font-semibold">{t('checkout.delivery.courier')}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('checkout.delivery.time')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary">{formatPrice(50.00)}</p>
                                </div>
                                <div className="absolute right-4 top-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined fill-current text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>

                        <label className="relative block cursor-pointer group" onClick={() => setDeliveryMethod('pickup')}>
                            <input className="peer sr-only" name="delivery_method" type="radio" checked={deliveryMethod === 'pickup'} readOnly />
                            <div className="flex items-center gap-4 bg-white dark:bg-[#2C2E2D] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-sm">
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-12 peer-checked:text-primary peer-checked:bg-primary/20 transition-colors group-hover:bg-primary/10 group-hover:text-primary/70">
                                    <span className="material-symbols-outlined">storefront</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-base font-semibold">{t('checkout.delivery.pickup')}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('checkout.delivery.distance')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 dark:text-green-400">{t('checkout.free')}</p>
                                </div>
                                <div className="absolute right-4 top-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined fill-current text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Payment Method */}
                <section aria-label="Payment Method">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold">{t('checkout.paymentMethod')}</h3>
                    </div>
                    <div className="bg-white dark:bg-[#2C2E2D] p-2 rounded-2xl border border-stone-200 dark:border-stone-800">
                        <div className="flex flex-col">
                            <label className="relative flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors" onClick={() => setPaymentMethod('credit_card')}>
                                <input className="peer sr-only" name="payment_method" type="radio" checked={paymentMethod === 'credit_card'} readOnly />
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-10 peer-checked:bg-primary peer-checked:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                </div>
                                <span className="font-medium flex-1 text-base">{t('checkout.payment.card')}</span>
                                <div className="size-5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                                </div>
                            </label>
                            <div className="h-px bg-stone-100 dark:bg-stone-800 mx-3"></div>

                            <label className="relative flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors" onClick={() => setPaymentMethod('payu')}>
                                <input className="peer sr-only" name="payment_method" type="radio" checked={paymentMethod === 'payu'} readOnly />
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-10 peer-checked:bg-primary peer-checked:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                </div>
                                <span className="font-medium flex-1 text-base">{t('checkout.payment.payu')}</span>
                                <div className="size-5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                                </div>
                            </label>
                            <div className="h-px bg-stone-100 dark:bg-stone-800 mx-3"></div>

                            <label className="relative flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors" onClick={() => setPaymentMethod('transfer')}>
                                <input className="peer sr-only" name="payment_method" type="radio" checked={paymentMethod === 'transfer'} readOnly />
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-10 peer-checked:bg-primary peer-checked:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                                </div>
                                <span className="font-medium flex-1 text-base">{t('checkout.payment.transfer')}</span>
                                <div className="size-5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                                </div>
                            </label>
                            <div className="h-px bg-stone-100 dark:bg-stone-800 mx-3"></div>

                            <label className="relative flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-stone-50 dark:hover:bg-white/5 transition-colors" onClick={() => setPaymentMethod('cod')}>
                                <input className="peer sr-only" name="payment_method" type="radio" checked={paymentMethod === 'cod'} readOnly />
                                <div className="flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-700 text-stone-500 shrink-0 size-10 peer-checked:bg-primary peer-checked:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">attach_money</span>
                                </div>
                                <span className="font-medium flex-1 text-base">{t('checkout.payment.cod')}</span>
                                <div className="size-5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                                    <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100">check</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Costs */}
                <section aria-label="Cost Breakdown" className="px-2 pt-2 pb-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{t('checkout.subtotal')}</span>
                            <span className="text-gray-900 dark:text-white font-medium">{formatPrice(fees.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{t('checkout.deliveryFee')}</span>
                            <span className="text-gray-900 dark:text-white font-medium">{formatPrice(fees.delivery)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <span>{t('checkout.serviceFee')}</span>
                                <span className="material-symbols-outlined text-[14px] cursor-help">info</span>
                            </div>
                            <span className="text-gray-900 dark:text-white font-medium">{formatPrice(fees.service)}</span>
                        </div>
                        <div className="h-px w-full bg-stone-200 dark:bg-stone-700 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold">{t('checkout.total')}</span>
                            <span className="text-xl font-bold text-primary">{formatPrice(fees.total)}</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2C2E2D] border-t border-stone-200 dark:border-stone-800 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{t('checkout.totalAmount')}</span>
                        <span className="text-xl font-bold">{formatPrice(fees.total)}</span>
                    </div>
                    <button onClick={() => navigate('/order-confirmation')}
                        className="flex-1 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-bold h-14 rounded-full shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg">
                        <span>{t('checkout.placeOrder')}</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Checkout;
