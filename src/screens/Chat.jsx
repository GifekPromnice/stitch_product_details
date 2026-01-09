import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Chat = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const messages = [
        {
            id: 1,
            sender: 'Jane Doe',
            text: 'Hi! Yes, the chair is still available. Are you interested in picking it up this week?',
            time: '10:23 AM',
            isMe: false,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZbXq64_VW7zGVU-xz3SA9o3qvgLLVmi2r5NuAwcboKq9eWQKwNNUuSwcsE-J3OzTB55H2lyw590CbdRJ80r4Zhrzen4Fwm4Ffg1vKqbsFVq8knHk93eJSc0bZbYXlltZyx4XlNb90lEumMxqqzdVYl6MgisxuJb7NWt4tvXBdIqXiXS2x3PPb75HHllyyRQPiTxwGK8BQxFikGZH59RNUof_R8v269R1hkAweXvMY3F9oF52hisMcZxEDiYDJkw73NXwFS-ARZtI3',
        },
        {
            id: 2,
            sender: 'Me',
            text: 'Great! Is there any damage to the upholstery?',
            time: '10:25 AM',
            isMe: true,
            status: 'read',
        },
        {
            id: 3,
            sender: 'Jane Doe',
            text: "No tears, just minor wear on the legs. It's barely noticeable. I can send a close-up photo if you'd like?",
            time: '10:26 AM',
            isMe: false,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZbXq64_VW7zGVU-xz3SA9o3qvgLLVmi2r5NuAwcboKq9eWQKwNNUuSwcsE-J3OzTB55H2lyw590CbdRJ80r4Zhrzen4Fwm4Ffg1vKqbsFVq8knHk93eJSc0bZbYXlltZyx4XlNb90lEumMxqqzdVYl6MgisxuJb7NWt4tvXBdIqXiXS2x3PPb75HHllyyRQPiTxwGK8BQxFikGZH59RNUof_R8v269R1hkAweXvMY3F9oF52hisMcZxEDiYDJkw73NXwFS-ARZtI3',
        },
        {
            id: 4,
            sender: 'Me',
            text: 'That would be helpful, thanks!',
            time: '10:28 AM',
            isMe: true,
            status: 'sent',
        },
    ];

    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-gray-100 overflow-hidden antialiased">
            {/* Header */}
            <header className="shrink-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 border-b border-gray-100 dark:border-gray-800 transition-colors pt-12">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white"
                        >
                            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                        </button>
                        <div className="relative">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 border-2 border-white dark:border-background-dark shadow-sm"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-TmO3Oa6AaeIXD4ERjEpCgz2gPjRhql5RpFp2UnYaq3GtXh4xccDTbQCofRmwEpgs841qcIIkpy1j5REKD5eZVkLSpECEZxrodPEZoKCF2szfbVhMtxOCMDOqUtxL91xR1E-ERfEdWiuohRbpn7BkaA65AXsDZNuWadFWfL1E0r_lSeQFaWWb2Qi5HlnXytXkYx7hNQFftuu23-hR6JRotSHP-B6fij5tCZlL50ZfHOZ8DaOTooryI6p7_o5kKztXPYrFjW4O0yHg")',
                                }}
                            ></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
                        </div>
                        <div className="flex flex-col text-left">
                            <h1 className="text-base font-bold leading-tight text-text-main dark:text-white">Jane Doe</h1>
                            <span className="text-xs font-medium text-text-secondary dark:text-primary/80">Active now</span>
                        </div>
                    </div>
                    <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative w-full pb-4">
                {/* Product Context Bar */}
                <div className="sticky top-2 z-10 px-4 mb-4 mt-2">
                    <div className="bg-white dark:bg-[#2C2E2D] p-3 rounded-2xl shadow-soft flex items-center justify-between gap-3 border border-gray-100 dark:border-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-xl w-14 h-14 shrink-0 bg-gray-200"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqzInuR7CPsG-Xr0rPXYJip7razEesgzVnFexwUXeVmozFcXz2LcP0O4V9d5p182KB4r-aeSQBr7uCe8n9xJ4IORrfOIFVfYGki8hSIk--KN3OtgxJb0TlTJXgcVS2TuK7yhPYbK1xe7guExEaMuDBvXO-p83R3hPzoF0fjmu-TXOghLHTbumtuPTLO0xZkw5AYm8Nhgrt1nZnn6aNazdfjwiseRDQkJxhXP26CkVzFTKzeR4hvtYdNAmi4dXLPESC6jvObidB9xIp")',
                                }}
                            ></div>
                            <div className="flex flex-col min-w-0 text-left">
                                <p className="text-sm font-semibold text-text-main dark:text-white truncate">Mid-Century Modern Chair</p>
                                <p className="text-sm font-bold text-primary">$150.00</p>
                            </div>
                        </div>
                        <button className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center my-4">
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-[#2C2E2D] px-3 py-1 rounded-full">
                        Today
                    </span>
                </div>

                {/* Message bubbles */}
                <div className="flex flex-col gap-6 px-4 pb-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-3 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}
                        >
                            {!msg.isMe && (
                                <div
                                    className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 shrink-0 mb-1 shadow-sm border border-gray-100 dark:border-transparent"
                                    style={{ backgroundImage: `url("${msg.avatar}")` }}
                                ></div>
                            )}
                            <div className={`flex flex-col gap-1 ${msg.isMe ? 'items-end' : ''}`}>
                                <div
                                    className={`p-4 rounded-2xl shadow-sm border ${msg.isMe
                                            ? 'bg-primary text-white border-primary shadow-primary/20 rounded-br-sm'
                                            : 'bg-white dark:bg-[#2C2E2D] text-text-main dark:text-gray-100 border-gray-100 dark:border-gray-800 rounded-bl-sm'
                                        }`}
                                >
                                    <p className="text-[15px] leading-relaxed text-left">{msg.text}</p>
                                </div>
                                <span className={`text-[11px] text-gray-400 ${msg.isMe ? 'mr-2' : 'ml-2'} flex items-center gap-1`}>
                                    {msg.time}
                                    {msg.isMe && (
                                        <span className={`material-symbols-outlined text-[14px] ${msg.status === 'read' ? 'text-primary' : 'text-gray-300'}`}>
                                            {msg.status === 'read' ? 'done_all' : 'check'}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    <div className="flex items-end gap-3 max-w-[85%] self-start animate-pulse">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 shrink-0 mb-1 shadow-sm border border-gray-100 dark:border-transparent"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZbXq64_VW7zGVU-xz3SA9o3qvgLLVmi2r5NuAwcboKq9eWQKwNNUuSwcsE-J3OzTB55H2lyw590CbdRJ80r4Zhrzen4Fwm4Ffg1vKqbsFVq8knHk93eJSc0bZbYXlltZyx4XlNb90lEumMxqqzdVYl6MgisxuJb7NWt4tvXBdIqXiXS2x3PPb75HHllyyRQPiTxwGK8BQxFikGZH59RNUof_R8v269R1hkAweXvMY3F9oF52hisMcZxEDiYDJkw73NXwFS-ARZtI3")',
                            }}
                        ></div>
                        <div className="flex flex-col gap-1">
                            <div className="bg-white dark:bg-[#2C2E2D] px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="shrink-0 z-20 bg-background-light dark:bg-background-dark px-4 py-3 pb-8 transition-all duration-300">
                <div className="flex items-end gap-2 max-w-3xl mx-auto">
                    <button className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-[#2C2E2D] text-text-main dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <span className="material-symbols-outlined text-[24px]">add</span>
                    </button>
                    <div className="flex-1 bg-white dark:bg-[#2C2E2D] border border-gray-200 dark:border-gray-700 rounded-[2rem] flex items-center px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-sm">
                        <input
                            type="text"
                            className="w-full bg-transparent border-none focus:ring-0 p-2 text-[15px] placeholder:text-gray-400 text-text-main dark:text-white leading-normal h-[36px]"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="shrink-0 p-1.5 text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
                        </button>
                    </div>
                    <button className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark">
                        <span className="material-symbols-outlined text-[22px] ml-0.5">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
