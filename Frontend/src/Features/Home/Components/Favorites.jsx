import React, { useState } from 'react';
import {
    Search, AlignLeft, Star, FileText, PlaySquare, File, X
} from 'lucide-react';

// Mock Data for Favorites
const FAVORITES_DATA = [
    {
        id: 1,
        source: 'MEDIUM',
        sourceIcon: FileText,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', // Abstract yellow/gold
        category: 'AI & DESIGN',
        title: 'The Future of Generative UI: Orchestrating Fluid Systems',
        date: 'Oct 12, 2023',
        tags: ['Systems']
    },
    {
        id: 2,
        source: 'YOUTUBE',
        sourceIcon: PlaySquare,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', // Code on screen
        category: 'DEVELOPMENT',
        title: 'Rust for WebDevs: A Deep Dive into Safety',
        date: 'Sep 28, 2023',
        tags: ['Rust', 'Video']
    },
    {
        id: 3,
        source: 'ARXIV',
        sourceIcon: File,
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop', // Minimalist blocks
        category: 'COGNITIVE SCIENCE',
        title: 'Attention Mechanisms in Neural Networks',
        date: 'Aug 05, 2023',
        tags: ['AI']
    },
    {
        id: 4,
        source: 'TWITTER',
        sourceIcon: X,
        image: 'https://images.unsplash.com/photo-1599598425947-3300451cf4fb?q=80&w=600&auto=format&fit=crop', // Bonsai tree
        category: 'PHILOSOPHY',
        title: 'Thread: The Art of Slow Living in a Digital Age',
        date: 'Jan 12, 2024',
        tags: ['Mindfulness']
    }
];

const FilterPill = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all duration-300 ${active
            ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-200'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
    >
        {label}
    </button>
);

const FavoriteCard = ({ item }) => {
    const SourceIcon = item.sourceIcon;
    return (
        <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-400 group cursor-pointer flex flex-col h-full card-hover">
            {/* Image Header Area */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Source Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                    <SourceIcon className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span className="text-[10px] font-black tracking-widest text-gray-800">{item.source}</span>
                </div>

                {/* Star Badge */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur shadow-sm rounded-full flex items-center justify-center z-10 text-yellow-500 hover:text-yellow-400 hover:scale-110 transition-transform">
                    <Star className="w-4 h-4 fill-current" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col bg-white">
                <h4 className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest mb-3">{item.category}</h4>
                <h3 className="text-[20px] font-black text-gray-900 leading-[1.3] tracking-tight mb-6 group-hover:text-[#4F46E5] transition-colors line-clamp-3">
                    {item.title}
                </h3>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <time className="text-[12px] font-bold text-gray-500">{item.date}</time>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-gray-100/80 text-gray-600 text-[11px] font-bold rounded-full border border-gray-200/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Favorites = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const FILTERS = ['All', 'Articles', 'Videos', 'PDFs', 'Tweets'];

    return (
        <div className="h-full bg-[#FDFDFE] -mx-8 -my-8 flex flex-col pt-12">
            <div className="max-w-[1280px] mx-auto w-full px-12 shrink-0">
                {/* Header Section */}
                <div className="mb-12 animate-fade-in-up stagger-1">
                    <h1 className="text-[56px] font-black tracking-tighter text-gray-900 mb-2 leading-[0.9]">Favorites</h1>
                    <p className="text-[20px] text-gray-500 font-medium tracking-tight">Your curated digital sanctuary.</p>
                </div>

                {/* Controls Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 animate-fade-in-up stagger-2">
                    {/* Search */}
                    <div className="relative w-full lg:w-[320px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors" />
                        <input
                            type="text"
                            placeholder="Find in favorites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-200/80 rounded-full pl-12 pr-6 py-3.5 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-300 transition-all text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
                        />
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                        <div className="flex items-center gap-1">
                            {FILTERS.map(filter => (
                                <FilterPill
                                    key={filter}
                                    label={filter}
                                    active={activeFilter === filter}
                                    onClick={() => setActiveFilter(filter)}
                                />
                            ))}
                        </div>

                        <button className="ml-auto lg:ml-4 flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200/80 rounded-full text-[14px] font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            <AlignLeft className="w-4 h-4" />
                            Recent
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Favorites Grid */}
            <div className="flex-1 overflow-y-auto px-12 pb-20 scroll-smooth hide-scrollbar">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FAVORITES_DATA.map((item, i) => (
                            <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${(i + 3) * 100}ms` }}>
                                <FavoriteCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
