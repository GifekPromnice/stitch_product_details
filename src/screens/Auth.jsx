import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                // You might want to show a message to check email for verification
                alert('Success! Check your email to verify your account.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/home');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#131515] dark:text-[#f7f7f7] min-h-screen flex flex-col overflow-x-hidden animate-in fade-in duration-500">
            <div className="relative w-full max-w-md mx-auto flex-grow flex flex-col pb-4">
                {/* Hero section */}
                <div className="relative w-full h-[35vh] min-h-[260px] bg-neutral-200 dark:bg-neutral-800 rounded-b-[2.5rem] overflow-hidden shrink-0 group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsIAMIHhUp829ipJYyDY3FjSDunlxujGtmQMv8RYT5SAo15RTHJIafD6KMH9KMXjNWQd6aMVIEkV99IF_7O7IUBcZJFuaVm2ldMhS9LtoPDUCc-SDJVhf2KM0GvfNbtbkQJ3GSboLTGA8z3_BJfOJJPnlsAlGXSoo99e-9CamEDz2X_WYBgSrMxgHjROnqhGd8qAMmMuEl7GujK6YGBZpBt-puE8elnjwYywMcE922UdwRRRf4UzRg6OCOWwgJg-CHCJreYLtQaEKv")' }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full text-left">
                        <div className="flex items-center gap-2 mb-2 opacity-90">
                            <span className="material-symbols-outlined text-white text-[28px]">chair</span>
                            <p className="text-white tracking-wide text-sm font-semibold uppercase">Again</p>
                        </div>
                        <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">Find your next<br />treasure.</h1>
                    </div>
                </div>

                <div className="flex-1 flex flex-col px-5 relative z-10 -mt-6">
                    <form className="flex flex-col gap-5" onSubmit={handleAuth}>
                        {/* Tab Switcher */}
                        <div className="bg-white dark:bg-[#232524] rounded-full shadow-lg shadow-black/5 p-1.5 flex mb-1 mx-2">
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className={`flex-1 h-12 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${mode === 'login' ? 'bg-primary text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('signup')}
                                className={`flex-1 h-12 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${mode === 'signup' ? 'bg-primary text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Text Header */}
                        <div className="mb-1 text-left">
                            <h2 className="text-2xl font-bold text-[#131515] dark:text-white">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                                {mode === 'login' ? 'Enter your details to access your account.' : 'Join Again to find unique furniture.'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Inputs */}
                        {mode === 'signup' && (
                            <div className="group text-left">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 pl-1">Full Name</label>
                                <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                    <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">person</span>
                                    <input
                                        className="w-full h-14 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                        placeholder="John Doe"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required={mode === 'signup'}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="group text-left">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 pl-1">Email Address</label>
                            <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">mail</span>
                                <input
                                    className="w-full h-14 pl-12 pr-4 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                    placeholder="hello@again.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="group text-left">
                            <div className="flex justify-between items-center mb-2 pl-1">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                                {mode === 'login' && (
                                    <button type="button" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Forgot Password?</button>
                                )}
                            </div>
                            <div className="relative flex items-center w-full rounded-2xl bg-neutral-100 dark:bg-[#2c2e2d] focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent focus-within:bg-white dark:focus-within:bg-black focus-within:border-primary">
                                <span className="material-symbols-outlined absolute left-4 text-neutral-400 transition-colors">lock</span>
                                <input
                                    className="w-full h-14 pl-12 pr-12 bg-transparent border-none rounded-2xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 text-base font-normal"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button className="absolute right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex items-center" type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
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

                    {/* Footer */}
                    <div className="relative flex py-8 items-center">
                        <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
                        <span className="flex-shrink-0 mx-4 text-neutral-400 text-xs uppercase tracking-wider font-bold">Or continue with</span>
                        <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="flex items-center justify-center h-14 bg-white dark:bg-[#232524] border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-neutral-50 dark:hover:bg-[#363837] transition-all active:scale-95 shadow-sm">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Google</span>
                        </button>
                        <button className="flex items-center justify-center h-14 bg-white dark:bg-[#232524] border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-neutral-50 dark:hover:bg-[#363837] transition-all active:scale-95 shadow-sm">
                            <span className="material-symbols-outlined mr-2 text-black dark:text-white text-[24px]">ios</span>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">Apple</span>
                        </button>
                    </div>

                    <div className="mt-auto py-6 text-center border-t border-dashed border-neutral-200 dark:border-neutral-800">
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
