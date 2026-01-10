import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { analyzeImageWithAI } from '../utils/aiService';

const AddListing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useSettings();
    const fileInputRef = useRef(null);
    const tagInputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('sofas');
    const [condition, setCondition] = useState('good');
    const [color, setColor] = useState('black');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null); // Default empty
    const [imageFile, setImageFile] = useState(null);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            setTags([...tags, newTag.trim()]);
            setNewTag('');
            // Ensure input stays focused for rapid entry
            setTimeout(() => {
                if (tagInputRef.current) tagInputRef.current.focus();
            }, 0);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);

            // Analyze Text/Content via Mock AI
            setIsAnalyzing(true);
            try {
                const aiData = await analyzeImageWithAI(file);

                // Auto-fill logic
                if (aiData) {
                    console.log("AI UI DEBUG: Otrzymano dane do autouzupełniania:", aiData);
                    if (aiData.title) setTitle(String(aiData.title));
                    if (aiData.price) setPrice(String(aiData.price));
                    if (aiData.category) setCategory(String(aiData.category).toLowerCase());
                    if (aiData.condition) setCondition(String(aiData.condition).toLowerCase());
                    if (aiData.color) setColor(String(aiData.color).toLowerCase());
                    if (aiData.description) setDescription(String(aiData.description));
                    if (aiData.height) setHeight(String(aiData.height));
                    if (aiData.width) setWidth(String(aiData.width));
                    if (aiData.depth) setDepth(String(aiData.depth));

                    // Merge tags 
                    if (Array.isArray(aiData.tags)) {
                        const uniqueTags = [...new Set([...tags, ...aiData.tags])];
                        setTags(uniqueTags);
                    }
                }
            } catch (err) {
                console.error("AI Analysis UI Error:", err);
                alert("Błąd AI: " + (err.message || "Nie udało się przeanalizować zdjęcia."));
            } finally {
                setIsAnalyzing(false);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
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
        let imageUrl = image;

        // Upload image if selected
        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                alert('Failed to upload image: ' + uploadError.message);
                setIsPublishing(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const productData = {
            title,
            price: parseFloat(price),
            description,
            category,
            image: imageUrl,
            location,
            aspect: '4/3',
            is_new: condition === 'new',
            rating: 0,
            reviews_count: 0,
            user_id: user.id,
            tags: tags,
            height: height ? parseFloat(height) : null,
            width: width ? parseFloat(width) : null,
            depth: depth ? parseFloat(depth) : null,
        };

        console.log("PUBLISH DEBUG: Wysyłanie danych do bazy:", productData);

        const { data, error } = await supabase
            .from('products')
            .insert([productData]);

        setIsPublishing(false);

        if (error) {
            console.error('Error adding product:', error);
            alert('Failed to publish listing: ' + error.message);
        } else {
            // Reset form
            setTitle('');
            setPrice('');
            setDescription('');
            setTags([]);
            setCategory('sofas');
            setCondition('good');
            setColor('black');
            setLocation('');
            setImage(null);
            setImageFile(null);
            setHeight('');
            setWidth('');
            setDepth('');

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
                <button className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center size-10 rounded-full hover:bg-primary/10">
                    <span className="material-symbols-outlined text-[24px]">save</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-4 pt-4 overflow-y-auto no-scrollbar">
                {/* Photo Section */}
                <section className="flex flex-col gap-3 shrink-0">
                    <div
                        onClick={!image ? triggerFileInput : undefined}
                        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group transition-all ${!image ? 'bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-600 cursor-pointer hover:border-primary hover:bg-primary/5' : 'bg-neutral-200 dark:bg-neutral-800'
                            }`}
                    >
                        {image ? (
                            <>
                                <img
                                    alt="Main listing photo"
                                    className="h-full w-full object-cover"
                                    src={image}
                                />
                                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                                    <span className="text-white text-xs font-medium">{t('addListing.coverPhoto')}</span>
                                </div>
                                {isAnalyzing && (
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center flex-col gap-2 z-10 animate-in fade-in duration-300">
                                        <span className="material-symbols-outlined animate-spin text-white text-3xl">auto_awesome</span>
                                        <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">AI Analyzing...</span>
                                    </div>
                                )}
                                <button
                                    onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                                    className="absolute top-3 right-3 bg-white/90 text-neutral-900 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
                                <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                                <span className="text-sm font-medium">{t('addListing.addPhoto')}</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            hidden
                        />
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
                            <div className="flex h-12 items-center rounded-xl bg-white dark:bg-[#232524] border border-neutral-200 dark:border-neutral-700 px-3 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <span className="material-symbols-outlined text-neutral-400 text-[20px] mr-2">add</span>
                                <input
                                    ref={tagInputRef}
                                    className="flex-1 bg-transparent border-none p-0 text-base focus:ring-0 placeholder:text-neutral-400 text-neutral-900 dark:text-white font-medium"
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

                    <div className="grid grid-cols-3 gap-4">
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.height')}</span>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400 uppercase">cm</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-3 pr-8 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    placeholder="0"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.width')}</span>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400 uppercase">cm</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-3 pr-8 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    placeholder="0"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.depth')}</span>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400 uppercase">cm</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-3 pr-8 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    placeholder="0"
                                    value={depth}
                                    onChange={(e) => setDepth(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.price')}</span>
                            <div className="relative">
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">{t('currency')}</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-12 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
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
                                {['sofas', 'tables', 'lighting', 'chairs', 'shelves', 'rugs', 'kitchens', 'wardrobes', 'lamps', 'drawers', 'decor'].map(cat => (
                                    <option key={cat} value={cat}>{t(`cat.${cat}`)}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.condition')}</span>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            >
                                {['new', 'good', 'fair', 'used'].map(c => (
                                    <option key={c} value={c}>{t(`cond.${c}`)}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">{t('addListing.field.color')}</span>
                            <select
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            >
                                {['black', 'white', 'gray', 'beige', 'brown', 'red', 'blue', 'green', 'yellow', 'other'].map(c => (
                                    <option key={c} value={c}>{t(`col.${c}`)}</option>
                                ))}
                            </select>
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
        </div >
    );
};
export default AddListing;
