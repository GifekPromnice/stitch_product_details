import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { name: 'Home', icon: 'home', path: '/home' },
        { name: 'Favorite', icon: 'favorite', path: '/favorites' },
        { name: 'Add', icon: 'add', path: '/add-listing', isAction: true },
        { name: 'Inbox', icon: 'chat_bubble', path: '/chat' },
        { name: 'Profile', icon: 'person', path: '/profile' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-gray-100 antialiased">
            <main className="flex-1 pb-24">
                {children}
            </main>

            <nav className="fixed bottom-0 w-full z-50 bg-white/95 dark:bg-[#1E201F]/95 backdrop-blur-2xl border-t border-gray-100 dark:border-white/10 pt-2 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-end justify-around px-2 max-w-md mx-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${item.isAction ? 'relative' : 'text-neutral-400 hover:text-primary'
                                }`}
                        >
                            {item.isAction ? (
                                <>
                                    <div className="absolute -top-10 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-white dark:ring-[#1E201F] transition-transform active:scale-95 group-hover:scale-105">
                                        <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                                    </div>
                                    <span className="mt-8 text-[10px] font-bold text-primary">
                                        {item.name}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={`material-symbols-outlined text-[24px] transition-transform group-hover:-translate-y-0.5 ${currentPath === item.path ? 'text-primary' : ''
                                            }`}
                                        style={{ fontVariationSettings: currentPath === item.path ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className={`text-[10px] font-medium ${currentPath === item.path ? 'text-primary font-bold' : ''
                                        }`}>
                                        {item.name}
                                    </span>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
