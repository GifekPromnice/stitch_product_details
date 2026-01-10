import { useNavigate } from 'react-router-dom';

const PersonalInformation = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-user-primary-light dark:text-user-primary-dark overflow-x-hidden selection:bg-primary/30 pb-28 animate-in fade-in duration-500">
            <div className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-200">
                <div className="flex items-center px-4 py-3 justify-between pb-safe pt-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-user-primary-light dark:text-user-primary-dark"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Personal Information</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
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
                    <p className="text-sm text-primary font-semibold cursor-pointer hover:underline decoration-2 underline-offset-4">Change Photo</p>
                </div>
                <form className="flex flex-col gap-5 px-4 mt-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="fullname">Full Name</label>
                        <div className="relative group">
                            <input className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none" id="fullname" name="fullname" type="text" defaultValue="Alex Johnson" />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="phone">Phone Number</label>
                        <div className="relative group">
                            <input className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none" id="phone" name="phone" type="tel" defaultValue="+1 (555) 012-3456" />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">call</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark ml-1" htmlFor="city">City</label>
                        <div className="relative group">
                            <input className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 pl-4 pr-12 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 transition-shadow outline-none" id="city" name="city" type="text" defaultValue="Portland" />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">location_city</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-semibold text-user-secondary-light dark:text-user-secondary-dark" htmlFor="bio">Bio</label>
                            <span className="text-xs text-user-secondary-light/70 dark:text-user-secondary-dark/70">Optional</span>
                        </div>
                        <textarea className="w-full rounded-xl border-none bg-white dark:bg-[#2C2E2D] py-4 px-4 text-user-primary-light dark:text-user-primary-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary dark:focus:ring-primary placeholder:text-gray-400 resize-none transition-shadow outline-none" id="bio" name="bio" placeholder="Tell us a little about yourself..." rows="4" defaultValue="Passionate about mid-century modern design. Searching for the perfect teak sideboard for my living room."></textarea>
                        <p className="text-xs text-user-secondary-light dark:text-user-secondary-dark text-right mr-1">120/300</p>
                    </div>
                </form>
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-t border-gray-200/50 dark:border-gray-800/50">
                <div className="max-w-lg mx-auto">
                    <button className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-[#5a7469] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
