import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddListing = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('Green Velvet Armchair');
    const [price, setPrice] = useState('$120');

    return (
        <div className="relative flex h-screen w-full flex-col bg-black overflow-hidden text-neutral-900 antialiased selection:bg-primary/30">
            {/* Camera Hero Section */}
            <div className="absolute inset-0 h-full w-full z-0">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bJa07M_itzQ3gijYycsG9oGVRVVSuSAZit6l6miQivb3H0WOacRz5BwHX5xoFBELd3LhglqwFM5Ti2CiM1pgzcqtj9Bni49PN8Olt5NtflrNOAXTOc_GuRPUXx5z3hi4XV1WhMuVTlNjuIwX_DaawLv34G2roRxvrl2JL3QUE0PPiQ72P-SWKCWRLneJJzh5d-VVtEdAFc9rC--h1zjsbTLl_eZxNSIwPCZxGgbrA5wcpousBbmDsMy3lGMdSnKiverwpu2xEmuQ"
                    alt="Camera view of armchair"
                    className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Scanning Reticle */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none pb-40">
                <div className="relative w-72 h-72 border border-white/30 rounded-[2rem] flex flex-col justify-between p-4 opacity-50 bg-white/5 backdrop-blur-[2px]">
                    <div className="flex justify-between w-full">
                        <div className="w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl drop-shadow-md"></div>
                        <div className="w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl drop-shadow-md"></div>
                    </div>
                    {/* Pulsing scan line */}
                    <div className="w-full h-[1px] bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] absolute top-1/2 left-0 -translate-y-1/2 animate-pulse"></div>
                    <div className="flex justify-between w-full">
                        <div className="w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl drop-shadow-md"></div>
                        <div className="w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl drop-shadow-md"></div>
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
                        <span className="material-symbols-outlined text-white text-[16px]">check_circle</span>
                        <span className="text-white text-xs font-medium tracking-wide">Analysis Complete</span>
                    </div>
                </div>
            </div>

            {/* Top Bar Controls */}
            <div className="relative z-10 flex items-center justify-between p-4 pt-12 w-full">
                <button
                    onClick={() => navigate('/home')}
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
                <div className="flex gap-3">
                    <button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">flash_on</span>
                    </button>
                    <button className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">photo_library</span>
                    </button>
                </div>
            </div>

            <div className="flex-1"></div>

            {/* Bottom Sheet Wizard */}
            <div className="relative z-20 w-full flex flex-col bg-[#f7f7f7] dark:bg-[#1e201f] backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.3)] border-t border-white/20 dark:border-white/5 transition-all duration-500 ease-out translate-y-0 pb-32 overflow-y-auto max-h-[85vh] no-scrollbar">
                <div className="flex w-full justify-center pt-3 pb-1 sticky top-0 z-30 bg-inherit rounded-t-[2.5rem]">
                    <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                </div>

                <div className="px-6 pb-2 pt-2 flex flex-col h-full text-left">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-[24px] animate-pulse">auto_awesome</span>
                        <h3 className="text-neutral-900 dark:text-neutral-50 tracking-tight text-lg font-bold">AI Wizard detected:</h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pb-6">
                        {['Velvet', 'Green', 'Armchair'].map((tag) => (
                            <div key={tag} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 border border-primary/20 pl-3 pr-4 transition-transform active:scale-95 cursor-pointer">
                                <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                                <p className="text-primary text-sm font-semibold leading-normal">{tag}</p>
                            </div>
                        ))}
                        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-neutral-200 dark:bg-neutral-700 pl-4 pr-4 border border-transparent transition-transform active:scale-95 cursor-pointer opacity-60">
                            <p className="text-neutral-600 dark:text-neutral-300 text-sm font-medium leading-normal">Mid-Century</p>
                        </div>
                    </div>

                    {/* Photos Preview */}
                    <div className="mb-6">
                        <div className="flex justify-between items-end mb-3 px-1">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider">Photos</span>
                            <span className="text-primary text-xs font-medium">1 photo</span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            <button className="flex flex-col items-center justify-center size-24 shrink-0 rounded-2xl bg-white dark:bg-white/5 border border-dashed border-neutral-400 dark:border-neutral-500 text-primary hover:bg-primary/5 hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                                <span className="text-[10px] font-bold mt-1">Add Photos</span>
                            </button>
                            <div className="relative size-24 shrink-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-sm">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bJa07M_itzQ3gijYycsG9oGVRVVSuSAZit6l6miQivb3H0WOacRz5BwHX5xoFBELd3LhglqwFM5Ti2CiM1pgzcqtj9Bni49PN8Olt5NtflrNOAXTOc_GuRPUXx5z3hi4XV1WhMuVTlNjuIwX_DaawLv34G2roRxvrl2JL3QUE0PPiQ72P-SWKCWRLneJJzh5d-VVtEdAFc9rC--h1zjsbTLl_eZxNSIwPCZxGgbrA5wcpousBbmDsMy3lGMdSnKiverwpu2xEmuQ"
                                    alt="Product"
                                />
                                <button className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-100 backdrop-blur-sm hover:bg-black/70 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-4 mb-8">
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider ml-1">Title</span>
                            <div className="relative">
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black/20 text-neutral-900 dark:text-white h-14 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </div>
                            </div>
                        </label>

                        <div className="flex gap-3">
                            <label className="flex flex-col gap-1.5 flex-1 group">
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider ml-1">Category</span>
                                <select className="block w-full rounded-xl border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black/20 text-neutral-900 dark:text-white h-14 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                    <option>Living Room</option>
                                    <option>Bedroom</option>
                                    <option>Office</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-1.5 w-1/3 group">
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider ml-1">Est. Price</span>
                                <input
                                    className="block w-full rounded-xl border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black/20 text-neutral-900 dark:text-white h-14 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <label className="flex flex-col gap-1.5 flex-1 group">
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider ml-1">Condition</span>
                                <select className="block w-full rounded-xl border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black/20 text-neutral-900 dark:text-white h-14 pl-4 pr-10 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                    <option>Like New</option>
                                    <option>Good</option>
                                    <option>Fair</option>
                                    <option>Used</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-1.5 flex-1 group">
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider ml-1">Color</span>
                                <input className="block w-full rounded-xl border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black/20 text-neutral-900 dark:text-white h-14 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all" type="text" defaultValue="Green" />
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/home')}
                        className="relative w-full overflow-hidden rounded-full bg-primary p-4 text-white shadow-xl shadow-primary/30 active:scale-[0.98] transition-all hover:bg-[#5a7569] mt-2 mb-4 group/button"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[24px] group-hover/button:scale-110 transition-transform">add_circle</span>
                            <span className="text-lg font-bold tracking-wide">Add Listing</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddListing;
