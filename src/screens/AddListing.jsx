import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const AddListing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useSettings();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('sofas');
    const [condition, setCondition] = useState('Good');
    const [color, setColor] = useState('');
    const [location, setLocation] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);

    // Mock header image for now, in a real app this would upload to Storage
    const [image, setImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuB1bJa07M_itzQ3gijYycsG9oGVRVVSuSAZit6l6miQivb3H0WOacRz5BwHX5xoFBELd3LhglqwFM5Ti2CiM1pgzcqtj9Bni49PN8Olt5NtflrNOAXTOc_GuRPUXx5z3hi4XV1WhMuVTlNjuIwX_DaawLv34G2roRxvrl2JL3QUE0PPiQ72P-SWKCWRLneJJzh5d-VVtEdAFc9rC--h1zjsbTLl_eZxNSIwPCZxGgbrA5wcpousBbmDsMy3lGMdSnKiverwpu2xEmuQ');

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handlePublish = async () => {
        if (!user) {
            alert('You must be logged in to publish a listing.');
            navigate('/auth');
            return;
        }

        if (!title || !price || !category) {
            alert('Please fill in required fields (Title, Price, Category)');
            return;
        }

        setIsPublishing(true);

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    title,
                    price: parseFloat(price),
                    description,
                    category,
                    image,
                    location,
                    aspect: '4/3', // Default aspect ratio
                    is_new: condition === 'Like New',
                    rating: 0,
                    reviews_count: 0,
                    user_id: user.id
                }
            ]);

        setIsPublishing(false);

        if (error) {
            console.error('Error adding product:', error);
            alert('Failed to publish listing: ' + error.message);
        } else {
            navigate('/home');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-neutral-900 dark:text-gray-100 antialiased selection:bg-primary/30 pb-24 mx-auto max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-200 dark:border-white/10">
                <button
                    onClick={() => navigate('/home')}
                    className="flex size-10 items-center justify-center rounded-full text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
                <h1 className="text-base font-bold text-neutral-900 dark:text-white">{t('addListing.title')}</h1>
                <button className="text-primary font-semibold text-sm hover:opacity-80 transition-opacity">
                    {t('addListing.saveDraft')}
                </button>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-4 pt-4 overflow-y-auto no-scrollbar">
                {/* Photo Section */}
                <section className="flex flex-col gap-3 shrink-0">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm group">
                        <img
                            alt="Main listing photo"
                            className="h-full w-full object-cover"
                            src={image}
                        />
                        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                            <span className="text-white text-xs font-medium">{t('addListing.coverPhoto')}</span>
                        </div>
                        <button className="absolute top-3 right-3 bg-white/90 text-neutral-900 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                        <button className="flex flex-col items-center justify-center size-20 shrink-0 rounded-xl bg-primary/5 border-2 border-dashed border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all">
                            <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                            <span className="text-[10px] font-bold mt-1">{t('addListing.addPhoto')}</span>
                        </button>
                        {/* Example thumbnail */}
                        <div className="relative size-20 shrink-0 rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 group shadow-sm">
                            <img
                                className="h-full w-full object-cover"
                                src={image}
                                alt="Thumbnail"
                            />
                            <button className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-100 backdrop-blur-sm hover:bg-black/70 transition-colors">
                                <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider">{t('addListing.field.title')}</label>
                        </div>
                        <input
                            className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.tags')}</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <div key={tag} className="flex h-8 items-center justify-center gap-x-1.5 rounded-lg bg-primary/10 border border-primary/20 pl-3 pr-2 transition-colors">
                                    <span className="text-primary text-sm font-medium">{tag}</span>
                                    <button onClick={() => removeTag(tag)} className="text-primary/60 hover:text-primary">
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>
                            ))}
                            <div className="flex h-8 items-center rounded-lg bg-white dark:bg-[#232524] border border-neutral-200 dark:border-neutral-700 px-3 shadow-sm">
                                <span className="material-symbols-outlined text-neutral-400 text-[18px] mr-1">add</span>
                                <input
                                    className="w-20 bg-transparent border-none p-0 text-sm focus:ring-0 placeholder:text-neutral-400 text-neutral-900 dark:text-white"
                                    placeholder={t('addListing.addTagPlaceholder')}
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={addTag}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.description')}</label>
                        <textarea
                            className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-32 px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm resize-none leading-relaxed"
                            placeholder={t('addListing.descriptionPlaceholder')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.price')}</span>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">$</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-8 pr-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.category')}</span>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            >
                                <option value="sofas">Sofas</option>
                                <option value="tables">Tables</option>
                                <option value="lighting">Lighting</option>
                                <option value="chairs">Chairs</option>
                                <option value="shelves">Shelves</option>
                                <option value="rugs">Rugs</option>
                                <option value="decor">Decor</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <label className="flex flex-col gap-1.5 flex-1 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.condition')}</span>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            >
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Used">Used</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 w-1/3 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.color')}</span>
                            <input
                                className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-1.5 mb-8">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.location')}</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                            </div>
                            <input
                                className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-11 pr-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm"
                                placeholder={t('addListing.locationPlaceholder')}
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                                <span className="material-symbols-outlined text-[20px]">my_location</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-4 pb-8">
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className={`relative w-full overflow-hidden rounded-full bg-primary p-4 text-white shadow-xl shadow-primary/20 active:scale-[0.98] transition-all hover:bg-primary-dark group/button ${isPublishing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isPublishing && <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>}
                            <span className="text-lg font-bold tracking-wide">{isPublishing ? t('addListing.publishing') : t('addListing.publish')}</span>
                            {!isPublishing && <span className="material-symbols-outlined text-[24px] group-hover/button:translate-x-1 transition-transform">arrow_forward</span>}
                        </div>
                        {/* Shimmer Effect */}
                        {!isPublishing && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/button:animate-shimmer transition-all"></div>}
                    </button>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}} />
        </div>
    );
};

export default AddListing;
