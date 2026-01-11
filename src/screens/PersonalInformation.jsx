import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';

const PersonalInformation = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useSettings();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        city: '',
        bio: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('full_name, phone, city, bio')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setFormData({
                        full_name: data.full_name || '',
                        phone: data.phone || '',
                        city: data.city || '',
                        bio: data.bio || ''
                    });
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update(formData)
                .eq('id', user.id);

            if (error) throw error;
            navigate('/profile');
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-user-primary-light dark:text-user-primary-dark overflow-x-hidden selection:bg-primary/30 pb-28 animate-in fade-in duration-500">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-200">
                <div className="flex items-center px-4 py-3 justify-between pb-safe pt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-user-primary-light dark:text-user-primary-dark"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">{t('personalInfo.title')}</h2>
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4 pt-6 px-4">
                    <div className="relative group cursor-pointer">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-sm ring-4 ring-white dark:ring-[#2C2E2D]"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQgCW4Muk9dbgdy6jBOSVlS0iF72meIguXixSbO_QLNpKcAB4SVg_Si4a8N71L7WXXbKLO7sSbPgfwr9ohK1HLeABfWCw52S3vlaZrQ_CSP3Yoito4qII6yQ9QxynLrNuWD03XioYkAxtkr-tTcf9jDtj9X-rKuNXxhiR0zpD6zlK57qzmtuJHh99X6o_szPSHS3CMkFQCvrwgVbFwVsn_aYN5MLcqoiSVFnTcZdFR4U7zbKEX5xK4iS0a86X3l0d741kNHjL1XC8q")' }}
                        >
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2.5 shadow-md border-2 border-white dark:border-[#2C2E2D] flex items-center justify-center hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                        </div>
                    </div>
                    <p className="text-sm text-primary font-semibold cursor-pointer hover:underline decoration-2 underline-offset-4">{t('personalInfo.changePhoto')}</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5 px-4 mt-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="full_name">{t('personalInfo.fullName')}</label>
                        <div className="relative group">
                            <input
                                className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none"
                                id="full_name"
                                name="full_name"
                                type="text"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="ex. Alex Johnson"
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="phone">{t('personalInfo.phone')}</label>
                        <div className="relative group">
                            <input
                                className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none"
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+48 ..."
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">call</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="city">{t('personalInfo.city')}</label>
                        <div className="relative group">
                            <input
                                className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none"
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Warszawa"
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">location_city</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark" htmlFor="bio">{t('personalInfo.bio')}</label>
                            <span className="text-xs text-user-secondary-light/70 dark:text-user-secondary-dark/70">{t('personalInfo.bioOptional')}</span>
                        </div>
                        <textarea
                            className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 px-4 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 resize-none transition-shadow outline-none"
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder={t('personalInfo.bioPlaceholder')}
                            rows="4"
                        ></textarea>
                    </div>
                </form>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-t border-gray-200/50 dark:border-gray-800/50">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-[#5a7469] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {saving ? t('personalInfo.saving') : t('personalInfo.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
