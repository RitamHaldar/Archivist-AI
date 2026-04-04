import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../Hooks/useAuth';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const cardRef = useRef(null);
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(bgRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: 'power2.out' }
            )
                .fromTo(cardRef.current,
                    { y: 60, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.8)' },
                    "-=1"
                )
                .fromTo(titleRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
                    "-=0.6"
                )
                .fromTo(formRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    "-=0.4"
                );
        });
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(formData.identifier, formData.identifier, formData.password);
            gsap.to(cardRef.current, {
                y: -40,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => navigate('/')
            });
        } catch (error) {
            console.error("Login failed:", error);
            gsap.to(cardRef.current, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    };

    return (
        <div ref={bgRef} className="min-h-screen flex items-center justify-center bg-[#FDFDFE] relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />

            <div ref={cardRef} className="relative w-full max-w-md px-6 py-12 mx-4 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/40 z-10">
                <div ref={titleRef} className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Log in to your Archivist-AI account</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Username or Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-indigo-500" />
                            <input
                                type="text"
                                name="identifier"
                                value={formData.identifier}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username or email"
                                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-indigo-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 mt-4 group"
                    >
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 font-bold hover:underline underline-offset-4">Sign up for free</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
