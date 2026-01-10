import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const result = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            username: username,
                            phone: phone,
                            address: address,
                        },
                    },
                });

                if (result.error) throw result.error;

                alert('Success! Check your email to verify your account.');
            } else {
                const result = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (result.error) throw result.error;

                navigate('/home');
            }
        } catch (err) {
            console.error('Auth Error:', err.message);
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#131515] dark:text-[#f7f7f7] min-h-screen flex flex-col overflow-x-hidden animate-in fade-in duration-500">
            <div className="relative w-full max-w-md mx-auto flex-grow flex flex-col pb-4">
                {/* Hero section */}
                <div className="relative w-full h-[25vh] min-h-[200px] bg-neutral-200 dark:bg-neutral-800 rounded-b-[2.5rem] overflow-hidden shrink-0 group mb-6">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsIAMIHhUp829ipJYyDY3FjSDunlxujGtmQMv8RYT5SAo15RTHJIafD6KMH9KMXjNWQd6aMVIEkV99IF_7O7IUBcZJFuaVm2ldMhS9LtoPDUCc-SDJVhf2KM0GvfNbtbkQJ3GSboLTGA8z3_BJfOJJPnlsAlGXSoo99e-9CamEDz2X_WYBgSrMxgHjROnqhGd8qAMmMuEl7GujK6YGBZpBt-puE8elnjwYywMcE922UdwRRRf4UzRg6OCOWwgJg-CHCJreYLtQaEKv")' }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full text-left">
                        <div className="flex items-center gap-2 mb-2 opacity-90">
                            <span className="material-symbols-outlined text-white text-[28px]">chair</span>
                            <p className="text-white tracking-wide text-sm font-semibold uppercase">Again</p>
                        </div>
                        <h1 className="text-white tracking-tight text-[28px] font-bold leading-tight">Find your next<br />treasure.</h1>
                    </div>
                </div>

                <div className="flex-1 flex flex-col px-5 relative z-10">
                    <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                        {/* Tab Switcher */}
                        <div className="bg-white dark:bg-[#232524] rounded-full shadow-lg shadow-black/5 p-1.5 flex mb-1 mx-2">
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className={`flex-1 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${mode === 'login' ? 'bg-primary text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('signup')}
                                className={`flex-1 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${mode === 'signup' ? 'bg-primary text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Inputs */}
                        {mode === 'signup' && (
                            <>
                                <div className="group text-left">
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 pl-1">Login (Username)</label>
                                    <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                        <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">account_circle</span>
                                        <input
                                            className="w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                            placeholder="cool_user123"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={mode === 'signup'}
                                        />
                                    </div>
                                </div>

                                <div className="group text-left">
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 pl-1">Full Name</label>
                                    <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                        <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">person</span>
                                        <input
                                            className="w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                            placeholder="John Doe"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required={mode === 'signup'}
                                        />
                                    </div>
                                </div>

                                <div className="group text-left">
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 pl-1">Phone Number</label>
                                    <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                        <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">call</span>
                                        <input
                                            className="w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                            placeholder="+48 123 456 789"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required={mode === 'signup'}
                                        />
                                    </div>
                                </div>

                                <div className="group text-left">
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 pl-1">Address</label>
                                    <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                        <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">home</span>
                                        <input
                                            className="w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                            placeholder="Street 1, City"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required={mode === 'signup'}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="group text-left">
                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1 pl-1">Email Address</label>
                            <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">mail</span>
                                <input
                                    className="w-full h-12 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                    placeholder="hello@again.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="group text-left">
                            <div className="flex justify-between items-center mb-1 pl-1">
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">Password</label>
                            </div>
                            <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">lock</span>
                                <input
                                    className="w-full h-12 pl-12 pr-12 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {mode === 'signup' && (
                            <div className="flex items-start gap-3 mt-1 px-1 text-left">
                                <div className="flex items-center h-5 mt-0.5">
                                    <input className="w-5 h-5 border border-neutral-300 rounded text-primary focus:ring-primary/25 bg-neutral-50 dark:bg-[#2c2e2d] dark:border-neutral-600" id="terms" type="checkbox" required />
                                </div>
                                <label className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug" htmlFor="terms">
                                    I agree to the <button type="button" className="text-primary font-semibold hover:underline">Terms of Service</button> and <button type="button" className="text-primary font-semibold hover:underline">Privacy Policy</button>.
                                </label>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className={`w-full h-14 mt-2 bg-primary hover:bg-[#5a7368] text-white font-bold text-lg rounded-full shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading && <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>}
                            <span>{loading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Sign Up')}</span>
                            {!loading && <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                        </button>
                    </form>

                    <div className="mt-auto py-6 text-center border-t border-dashed border-neutral-200 dark:border-neutral-800 mt-6">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="text-primary font-bold hover:underline"
                            >
                                {mode === 'login' ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
