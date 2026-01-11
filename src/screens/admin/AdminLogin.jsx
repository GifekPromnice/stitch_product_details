import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Standard Supabase Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            console.log("Admin Login Success:", data);

            const normalizedEmail = email.toLowerCase();

            // Hardcoded check for admin emails
            if (normalizedEmail === 'admin@again.app' || normalizedEmail === 'admin@gifek.pl' || normalizedEmail.includes('admin')) {
                // Validate user data before storage
                if (!data.user) {
                    console.error("AdminLogin: No user data returned from Supabase despite success.");
                    throw new Error("Login validation failed: Missing user data.");
                }

                // Set custom Admin Token for persistent session
                const adminSession = {
                    user: data.user,
                    timestamp: new Date().toISOString()
                };
                console.log("AdminLogin: Setting token", adminSession);
                localStorage.setItem('SB_ADMIN_TOKEN', JSON.stringify(adminSession));

                navigate('/admin/dashboard');
            } else {
                navigate('/admin/dashboard'); // Fallback for dev/testing
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#698679] blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#698679] blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6986791a] mb-4 text-[#698679]">
                        <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage Again app</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#698679] focus:ring-0 transition-all outline-none"
                            placeholder="admin@again.app"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#698679] focus:ring-0 transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#698679] hover:bg-[#5a7469] text-white font-semibold rounded-xl shadow-lg shadow-[#698679]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">Restricted Access. Authorized Personnel Only.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
