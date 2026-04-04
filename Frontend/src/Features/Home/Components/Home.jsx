import React, { useMemo, useEffect } from 'react';
import {
  Link as LinkIcon, FileText, Sparkles, Clock, Zap, Network, Star, ArrowUpRight, Globe, PlayCircle, Image as ImageIcon, X
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedCollection } from '../home.slice';

import { useHome } from '../Hooks/useHome';

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

      <div className="w-[420px] bg-white border border-gray-100 h-[56%] flex flex-col fixed right-6 top-6 shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.05)] animate-slide-in-right z-40 overflow-y-auto custom-scrollbar rounded-[32px]">
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
              <p className="text-[11px] font-bold text-gray-400 tracking-tight uppercase">{post.type} • Saved {formatTimeAgo(post.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-3">AI Contextual Analysis</h3>
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <p className="text-[13px] text-indigo-900 font-medium leading-relaxed">
                  This node was resurfaced based on its high semantic relevance to your active research in the <span className="font-bold">"{post.folder || 'Unsorted'}"</span> collection.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-3">Neural Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-[11px] font-bold border border-gray-100 uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl text-[14px] font-black transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
            >
              Access Resource
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Home = ({ setActiveTab }) => {
  const { posts, loading, fetchHomeData } = useHome();
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = React.useState(null);
  useEffect(() => {
    fetchHomeData();
  }, []);
  const savedThisWeek = useMemo(() => {
    if (!posts) return 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return posts.filter(post => new Date(post.createdAt) > sevenDaysAgo).length;
  }, [posts]);

  const resurfacedPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return [...posts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [posts]);

  const knowledgeClusters = useMemo(() => {
    if (!posts) return [];
    const folderMap = new Map();
    posts.forEach(post => {
      const folder = post.folder || 'Unsorted';
      const count = folderMap.get(folder) || 0;
      folderMap.set(folder, count + 1);
    });
    return Array.from(folderMap.entries()).map(([name, count]) => ({ name, count })).slice(0, 2);
  }, [posts]);

  const recentActivity = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  }, [posts]);

  if (loading && !posts.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <section className="animate-fade-in-up stagger-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            Welcome back, Researcher <span className="animate-float origin-bottom-left inline-block">👋</span>
          </h1>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-indigo-900 hover:bg-indigo-50 transition-colors cursor-default mt-2 w-max pr-8">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <p className="font-medium text-sm">
            <span className="font-bold text-indigo-600 tracking-tight leading-none group-hover:scale-110 transition-transform">✨ AI Insight:</span> You saved <span className="font-black text-indigo-700">{savedThisWeek} items</span> this week, deepening your neural network.
          </p>
        </div>
      </section>

      <section className="animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[19px] font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" /> Resurfaced for You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {resurfacedPosts.length > 0 ? resurfacedPosts.map((post, idx) => (
            <div
              key={post._id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-[24px] p-6 subtle-ring card-hover flex flex-col justify-between min-h-[220px] group relative overflow-hidden cursor-pointer"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity ${idx === 0 ? 'bg-indigo-50' : idx === 1 ? 'bg-pink-50' : 'bg-purple-50'}`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${idx === 0 ? 'bg-indigo-50 text-indigo-600' : idx === 1 ? 'bg-pink-50 text-pink-600' : 'bg-purple-50 text-purple-600'}`}>
                    {post.type}
                  </span>
                  <span className="text-xs text-gray-400 font-medium tracking-wide">Saved {formatTimeAgo(post.createdAt)}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.folder ? `Synchronized within the ${post.folder} cluster.` : 'Expanding your research network.'}
                </p>
              </div>
              <div className="flex gap-2 items-start mt-auto pt-4 border-t border-gray-50 relative z-10 text-indigo-600">
                <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold">AI Context: Linked to your active nodes in the {post.tags?.[0] || 'research'} field.</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-16 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
              <Clock className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-gray-500 font-bold">Synchronize data to resurface insights.</p>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up stagger-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[19px] font-bold">Knowledge Clusters</h2>
            <button
              onClick={() => setActiveTab('Collections')}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {knowledgeClusters.map((cluster, idx) => (
              <div
                key={cluster.name}
                onClick={() => {
                  dispatch(setSelectedCollection(cluster));
                  setActiveTab('Collections');
                }}
                className="bg-[#f8f9fb] rounded-[24px] p-6 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute right-0 bottom-0 w-40 h-40 rounded-tl-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity ${idx === 0 ? 'bg-indigo-100' : 'bg-pink-100'}`}></div>
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${idx === 0 ? 'bg-indigo-600 shadow-indigo-200' : 'bg-[#be185d] shadow-pink-200'}`}>
                    {idx === 0 ? <Network className="w-5 h-5" /> : <Star className="w-5 h-5 fill-current" />}
                  </div>
                  <span className="text-xs font-semibold text-gray-400">{cluster.count} Items</span>
                </div>
                <h3 className="font-bold text-lg mb-1 relative z-10">{cluster.name}</h3>
                <p className="text-sm text-gray-500 font-medium relative z-10 mb-6 w-4/5 line-clamp-2">Key research node in your library.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[19px] font-bold">Connections</h2>
            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"><ArrowUpRight className="w-5 h-5" /></button>
          </div>

          <div className="bg-[#f4f5f8] rounded-[24px] h-[230px] relative overflow-hidden flex flex-col items-center justify-center border border-gray-100 group">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1.5px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="20" y1="30" x2="50" y2="50" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
              <line x1="50" y1="50" x2="80" y2="40" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
              <line x1="50" y1="50" x2="60" y2="80" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4 2" />
            </svg>

            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 z-10 animate-float relative">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse-slow"></div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center z-10 mb-4 transform group-hover:scale-105 transition-transform duration-300">
              <p className="font-bold text-[13px] text-gray-900">{posts.length} Active Nodes</p>
            </div>

            <button
              onClick={() => setActiveTab('Knowledge Graph')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-4 py-2.5 rounded-full shadow transition-colors z-10 uppercase tracking-widest"
            >
              Expand Graph View
            </button>
          </div>
        </section>
      </div>

      <div className="pt-6 animate-fade-in-up stagger-4 relative">
        <section className="space-y-4">
          <h2 className="text-[19px] font-bold mb-6">Recent Activity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentActivity.map((item) => (
              <div key={item._id} className="bg-white p-5 rounded-3xl border border-gray-100 group hover:border-indigo-100 transition-all card-hover flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'pdf' ? 'bg-red-50 text-red-500' : item.type === 'image' ? 'bg-pink-50 text-pink-500' : 'bg-indigo-50 text-indigo-500'}`}>
                  {item.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                    item.type === 'image' ? <ImageIcon className="w-5 h-5" /> :
                      item.type === 'youtube' ? <PlayCircle className="w-5 h-5" /> :
                        <Globe className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-[15px] text-gray-900 truncate tracking-tight">{item.title}</h3>
                    <span className="text-[10px] font-black text-gray-400 shrink-0 uppercase">{formatTimeAgo(item.createdAt)}</span>
                  </div>
                  <p className="text-[12px] text-gray-500 mb-3 truncate font-medium">{item.folder || 'Expanding your neural architecture'}</p>
                  <div className="flex gap-2">
                    {item.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-black text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded-lg uppercase tracking-widest">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <PostDetailPanel
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
};

export default Home;
