import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useSettings } from '../../context/SettingsContext';

const AdminLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Desktop Check
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 2. Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate('/admin/login');
                return;
            }

            const email = session.user.email;
            if (email === 'admin@again.app' || email === 'admin@gifek.pl' || email.includes('admin')) {
                setUser(session.user);
            } else {
                alert("Access Denied: You are not an administrator.");
                await supabase.auth.signOut();
                navigate('/admin/login');
            }
            setLoading(false);
        };

        checkAuth();
    }, [navigate]);

    if (!isDesktop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-8 text-center">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-[#698679] mb-6 border border-gray-200">
                    <span className="material-symbols-outlined text-3xl">desktop_windows</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Desktop Only</h1>
                <p className="text-sm text-gray-500 max-w-md">
                    The Admin Dashboard is optimized for desktop screens. Please access this page from a larger device.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-white transition-colors"
                >
                    Back to App
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-6 h-6 border-2 border-[#698679]/20 border-t-[#698679] rounded-full animate-spin"></span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Loading Console</span>
                </div>
            </div>
        );
    }

    const navLinks = [
        { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
        { name: 'Listings', icon: 'inventory_2', path: '/admin/listings' },
        { name: 'Users', icon: 'group', path: '/admin/users' },
        { name: 'Transactions', icon: 'payments', path: '/admin/transactions' },
        { name: 'Reports', icon: 'analytics', path: '/admin/reports' },
    ];

    const { language, toggleLanguage } = useSettings();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900 antialiased">
            {/* Sidebar */}
            <aside className="w-64 bg-[#F9FAFB] border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <span className="material-symbols-outlined text-[#698679] text-2xl">chair</span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
                            Again
                            <span className="text-[10px] bg-[#698679]/10 text-[#698679] border border-[#698679]/20 px-1.5 py-0.5 rounded font-bold uppercase">Console</span>
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname.startsWith(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-white shadow-sm border border-gray-200 text-[#698679]'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#698679]' : 'text-gray-400'}`}>
                                        {link.icon}
                                    </span>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-4 border-t border-gray-200">
                    <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center justify-between px-3 py-2 mb-4 hover:bg-gray-200/50 rounded-lg text-xs font-bold text-gray-500 transition-all uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">language</span>
                            Language
                        </div>
                        <span className="text-[#698679]">{language === 'pl' ? 'Polski' : 'English'}</span>
                    </button>

                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-gray-600 border border-gray-200 shadow-sm">
                            {user.email[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-xs font-bold truncate text-gray-900">Admin Account</p>
                            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Sign Out"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen bg-white">
                <div className="max-w-[1440px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
