import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Cpu, Shield, Zap } from 'lucide-react';

const Loading = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const iconRef = useRef(null);
    const statusRef = useRef(null);
    const progressRef = useRef(null);
    
    const [statusIndex, setStatusIndex] = useState(0);
    const statuses = [
        "Initializing Neural Sync...",
        "Securing Workspace...",
        "Optimizing Knowledge Graph...",
        "Readying Archivist-AI..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.75)" }
            );

            gsap.to(iconRef.current, {
                rotate: 360,
                duration: 4,
                repeat: -1,
                ease: "none"
            });

            gsap.to(iconRef.current, {
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            gsap.to(progressRef.current, {
                width: "100%",
                duration: 2,
                repeat: -1,
                ease: "power2.inOut",
                yoyo: true
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(statusRef.current,
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [statusIndex]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FDFDFE] overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/60 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-100/60 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
            
            <div 
                ref={cardRef}
                className="relative w-72 p-8 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/40 flex flex-col items-center gap-6"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
                    <div 
                        ref={iconRef}
                        className="relative w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50"
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="text-center space-y-3 w-full">
                    <div ref={statusRef} className="text-sm font-bold text-gray-900 tracking-tight h-5">
                        {statuses[statusIndex]}
                    </div>
                    
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            ref={progressRef}
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 w-0 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 opacity-30 grayscale pointer-events-none">
                    <Shield className="w-3 h-3" />
                    <span className="text-[10px] font-black tracking-widest uppercase tracking-[0.2em]">Archivist-AI</span>
                </div>
            </div>

            <div className="absolute top-1/4 left-1/4 animate-bounce p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/20 shadow-sm" style={{ animationDuration: '3s' }}>
                <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 animate-bounce p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/20 shadow-sm" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <Zap className="w-5 h-5 text-violet-400" />
            </div>
        </div>
    );
};

export default Loading;