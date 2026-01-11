import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                navigate('/home');
            } else {
                navigate('/features');
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate, user]);

    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-primary bg-gradient-to-br from-[#698679] to-[#516b5c]">
            <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-white opacity-[0.03] blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-black opacity-[0.05] blur-3xl"></div>

            <div className="flex-1"></div>

            <div className="z-10 flex flex-col items-center justify-center gap-6 p-6">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[#f7f7f7] shadow-2xl shadow-black/20 animate-[scaleIn_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards] origin-center">
                    <span className="material-symbols-outlined text-6xl text-primary"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                        chair
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2 text-center animate-[slideUp_0.8s_ease-out_0.3s_forwards] opacity-0">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                        Again
                    </h1>
                    <p className="text-lg font-medium text-white/90 tracking-wide">
                        Curated C2C Furniture
                    </p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end pb-12 items-center z-10 w-full animate-[fadeIn_1.5s_ease-in_0.5s_forwards] opacity-0">
                <div className="h-10 w-10 mb-8">
                    <div className="spinner h-8 w-8 rounded-full border-4 border-white/20"></div>
                </div>
                <p className="text-sm font-light text-white/60">
                    Find your place.
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;
