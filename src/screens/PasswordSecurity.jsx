import { useNavigate } from 'react-router-dom';

const PasswordSecurity = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-user-primary-light dark:text-user-primary-dark overflow-x-hidden selection:bg-primary/30 animate-in fade-in duration-500">
            <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-200">
                <div className="flex items-center px-4 py-3 justify-between pb-safe pt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-user-primary-light dark:text-user-primary-dark"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Password & Security</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6 px-4 pt-4 pb-12">
                <div className="flex flex-col gap-2">
                    <h3 className="text-user-secondary-light dark:text-user-secondary-dark text-sm font-semibold uppercase tracking-wider ml-1">Login Methods</h3>
                    <div className="flex flex-col bg-white dark:bg-[#2C2E2D] rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                        <button className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium truncate">Change Email</p>
                                <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark truncate">alex.johnson@email.com</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                        </button>
                        <button className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">lock_reset</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium truncate">Change Password</p>
                                <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark truncate">Last updated 3 months ago</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                        </button>
                        <button className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">smartphone</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium truncate">Update Phone Number</p>
                                <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark truncate">+1 (555) ••• ••89</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-user-secondary-light dark:text-user-secondary-dark text-sm font-semibold uppercase tracking-wider ml-1">Security Options</h3>
                    <div className="flex flex-col bg-white dark:bg-[#2C2E2D] rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                        <div className="flex items-center gap-4 p-4 justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">shield</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark">Recommended for security</p>
                                </div>
                            </div>
                            <label className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                                <span className="sr-only">Toggle 2FA</span>
                                <input type="checkbox" className="sr-only" defaultChecked />
                                <span className="translate-x-5 pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </label>
                        </div>
                        <div className="flex items-center gap-4 p-4 justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">fingerprint</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium">Biometric Login</p>
                                    <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark">FaceID or TouchID</p>
                                </div>
                            </div>
                            <label className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                <span className="sr-only">Toggle Biometric</span>
                                <input type="checkbox" className="sr-only" />
                                <span className="translate-x-0 pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </label>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-user-secondary-light dark:text-user-secondary-dark px-2 leading-relaxed">
                        Turning on Two-Factor Authentication will require a verification code sent to your email or phone when you log in from a new device.
                    </p>
                </div>
                <div className="pt-4">
                    <button className="w-full bg-primary text-white font-semibold h-14 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-base">
                        Save Changes
                    </button>
                </div>
                <div className="mt-auto pt-4 pb-4">
                    <p className="text-center text-xs text-user-secondary-light dark:text-user-secondary-dark">
                        Again v2.4.0 (Build 302)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordSecurity;
