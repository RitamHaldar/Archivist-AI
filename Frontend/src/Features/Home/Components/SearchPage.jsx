import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import {
    Search,
    ExternalLink,
    Folder,
    Tag as TagIcon,
    Calendar,
    FileText,
    Globe,
    PlayCircle,
    Image as ImageIcon,
    ArrowRight,
    X,
    Zap,
    ArrowUpRight
} from 'lucide-react';

const formatTimeAgo = (dateString) => {
    if (!dateString) return 'recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
};

const PostDetailPanel = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[30] animate-fade-in"
                onClick={onClose}
            />

            <div className="w-[420px] bg-white border border-gray-100 h-[56%] flex flex-col fixed right-6 top-6 shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.05)] animate-slide-in-right z-50 overflow-y-auto custom-scrollbar rounded-[32px]">
                <div className="p-6 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-indigo-500" /> Neural Resurface
                    </h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-5 mb-8">
                        <div className={`w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm`}>
                            {post.type === 'pdf' ? <FileText className="w-7 h-7" /> :
                                post.type === 'image' ? <ImageIcon className="w-7 h-7" /> :
                                    post.type === 'youtube' ? <PlayCircle className="w-7 h-7" /> :
                                        <Globe className="w-7 h-7" />}
                        </div>
                        <div>
                            <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">{post.title}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[11px] font-bold text-gray-400 tracking-tight uppercase">{post.type} • Saved {formatTimeAgo(post.createdAt)}</p>
                                {post.folder && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center gap-1 text-indigo-600">
                                            <Folder className="w-3 h-3" />
                                            <span className="text-[11px] font-black uppercase tracking-wider">{post.folder}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-3">Resource Summary</h3>
                            <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100/40">
                                <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                                    {post.summary}
                                </p>
                            </div>
                        </div>

                        {post.url && (
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group/link">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <Globe className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target URL</p>
                                        <p className="text-[12px] font-bold text-gray-600 truncate">{post.url}</p>
                                    </div>
                                </div>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-indigo-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        )}

                        <div>
                            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-3">Neural Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags?.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-white text-indigo-600 rounded-xl text-[11px] font-black border border-indigo-100/50 uppercase tracking-wider shadow-sm hover:scale-105 transition-transform cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[14px] font-black shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                        >
                            Open Intelligence Node
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

const NeuralSynthesisLoader = () => {
    const loaderRef = useRef(null);

    useEffect(() => {
        if (loaderRef.current) {
            const tl = gsap.timeline({ repeat: -1 });
            tl.to('.neural-node', {
                scale: 1.2,
                opacity: 0.8,
                duration: 1,
                stagger: {
                    amount: 1,
                    from: "center",
                    grid: [3, 3]
                },
                ease: "sine.inOut",
                yoyo: true
            });
        }
    }, []);

    return (
        <div ref={loaderRef} className="flex-1 flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-fade-in">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative w-full h-full bg-white rounded-[2.5rem] border border-indigo-100 shadow-2xl shadow-indigo-100/50 p-6 grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="neural-node w-full h-full bg-indigo-100 rounded-md" />
                    ))}
                </div>
            </div>
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500 animate-pulse" />
                    <h2 className="text-11px font-black text-indigo-600 uppercase tracking-[0.4em]">Neural Processing</h2>
                </div>
                <h1 className="text-[32px] font-black text-gray-900 tracking-tighter leading-tight">
                    Synthesizing <span className="text-indigo-600">Knowledge Clusters</span>
                </h1>
                <p className="text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
                    Trawling your neural network for deep semantic connections...
                </p>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100/50">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-2">Mapping Nodes</span>
            </div>
        </div>
    );
};

const PostCard = ({ post, onDetails }) => {
    const cardRef = useRef(null);

    const getIcon = (type) => {
        switch (type) {
            case 'url': return <Globe className="w-5 h-5" />;
            case 'pdf': return <FileText className="w-5 h-5" />;
            case 'youtube': return <PlayCircle className="w-5 h-5" />;
            case 'image': return <ImageIcon className="w-5 h-5" />;
            default: return <FileText className="w-5 h-5" />;
        }
    };

    const getAccentColor = (type) => {
        switch (type) {
            case 'url': return 'indigo';
            case 'pdf': return 'purple';
            case 'youtube': return 'red';
            case 'image': return 'pink';
            default: return 'indigo';
        }
    };

    const accent = getAccentColor(post.type);

    return (
        <div
            ref={cardRef}
            className="group relative bg-white border border-gray-100 rounded-[32px] p-8 hover:border-indigo-200 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-1.5 overflow-hidden"
        >
            {/* Background Accent Blur */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-${accent}-50/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-${accent}-50 text-${accent}-600 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                        {getIcon(post.type)}
                    </div>
                    <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-lg bg-${accent}-50 text-${accent}-700 text-[10px] font-black uppercase tracking-wider`}>
                            {post.type}
                        </span>
                        {post.folder && (
                            <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
                                <Folder className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold">{post.folder}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-[14px] text-gray-500 leading-relaxed mb-6 line-clamp-3 font-medium">
                        {post.summary}
                    </p>
                </div>

                <div className="pt-6 border-t border-gray-50">
                    <div className="flex flex-wrap gap-2 mb-5">
                        {post.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold text-gray-600 hover:bg-white hover:border-indigo-100 hover:text-indigo-600 transition-all cursor-default">
                                <TagIcon className="w-3 h-3 opacity-50" />
                                {tag}
                            </span>
                        ))}
                        {post.tags?.length > 3 && (
                            <span className="px-3 py-1.5 bg-gray-50 text-[11px] font-bold text-gray-400 rounded-xl">
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <button
                            onClick={onDetails}
                            className="flex items-center gap-1.5 text-[12px] font-black text-indigo-600 group/btn transition-all"
                        >
                            Details
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SearchPage = () => {
    const { searchPosts, loading } = useSelector((state) => state.home);
    const containerRef = useRef(null);
    const [selectedPost, setSelectedPost] = useState(null);

    // Handle different potential structures of searchPosts
    const results = Array.isArray(searchPosts)
        ? searchPosts
        : searchPosts?.suggestedposts || [];

    useEffect(() => {
        if (results.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".search-card",
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: {
                            amount: 0.5,
                            grid: "auto",
                            from: "start"
                        },
                        ease: "back.out(1.4)"
                    }
                );

                gsap.fromTo(".search-header",
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
                );
            }, containerRef);

            return () => ctx.revert();
        }
    }, [results.length]);

    if (loading && results.length === 0) {
        return <NeuralSynthesisLoader />;
    }

    if (results.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-100">
                    <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No Insights Found</h2>
                <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
                    We couldn't find any assets matching your query. Try different keywords or broaden your search.
                </p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="space-y-12 animate-fade-in relative">
            <div className="search-header flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                        <h2 className="text-11px font-black text-indigo-600 uppercase tracking-[0.3em]">Knowledge Search</h2>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
                        Search <span className="text-indigo-600">Results</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-indigo-50/50 px-6 py-3 rounded-2xl border border-indigo-100/60">
                    <p className="text-[13px] font-bold text-indigo-900">
                        <span className="text-indigo-600">{results.length}</span> assets uncovered
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
                {results.map((post, idx) => (
                    <div key={post._id || idx} className="search-card">
                        <PostCard
                            post={post}
                            index={idx}
                            onDetails={() => setSelectedPost(post)}
                        />
                    </div>
                ))}
            </div>

            <PostDetailPanel
                post={selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </div>
    );
};

export default SearchPage;
