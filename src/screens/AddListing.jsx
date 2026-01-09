import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddListing = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('Green Velvet Armchair');
    const [price, setPrice] = useState('120');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState(['Velvet', 'Green', 'Armchair']);
    const [newTag, setNewTag] = useState('');

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const navItems = [
        { name: 'Home', icon: 'home', path: '/home' },
        { name: 'Favorite', icon: 'favorite', path: '/home' },
        { name: 'Add', icon: 'add', path: '/add-listing', isAction: true },
        { name: 'Inbox', icon: 'inbox', path: '/chat' },
        { name: 'Profile', icon: 'person', path: '/profile' }
    ];

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
                <h1 className="text-base font-bold text-neutral-900 dark:text-white">New Listing</h1>
                <button className="text-primary font-semibold text-sm hover:opacity-80 transition-opacity">
                    Save Draft
                </button>
            </header>

            <main className="flex-1 flex flex-col gap-6 px-4 pt-4 overflow-y-auto no-scrollbar">
                {/* Photo Section */}
                <section className="flex flex-col gap-3 shrink-0">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm group">
                        <img
                            alt="Main listing photo"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bJa07M_itzQ3gijYycsG9oGVRVVSuSAZit6l6miQivb3H0WOacRz5BwHX5xoFBELd3LhglqwFM5Ti2CiM1pgzcqtj9Bni49PN8Olt5NtflrNOAXTOc_GuRPUXx5z3hi4XV1WhMuVTlNjuIwX_DaawLv34G2roRxvrl2JL3QUE0PPiQ72P-SWKCWRLneJJzh5d-VVtEdAFc9rC--h1zjsbTLl_eZxNSIwPCZxGgbrA5wcpousBbmDsMy3lGMdSnKiverwpu2xEmuQ"
                        />
                        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                            <span className="text-white text-xs font-medium">Cover Photo</span>
                        </div>
                        <button className="absolute top-3 right-3 bg-white/90 text-neutral-900 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                        <button className="flex flex-col items-center justify-center size-20 shrink-0 rounded-xl bg-primary/5 border-2 border-dashed border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all">
                            <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                            <span className="text-[10px] font-bold mt-1">Add</span>
                        </button>
                        <div className="relative size-20 shrink-0 rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 group shadow-sm">
                            <img
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bJa07M_itzQ3gijYycsG9oGVRVVSuSAZit6l6miQivb3H0WOacRz5BwHX5xoFBELd3LhglqwFM5Ti2CiM1pgzcqtj9Bni49PN8Olt5NtflrNOAXTOc_GuRPUXx5z3hi4XV1WhMuVTlNjuIwX_DaawLv34G2roRxvrl2JL3QUE0PPiQ72P-SWKCWRLneJJzh5d-VVtEdAFc9rC--h1zjsbTLl_eZxNSIwPCZxGgbrA5wcpousBbmDsMy3lGMdSnKiverwpu2xEmuQ"
                                alt="Thumbnail"
                            />
                            <button className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-100 backdrop-blur-sm hover:bg-black/70 transition-colors">
                                <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                        </div>
                        <div className="size-20 shrink-0 rounded-xl bg-neutral-100 dark:bg-white/5 border border-transparent"></div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider">Title</label>
                            <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                                Auto-filled
                            </span>
                        </div>
                        <input
                            className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Tags</label>
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
                                    placeholder="Add tag"
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={addTag}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Description</label>
                        <textarea
                            className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-32 px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm resize-none leading-relaxed"
                            placeholder="Describe the condition, brand, age, and any flaws..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Price</span>
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
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Category</span>
                            <select className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm">
                                <option>Living Room</option>
                                <option>Bedroom</option>
                                <option>Office</option>
                            </select>
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <label className="flex flex-col gap-1.5 flex-1 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Condition</span>
                            <select className="form-select block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm">
                                <option>Like New</option>
                                <option>Good</option>
                                <option>Fair</option>
                                <option>Used</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 w-1/3 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Color</span>
                            <input className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" type="text" defaultValue="Green" />
                        </label>
                    </div>

                    <div className="flex flex-col gap-1.5 mb-8">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider px-1">Location</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                            </div>
                            <input
                                className="block w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#232524] text-neutral-900 dark:text-white h-12 pl-11 pr-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-neutral-400 shadow-sm"
                                placeholder="Zip code or Neighborhood"
                                type="text"
                                defaultValue="Williamsburg, Brooklyn"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                                <span className="material-symbols-outlined text-[20px]">my_location</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-4 pb-8">
                    <button
                        onClick={() => navigate('/home')}
                        className="relative w-full overflow-hidden rounded-full bg-primary p-4 text-white shadow-xl shadow-primary/20 active:scale-[0.98] transition-all hover:bg-primary-dark group/button"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <span className="text-lg font-bold tracking-wide">Publish Listing</span>
                            <span className="material-symbols-outlined text-[24px] group-hover/button:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/button:animate-shimmer transition-all"></div>
                    </button>
                </div>
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 z-50 w-full max-w-md bg-background-light/95 dark:bg-[#1e201f]/95 backdrop-blur-2xl border-t border-neutral-200 dark:border-white/10 pt-2 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-end justify-around px-2">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`group flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${item.isAction ? 'relative' : 'text-neutral-400 hover:text-primary'
                                }`}
                        >
                            {item.isAction ? (
                                <>
                                    <div className="absolute -top-10 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-background-light dark:ring-[#1e201f] transition-transform active:scale-95">
                                        <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                                    </div>
                                    <span className="mt-8 text-[10px] font-bold text-primary">{item.name}</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[24px] group-hover:-translate-y-0.5 transition-transform">{item.icon}</span>
                                    <span className="text-[10px] font-medium">{item.name}</span>
                                </>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex w-full justify-center pt-2">
                    <div className="h-1 w-32 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                </div>
            </div>

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
