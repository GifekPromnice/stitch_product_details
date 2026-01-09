import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Features = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Sell in seconds",
            description: "Snap a photo and our AI handles the rest. Tags, descriptions, and categories are auto-generated.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwO0JIpMfKNFZD1vkvZNpGueYR4MRkZyabMi3LAKmLBheuo7y3aaO6fTvoohAaUm8pAPbt0vKsSazTFTaDf1vMT92KzG1nQ80i5hTJEhN0exT27etYB-UTx6_00Yb9fCPdAG2fN15dK29r96ua_vHeYqD-gb2JPLlVOUEcRc5XzW7c3SXENxfESVqzhqxhgBckSp2yz3XbY58kgKWtOtbXi86cPoAGx0oYQQ2IqOqhRjLHXcNsmR3dTYzvSPzNiPn0vpdWhOBBELqY",
            isAI: true
        },
        {
            title: "Trust & Safety First.",
            description: "Every item is verified, and payments are secure until you receive your purchase.",
            icon: "verified_user",
            bg: "#E8ECEA"
        },
        {
            title: "Find furniture you'll love.",
            description: "The easiest way to buy and sell unique pieces locally. Sustainable, affordable, and stylish.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATKaUU0p71gjS_2UPy5v5u9pNYdvpqnIxG1RtoLyQXF4UprX2DYlza7F2ogY7THo9n5iaDrKsjAGTVAfdPNgKRmvq3nVjzMD4y5UnSOF6l0LLGY0OVKxGP9DqQesDk-8YTPbjhlX5iC5G_U2PD4LR7g42pPrX7-ziIN9dpK1S91PyU_RcQq0Oo4MwXe9qcYc9YvvYKNV7RfEHHyJonhz2cp-9HRc5PT66I5vzV59piRHpqFej_U_U3sQvb44N2d-Ownuu8ISUydMbv"
        }
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
            <div className="flex w-full items-center justify-center pt-12 pb-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-900 dark:text-white text-3xl">chair</span>
                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Again</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col pb-6 relative overflow-hidden">
                <div
                    className="flex-1 w-full flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="min-w-full flex flex-col px-4 shrink-0 transition-opacity duration-300"
                            style={{ opacity: currentSlide === index ? 1 : 0 }}>
                            <div className={`relative w-full flex-1 min-h-[400px] overflow-hidden rounded-3xl shadow-sm mb-6 ${slide.bg ? '' : 'group'}`}
                                style={slide.bg ? { backgroundColor: slide.bg } : {}}>
                                {slide.image && (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${slide.image}")` }}>
                                        </div>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                    </>
                                )}
                                {slide.icon && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-[120px]">{slide.icon}</span>
                                    </div>
                                )}
                                {slide.isAI && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[65%] border-2 border-white/60 rounded-2xl">
                                            <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                                            <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                                            <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                                        </div>
                                        <div className="absolute top-[28%] left-[18%] animate-float">
                                            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg transform -rotate-2">
                                                <span className="material-symbols-outlined text-primary text-[16px]">light</span>
                                                <span className="text-primary text-xs font-bold">Lamp</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-6 right-6">
                                            <div className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                                AI Analysis
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[36px] font-extrabold leading-tight px-2">
                                    {slide.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed max-w-xs mx-auto">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Dots */}
                <div className="flex w-full flex-row items-center justify-center gap-2 py-6">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 transition-all duration-300 rounded-full ${currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full px-6 pb-12 pt-2 bg-background-light dark:bg-background-dark">
                <div className="flex flex-col gap-4 max-w-md mx-auto">
                    <button
                        onClick={nextSlide}
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-primary hover:bg-[#5a7267] transition-colors shadow-lg shadow-primary/20"
                    >
                        <span className="text-white text-base font-bold leading-normal tracking-wide">
                            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                        </span>
                        <span className="material-symbols-outlined ml-2 text-white text-[20px]">arrow_forward</span>
                    </button>
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/auth')}
                            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Already have an account? <span className="underline decoration-primary decoration-2 underline-offset-4">Log in</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
