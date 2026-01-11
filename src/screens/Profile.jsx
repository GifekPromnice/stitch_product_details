import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Profile = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const { theme, toggleTheme, language, toggleLanguage, t } = useSettings();
    const [profileData, setProfileData] = useState({ full_name: '', created_at: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('full_name, created_at')
                    .eq('id', user.id)
                    .single();

                if (data) setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        fetchProfile();
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const menuItems = [
        {
            category: t('profile.account'),
            items: [
                { name: t('profile.personalInfo'), icon: 'person', onClick: () => navigate('/personal-information') },
                { name: t('myListings.title'), icon: 'storefront', onClick: () => navigate('/my-listings') },
                { name: t('profile.passwordSecurity'), icon: 'lock', onClick: () => navigate('/password-security') },
                { name: 'Order History', icon: 'receipt_long', onClick: () => navigate('/orders') },
                { name: t('profile.paymentMethods'), icon: 'credit_card', onClick: () => navigate('/wallet') },
            ]
        },
        {
            category: t('profile.preferences'),
            items: [
                { name: t('profile.notifications'), icon: 'notifications', isToggle: true, defaultOn: true },
                {
                    name: t('profile.darkMode'),
                    icon: 'dark_mode',
                    isToggle: true,
                    defaultOn: theme === 'dark',
                    onToggle: toggleTheme
                },
                {
                    name: t('profile.language'),
                    icon: 'language',
                    value: language === 'en' ? 'English' : 'Polski',
                    onClick: toggleLanguage
                },
            ]
        },
        {
            category: t('profile.support'),
            items: [
                { name: t('profile.helpCenter'), icon: 'help' },
                { name: t('profile.privacyPolicy'), icon: 'policy' },
            ]
        }
    ];

    const memberYear = profileData.created_at ? new Date(profileData.created_at).getFullYear() : 2024;
    const displayName = profileData.full_name || user?.email?.split('@')[0] || 'User';

    return (
        <div className="flex flex-col bg-background-light dark:bg-background-dark animate-in fade-in duration-500 min-h-screen">
            <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-6 pb-2 px-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">{t('profile.title')}</h2>
            </header>

            <main className="flex flex-col gap-4 px-4 overflow-y-auto pb-20">
                {/* Profile Header */}
                <div className="flex flex-col items-center gap-4 pt-2">
                    <div className="relative group cursor-pointer" onClick={() => navigate('/personal-information')}>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 shadow-sm ring-4 ring-white dark:ring-[#2C2E2D]"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQgCW4Muk9dbgdy6jBOSVlS0iF72meIguXixSbO_QLNpKcAB4SVg_Si4a8N71L7WXXbKLO7sSbPgfwr9ohK1HLeABfWCw52S3vlaZrQ_CSP3Yoito4qII6yQ9QxynLrNuWD03XioYkAxtkr-tTcf9jDtj9X-rKuNXxhiR0zpD6zlK57qzmtuJHh99X6o_szPSHS3CMkFQCvrwgVbFwVsn_aYN5MLcqoiSVFnTcZdFR4U7zbKEX5xK4iS0a86X3l0d741kNHjL1XC8q")' }}>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md border-2 border-white dark:border-[#2C2E2D] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">{displayName}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email}</p>
                        <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-primary">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            <p className="text-xs font-semibold">{t('profile.memberSince')} {memberYear}</p>
                        </div>
                    </div>
                </div>

                {/* Settings Menu */}
                {menuItems.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-2 text-left">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider ml-1">{group.category}</h3>
                        <div className="flex flex-col bg-white dark:bg-[#2C2E2D] rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                            {group.items.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={item.isToggle ? item.onToggle : item.onClick}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group"
                                >
                                    <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-medium truncate text-gray-900 dark:text-white">{item.name}</p>
                                    </div>
                                    {item.isToggle ? (
                                        <div className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${item.defaultOn ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.defaultOn ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                        </div>
                                    ) : item.value ? (
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{item.value}</span>
                                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                                        </div>
                                    ) : (
                                        <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Log Out */}
                <div className="flex flex-col gap-4 mt-4 text-center pb-8">
                    <button onClick={handleLogout}
                        className="w-full bg-white dark:bg-[#2C2E2D] text-red-500 font-semibold py-4 rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">logout</span>
                        {t('profile.logout')}
                    </button>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Again v2.5.0 (Build 305)
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Profile;
