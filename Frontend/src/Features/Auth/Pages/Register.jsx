import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../Hooks/useAuth';
import { User, Mail, Lock, ArrowRight, Loader2, Rocket, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { handleRegister } = useAuth();
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
                { opacity: 1, duration: 1.2, ease: 'power2.out' }
            )
                .fromTo(cardRef.current,
                    { x: -50, opacity: 0, scale: 0.98 },
                    { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' },
                    "-=0.8"
                )
                .fromTo(titleRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
                    "-=0.6"
                )
                .fromTo(formRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
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
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        try {
            await handleRegister(formData.username, formData.email, formData.password);
            gsap.to(formRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                onComplete: () => {
                    navigate('/login');
                }
            });
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.message || "Something went wrong. Please try again.");
            gsap.to(cardRef.current, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    };

    return (
        <div ref={bgRef} className="min-h-screen flex items-center justify-center bg-[#FDFDFE] relative overflow-hidden">
            <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[140px] opacity-60 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-emerald-100 rounded-full blur-[140px] opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }} />

            <div ref={cardRef} className="relative w-full max-w-lg px-8 py-12 mx-4 bg-white/75 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(30,58,138,0.1)] border border-white/50 z-10 overflow-hidden">
                <div ref={titleRef} className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3.5 mb-6 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200">
                        <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join Archivist-AI and start organizing your thoughts</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/40 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/40 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-white/40 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-white/40 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6 group"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-8 border-t border-gray-100 pt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">Log in here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
