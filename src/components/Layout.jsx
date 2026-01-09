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

            <nav className="fixed bottom-0 w-full z-50 bg-white dark:bg-[#2C2E2D] border-t border-gray-100 dark:border-gray-800 pb-safe pt-2">
                <div className="flex justify-between items-center px-6 pb-4 h-16 max-w-md mx-auto relative">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1 group transition-all ${item.isAction ? '-mt-4' : 'w-12'
                                }`}
                        >
                            {item.isAction ? (
                                <>
                                    <div className="h-14 w-14 rounded-full bg-primary shadow-float hover:bg-primary-dark flex items-center justify-center transition-all hover:scale-105 active:scale-95">
                                        <span className="material-symbols-outlined text-white text-[32px]">{item.icon}</span>
                                    </div>
                                    <span className="text-[11px] font-semibold text-primary">
                                        {item.name}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className={`h-7 w-12 rounded-full flex items-center justify-center transition-colors ${currentPath === item.path ? 'bg-primary/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}>
                                        <span className={`material-symbols-outlined text-[24px] ${currentPath === item.path ? 'text-primary' : 'text-text-sub dark:text-gray-400'
                                            }`} style={{ fontVariationSettings: currentPath === item.path ? "'FILL' 1" : "'FILL' 0" }}>
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className={`text-[11px] transition-colors ${currentPath === item.path ? 'text-primary font-semibold' : 'text-text-sub dark:text-gray-400 font-medium'
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
