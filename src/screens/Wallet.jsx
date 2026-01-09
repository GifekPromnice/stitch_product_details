import { useNavigate } from 'react-router-dom';

const Wallet = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
            <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 pt-6 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary-dark dark:text-white"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-xl font-semibold text-primary-dark dark:text-white">My Wallet</h1>
                <div className="size-10"></div>
            </header>

            <main className="flex-1 flex flex-col pb-24">
                <section className="px-4 py-6 flex flex-col items-center">
                    <div className="text-center mb-6">
                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1 block">Total Balance</span>
                        <h2 className="text-4xl font-bold tracking-tight text-primary-dark dark:text-white">$1,240.50</h2>
                    </div>
                    <div className="flex gap-4 w-full">
                        <button className="flex-1 bg-primary text-white font-medium h-14 rounded-[1.25rem] shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary-dark">
                            <span className="material-symbols-outlined">add</span>
                            Deposit
                        </button>
                        <button className="flex-1 bg-surface-light dark:bg-surface-dark text-primary-dark dark:text-white border border-neutral-200 dark:border-neutral-700 font-medium h-14 rounded-[1.25rem] shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-neutral-50 dark:hover:bg-neutral-800">
                            <span className="material-symbols-outlined">arrow_upward</span>
                            Withdraw
                        </button>
                    </div>
                </section>

                <section className="mt-4">
                    <div className="flex items-center justify-between px-4 pb-3">
                        <h3 className="text-primary-dark dark:text-white text-lg font-bold">Payment Methods</h3>
                        <button className="text-primary text-sm font-semibold hover:opacity-80">Edit</button>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 snap-x snap-mandatory">
                        <div className="snap-center shrink-0 w-[280px] h-[160px] rounded-[1.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-5 flex flex-col justify-between shadow-soft relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <div className="flex justify-between items-start z-10">
                                <img alt="Visa Logo" className="h-5 brightness-200 grayscale contrast-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAxzR6ZvIQwSF3q2rtABlVYusLMitS3FkpiPAar2f3zLVMaJfZeSozX0pgtlJtkEBZiqGmGBfT6-tEqNAzFcMo377f3RYhPWunf3CeC7-a9TMskOjNA52SfMMMv3wFcrRP2D2JLZUYVxtIMfw1Yi31byrXEXWXxIKqPJ1AbGvM7Adk89IzUjvQIhTX9OOxYATczkO_wnX_gfAXGIEOcIC1Wlg8xRXKqmeirLz97QCzu9j1cIeLzPoT6aizu93TI7mUO5yNCu7YHStm" />
                                <span className="material-symbols-outlined text-white/50">contactless</span>
                            </div>
                            <div className="z-10">
                                <p className="text-lg tracking-widest font-mono">•••• 4242</p>
                            </div>
                            <div className="flex justify-between items-end z-10">
                                <div>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Card Holder</p>
                                    <p className="text-sm font-medium">Alex Morgan</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Expires</p>
                                    <p className="text-sm font-medium">12/25</p>
                                </div>
                            </div>
                        </div>
                        <div className="snap-center shrink-0 w-[280px] h-[160px] rounded-[1.5rem] bg-surface-light dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 p-5 flex flex-col justify-between shadow-sm relative group">
                            <div className="flex justify-between items-start">
                                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">ios</span> Pay
                                </div>
                                <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Default</div>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Linked to iCloud</p>
                                <p className="text-base font-semibold text-primary-dark dark:text-white">alex.morgan@icloud.com</p>
                            </div>
                            <div className="flex justify-end">
                                <span className="material-symbols-outlined text-neutral-300 dark:text-neutral-600">check_circle</span>
                            </div>
                        </div>
                        <button className="snap-center shrink-0 w-[80px] h-[160px] rounded-[1.5rem] bg-neutral-100 dark:bg-white/5 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex flex-col items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-primary text-[24px]">add</span>
                            </div>
                            <span className="text-xs font-bold text-primary-dark dark:text-white text-center">Add<br />New</span>
                        </button>
                    </div>
                </section>

                <section className="mt-4 px-4">
                    <h3 className="text-primary-dark dark:text-white text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-[#E8F3EB] dark:bg-[#2C3A33] flex items-center justify-center text-[#4A6E58] dark:text-[#A5C9B3]">
                                    <span className="material-symbols-outlined">chair</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-primary-dark dark:text-white">Sold: Mid-Century Lamp</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Today, 2:30 PM</span>
                                </div>
                            </div>
                            <span className="font-bold text-[#4A6E58] dark:text-[#88B89C] text-base">+$150.00</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-primary-dark dark:text-white">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-primary-dark dark:text-white">Bought: Jute Rug</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Yesterday</span>
                                </div>
                            </div>
                            <span className="font-bold text-primary-dark dark:text-white text-base">-$45.00</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-primary-dark dark:text-white">
                                    <span className="material-symbols-outlined">account_balance</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-primary-dark dark:text-white">Withdrawal to Bank</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Oct 24</span>
                                </div>
                            </div>
                            <span className="font-bold text-primary-dark dark:text-white text-base">-$500.00</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-[#E8F3EB] dark:bg-[#2C3A33] flex items-center justify-center text-[#4A6E58] dark:text-[#A5C9B3]">
                                    <span className="material-symbols-outlined">add_card</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-primary-dark dark:text-white">Wallet Top Up</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Oct 20</span>
                                </div>
                            </div>
                            <span className="font-bold text-[#4A6E58] dark:text-[#88B89C] text-base">+$200.00</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Wallet;
