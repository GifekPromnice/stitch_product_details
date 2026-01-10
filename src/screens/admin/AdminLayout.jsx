import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

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

            // Hardcoded Admin Logic
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F0] p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#6986791a] flex items-center justify-center text-[#698679] mb-6">
                    <span className="material-symbols-outlined text-3xl">desktop_windows</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Desktop Only</h1>
                <p className="text-gray-500 max-w-md">
                    The Admin Dashboard is optimized for desktop screens. Please access this page from a larger device.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-white transition-colors"
                >
                    Back to App
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
                <span className="w-8 h-8 border-4 border-[#698679]/20 border-t-[#698679] rounded-full animate-spin"></span>
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen flex bg-[#F5F5F0] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0">
                <div className="p-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#698679] text-3xl">chair</span>
                    <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Again</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = location.pathname.startsWith(link.path);
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${isActive
                                        ? 'bg-[#6986791a] text-[#698679]'
                                        : 'text-[#666666] hover:bg-gray-50'
                                    }`}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                                    {link.icon}
                                </span>
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-gray-50 rounded-[24px] p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#698679] text-white flex items-center justify-center font-bold text-lg">
                            {user.email[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-bold truncate text-[#1A1A1A]">Admin</p>
                            <p className="text-xs text-[#666666] truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Sign Out"
                        >
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
