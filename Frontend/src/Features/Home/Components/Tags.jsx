import React, { useState, useMemo, useRef } from 'react';
import {
  Search, LayoutGrid, List, X, Wand2, Hash,
  Brain, Palette, Scale, Microscope, PieChart, ChevronRight,
  ExternalLink, Globe, FileText, Image as ImageIcon, Play
} from 'lucide-react';
import { useHome } from '../Hooks/useHome';

const TAG_STYLES = [
  { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: Brain },
  { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', icon: Hash },
  { color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', icon: Palette },
  { color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', icon: Microscope },
  { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: Scale },
  { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: PieChart },
];

const getTagStyle = (tagName) => {
  const index = tagName.length % TAG_STYLES.length;
  return TAG_STYLES[index];
};

const TagCard = ({ tag, onSelect }) => {
  const style = getTagStyle(tag.name);
  const Icon = style.icon;
  
  return (
    <div
      onClick={() => onSelect(tag)}
      className="bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer group relative hover:border-gray-200 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${style.bg} ${style.color} transition-colors group-hover:bg-white group-hover:shadow-sm ring-1 ring-transparent group-hover:ring-gray-100`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
          {tag.count} Items
        </span>
      </div>
      <h3 className="text-[17px] font-black text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors tracking-tight">#{tag.name}</h3>
      <p className="text-[13px] text-gray-400 font-medium leading-relaxed line-clamp-2">
        Integrated semantic marker with {tag.count} active connections in your neural network.
      </p>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-black text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
        Analyze Cluster <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  );
};

const TagAnalysisPanel = ({ tag, posts, onClose }) => {
  if (!tag) return null;

  const style = getTagStyle(tag.name);
  const Icon = style.icon;

  const commonPairs = Array.from(new Set(
    posts.flatMap(p => p.tags)
      .filter(t => t !== tag.name)
  )).slice(0, 5);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[30] animate-fade-in"
        onClick={onClose}
      />
      
      <div className="w-[380px] bg-white border border-gray-100 h-[36%] flex flex-col fixed right-6 top-6 shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.05)] animate-slide-in-right z-40 overflow-y-auto custom-scrollbar rounded-[32px]">
      <div className="p-6 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <PieChart className="w-3.5 h-3.5" /> Cluster Analysis
        </h2>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-5 mb-10">
          <div className={`w-14 h-14 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shadow-sm`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tight">#{tag.name}</h1>
            <p className="text-[12px] font-bold text-gray-400 tracking-tight">{tag.count} Nodes connected</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Nodes</p>
            <span className="text-[20px] font-black text-gray-900">{tag.count}</span>
          </div>
          <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Focus</p>
            <span className="text-[20px] font-black text-indigo-600">Active</span>
          </div>
        </div>

        {commonPairs.length > 0 && (
          <div className="mb-10">
            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-4">Neural Overlaps</h3>
            <div className="flex flex-wrap gap-2">
              {commonPairs.map(pTag => (
                <span key={pTag} className="px-3.5 py-1.5 bg-white text-gray-600 rounded-xl text-[12px] font-bold border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer shadow-sm">
                  #{pTag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-4">Synced Items</h3>
          <div className="space-y-4">
            {posts.map((item, i) => (
              <a 
                key={item._id} 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer flex items-center justify-between p-1 -mx-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      {item.type === 'pdf' ? <FileText className="w-4 h-4 text-purple-600" /> : 
                       item.type === 'image' ? <ImageIcon className="w-4 h-4 text-pink-600" /> :
                       item.type === 'youtube' ? <Play className="w-4 h-4 text-red-600" /> :
                       <Globe className="w-4 h-4 text-indigo-600" />}
                   </div>
                   <div>
                     <h4 className="text-[14px] font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{item.title}</h4>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">{item.type}</p>
                   </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-all translate-x-0 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <button className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl text-[14px] font-black transition-all flex items-center justify-center gap-2 group/btn active:scale-95">
            Visualize Sub-Graph
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

const Tags = () => {
  const { posts, loading } = useHome();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [lastSelectedTag, setLastSelectedTag] = useState(null);
  const topRef = useRef(null);

  const availableTags = useMemo(() => {
    if (!posts) return [];
    
    const tagMap = new Map();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });

    return Array.from(tagMap.entries())
      .map(([name, count]) => ({
        id: `tag-${name}`,
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  const filteredTags = useMemo(() =>
    availableTags.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [availableTags, searchQuery]
  );

  const matchingPosts = useMemo(() => {
    if (!selectedTag || !posts) return [];
    return posts.filter(p => p.tags?.includes(selectedTag.name));
  }, [selectedTag, posts]);

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
    setLastSelectedTag(tag);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading && !posts.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="flex relative -mx-8 -my-8 bg-white/50 backdrop-blur-sm">
      <div className={`flex-1 p-10 transition-all duration-500 ${selectedTag ? 'pr-[400px]' : ''}`}>
        <div className="max-w-[1100px] mx-auto">

          <div className="flex items-end justify-between mb-12 animate-fade-in-up stagger-1">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Taxonomy System</span>
              </div>
              <h1 className="text-[42px] font-black tracking-tighter text-gray-900 leading-[0.9] mb-3">Tags</h1>
              <p className="text-[15px] text-gray-400 font-medium tracking-tight">Connect and navigate your knowledge through active markers.</p>
            </div>
            <div className="flex items-center gap-3">
              {!selectedTag && lastSelectedTag && (
                <button
                  onClick={() => setSelectedTag(lastSelectedTag)}
                  className="group flex items-center gap-2.5 px-4 py-2 bg-white border border-indigo-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 animate-spring-in"
                >
                  <div className={`p-1.5 rounded-lg ${getTagStyle(lastSelectedTag.name).bg} ${getTagStyle(lastSelectedTag.name).color}`}>
                    <PieChart className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Last Insight</p>
                    <p className="text-[13px] font-bold text-gray-900 leading-none">#{lastSelectedTag.name}</p>
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10 animate-fade-in-up stagger-2">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search extracted tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-6 py-2.5 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
              />
            </div>

            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button className="p-2 rounded-lg transition-all bg-white text-indigo-600 shadow-sm">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg transition-all text-gray-400 hover:text-gray-900">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!loading && availableTags.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                <Hash className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No Tags Extracted</h3>
              <p className="text-gray-500 font-medium max-w-[280px]">Upload resources to automatically build your neural taxonomy.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredTags.map((tag, i) => (
              <div key={tag.name} className="animate-fade-in-up" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
                <TagCard tag={tag} onSelect={handleSelectTag} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <TagAnalysisPanel 
        tag={selectedTag} 
        posts={matchingPosts} 
        onClose={() => setSelectedTag(null)} 
      />
    </div>
  );
};

export default Tags;
