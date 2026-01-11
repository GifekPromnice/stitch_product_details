import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useSettings } from '../context/SettingsContext';

const PasswordSecurity = () => {
    const navigate = useNavigate();
    const { t } = useSettings();
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            alert(t('security.passwordsDoNotMatch') || "Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: passwords.new });
            if (error) throw error;
            alert(t('security.passwordUpdated'));
            setChangingPassword(false);
            setPasswords({ new: '', confirm: '' });
        } catch (err) {
            console.error("Error updating password:", err);
            alert("Failed to update password: " + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">{t('security.title')}</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6 px-4 pt-4 pb-12 w-full max-w-lg mx-auto">
                <div className="flex flex-col gap-2">
                    <h3 className="text-user-secondary-light dark:text-user-secondary-dark text-sm font-semibold uppercase tracking-wider ml-1">{t('security.loginMethods')}</h3>
                    <div className="flex flex-col bg-white dark:bg-[#2C2E2D] rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                        {/* Change Email */}
                        <button className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium truncate">{t('security.changeEmail')}</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                        </button>

                        {/* Change Password */}
                        {!changingPassword ? (
                            <button
                                onClick={() => setChangingPassword(true)}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group"
                            >
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined">lock_reset</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate">{t('security.changePassword')}</p>
                                    <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark truncate">{t('security.lastUpdated')} 3 months ago</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                            </button>
                        ) : (
                            <div className="p-4 bg-gray-50 dark:bg-white/5 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        placeholder={t('security.newPassword')}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 p-3 text-sm"
                                        value={passwords.new}
                                        onChange={e => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                    />
                                    <input
                                        type="password"
                                        placeholder={t('security.confirmPassword')}
                                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 p-3 text-sm"
                                        value={passwords.confirm}
                                        onChange={e => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleChangePassword}
                                            disabled={loading}
                                            className="flex-1 bg-primary text-white p-2 rounded-lg text-sm font-bold"
                                        >
                                            {loading ? '...' : t('security.updatePassword')}
                                        </button>
                                        <button
                                            onClick={() => setChangingPassword(false)}
                                            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left w-full group">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">smartphone</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium truncate">{t('security.updatePhone')}</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-user-secondary-light dark:text-user-secondary-dark text-sm font-semibold uppercase tracking-wider ml-1">{t('security.securityOptions')}</h3>
                    <div className="flex flex-col bg-white dark:bg-[#2C2E2D] rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                        <div className="flex items-center gap-4 p-4 justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">shield</span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium">{t('security.2fa')}</p>
                                    <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark">{t('security.2faDesc')}</p>
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
                                    <p className="text-base font-medium">{t('security.biometric')}</p>
                                    <p className="text-sm text-user-secondary-light dark:text-user-secondary-dark">{t('security.biometricDesc')}</p>
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
                        {t('security.2faDisclaimer')}
                    </p>
                </div>
                <div className="pt-4">
                    <button className="w-full bg-primary text-white font-semibold h-14 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-base">
                        {t('personalInfo.save')}
                    </button>
                </div>
                <div className="mt-auto pt-4 pb-4">
                    <p className="text-center text-xs text-user-secondary-light dark:text-user-secondary-dark">
                        Again v2.5.0 (Build 305)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordSecurity;
