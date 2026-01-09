import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Negotiate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [offerAmount, setOfferAmount] = useState(425);
    const [message, setMessage] = useState('');

    const product = {
        title: 'Mid-Century Modern Chair',
        price: 450,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATRBDKpNJ8oa5hkp0ouM1BEyucx5Tyf9q8i7NYkXnr59F64KAtw1bSWgMVk9UfK-xay3ztIf5Rn08nVTqoV7bdpzBOv6_TyOXiAmpKU1QMtjquTAwjMlN0luqrssJ8yjucxfdF0NYecc9nMgJaSsJLWCi62fGa6_PcKUNAtOejEpt-c3t9hecJUGOEZfVIPpy2X7Yj1M2Qlx5t4a1kvBOOGI_H_fvF0uVuPQeyv1hFW4gclrg08xj-y_GottIB9rcGxKKtR1LKLZvN"
    };

    const quickOffers = [
        { label: '-5%', value: 427.5 },
        { label: '-10%', value: 405 },
        { label: '-15%', value: 382.5 },
    ];

    const handleSubmit = () => {
        // Logic for sending offer
        alert(`Offer of $${offerAmount} sent!`);
        navigate(-1);
    };

    return (
        <div className="relative mx-auto flex h-full min-h-screen max-w-md flex-col bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-300">
            {/* TopAppBar */}
            <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between">
                <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-start cursor-pointer transition-transform active:scale-95">
                    <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back_ios</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-text-main dark:text-white">Make an Offer</h2>
                <div className="flex size-10 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full text-text-main dark:text-white">
                        <span className="material-symbols-outlined">info</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 px-4">
                {/* Card: Product Summary */}
                <div className="mt-4">
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="h-20 w-20 flex-shrink-0 bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden"
                            style={{ backgroundImage: `url("${product.image}")` }}>
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Item Details</p>
                            <p className="text-base font-bold leading-tight truncate text-text-main dark:text-white">{product.title}</p>
                            <p className="text-text-sub dark:text-gray-400 text-sm font-normal">Original Price: ${product.price}</p>
                        </div>
                    </div>
                </div>

                {/* HeadlineText & Numeric Input */}
                <div className="pt-10 pb-2">
                    <p className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal text-center mb-1">Your Offer Amount</p>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-4xl font-bold text-primary">$</span>
                        <input
                            className="w-48 bg-transparent text-center text-5xl font-bold border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-300"
                            placeholder="0"
                            type="number"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Chips: Guided Pricing */}
                <div className="mt-4 mb-8">
                    <p className="text-text-sub dark:text-gray-400 text-xs font-medium text-center uppercase tracking-widest mb-3">Quick Adjust</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        {quickOffers.map((offer) => (
                            <button
                                key={offer.label}
                                onClick={() => setOfferAmount(offer.value)}
                                className={`flex h-10 items-center justify-center rounded-full px-5 transition-all shadow-sm ${offerAmount === offer.value
                                        ? 'bg-primary text-white font-bold scale-105'
                                        : 'bg-white dark:bg-surface-dark text-text-main dark:text-white font-medium hover:bg-primary/10 border border-gray-100 dark:border-gray-800'
                                    }`}
                            >
                                <p className="text-sm leading-normal">{offer.label} (${offer.value})</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message Text Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-main dark:text-white px-2">Message to Seller (Optional)</label>
                    <textarea
                        className="w-full bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] resize-none placeholder:text-text-sub/60 text-text-main dark:text-white"
                        placeholder="Hi! I love this chair and I'm ready to pick it up today if you accept my offer."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>

                <p className="mt-6 text-center text-text-sub dark:text-gray-400 text-xs leading-relaxed px-6">
                    By sending this offer, you agree to Again's Terms of Service. Offers are binding for 24 hours.
                </p>
            </main>

            {/* Footer / Action Button */}
            <footer className="sticky bottom-0 bg-background-light dark:bg-background-dark p-6 pb-10">
                <button
                    onClick={handleSubmit}
                    className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-14 bg-primary text-white gap-3 text-lg font-bold shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
                >
                    <span>Send Offer</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
            </footer>
        </div>
    );
};

export default Negotiate;
