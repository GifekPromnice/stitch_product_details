import { useNavigate } from 'react-router-dom';

const Wallet = () => {
    const navigate = useNavigate();

    const transactions = [
        { id: 1, title: 'Sold: Mid-Century Lamp', date: 'Today, 2:30 PM', amount: 150.00, isPositive: true, icon: 'chair' },
        { id: 2, title: 'Bought: Jute Rug', date: 'Yesterday', amount: -45.00, isPositive: false, icon: 'shopping_bag' },
        { id: 3, title: 'Withdrawal to Bank', date: 'Oct 24', amount: -500.00, isPositive: false, icon: 'account_balance' },
        { id: 4, title: 'Wallet Top Up', date: 'Oct 20', amount: 200.00, isPositive: true, icon: 'add_card' },
    ];

    const cards = [
        { type: 'Visa', last4: '4242', holder: 'Alex Morgan', expiry: '12/25', isVisa: true },
        { type: 'Apple Pay', email: 'alex.morgan@icloud.com', isApple: true, isDefault: true },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
            {/* Top App Bar */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 pt-12 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
                <button onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Wallet</h1>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">settings</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col pb-24 px-4 overflow-y-auto">
                {/* Balance Card Section */}
                <section className="py-4">
                    <div className="relative w-full rounded-[2rem] overflow-hidden shadow-lg group">
                        <div className="absolute inset-0 bg-[#698679]"></div>
                        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRb-IBa_g8lPpgu9bqdKnrDiYXjUdLxLGdWz0hhfCONUIAjskjl15oFqAMC0V2wTxAz6VtPk-IRjUzWC0VW5wzBceLbUszPrl3-a_2mRoz8nNxCUCnTlMMU4Yzw0kVowy-GIJCvKXPbpsMGXXT_gCAmu2o5ATGH3LGMSYStdnNzm18yT0uox5x42ZEVU7QodJ3FJ2m5LB7rSP0_ja60Gz0gfqOhtoF8iE3CiyCGoEq98_8r66yAu94BkexSgwaP5aHDVB313YM-AFG")' }}>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20"></div>
                        <div className="relative p-6 flex flex-col items-center justify-center text-center h-[200px] text-white">
                            <span className="text-sm font-medium opacity-90 mb-1 tracking-wide uppercase">Total Balance</span>
                            <h2 className="text-4xl font-bold tracking-tight mb-2">$1,240.50</h2>
                            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                <span className="text-xs font-medium">Available to withdraw</span>
                            </div>
                        </div>
                    </div>
                    {/* Withdraw Button */}
                    <div className="mt-4 flex justify-center">
                        <button className="w-full bg-[#2C2E2D] text-white font-semibold h-12 rounded-full shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <span className="material-symbols-outlined">payments</span>
                            Withdraw Funds
                        </button>
                    </div>
                </section>

                {/* Payment Methods Section */}
                <section className="mt-2 text-left">
                    <div className="flex items-center justify-between pb-2 px-1">
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold">Payment Methods</h3>
                        <button className="text-primary text-sm font-semibold hover:opacity-80">Edit</button>
                    </div>
                    {/* Carousel */}
                    <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4">
                        {/* Visa Card */}
                        <div className="snap-center shrink-0 w-[280px] h-[160px] rounded-[1.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-5 flex flex-col justify-between shadow-soft relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <div className="flex justify-between items-start z-10">
                                <span className="font-bold text-lg italic tracking-tighter brightness-200">VISA</span>
                                <span className="material-symbols-outlined text-white/50">contactless</span>
                            </div>
                            <div className="z-10">
                                <p className="text-lg tracking-widest font-mono">•••• 4242</p>
                            </div>
                            <div className="flex justify-between items-end z-10">
                                <div>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Card Holder</p>
                                    <p className="text-sm font-medium text-left">Alex Morgan</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Expires</p>
                                    <p className="text-sm font-medium">12/25</p>
                                </div>
                            </div>
                        </div>

                        {/* Apple Pay */}
                        <div className="snap-center shrink-0 w-[280px] h-[160px] rounded-[1.5rem] bg-white dark:bg-[#2C2E2D] border border-neutral-200 dark:border-neutral-700 p-5 flex flex-col justify-between shadow-sm relative group">
                            <div className="flex justify-between items-start">
                                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">ios</span> Pay
                                </div>
                                <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap">Default</div>
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Linked to iCloud</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white truncate">alex.morgan@icloud.com</p>
                            </div>
                            <div className="flex justify-end">
                                <span className="material-symbols-outlined text-green-500 fill-[1]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                        </div>

                        {/* Add New */}
                        <button className="snap-center shrink-0 w-[80px] h-[160px] rounded-[1.5rem] bg-neutral-100 dark:bg-white/5 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex flex-col items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-primary text-[24px]">add</span>
                            </div>
                            <span className="text-xs font-bold text-gray-900 dark:text-white text-center">Add<br />New</span>
                        </button>
                    </div>
                </section>

                {/* Recent Activity Section */}
                <section className="mt-4 text-left">
                    <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="flex flex-col gap-3">
                        {transactions.map(t => (
                            <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#2C2E2D] shadow-sm border border-neutral-100 dark:border-neutral-800 transition-transform active:scale-[0.98]">
                                <div className="flex items-center gap-4">
                                    <div className={`size-12 rounded-full flex items-center justify-center ${t.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-white'}`}>
                                        <span className="material-symbols-outlined">{t.icon}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{t.title}</span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{t.date}</span>
                                    </div>
                                </div>
                                <span className={`font-bold text-base ${t.isPositive ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                    {t.isPositive ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Wallet;
