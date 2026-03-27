import React, { useState, useMemo } from 'react';
import {
  Search, LayoutGrid, List, Plus, X, Wand2, Hash,
  Brain, Palette, Scale, Microscope, PieChart, ChevronRight
} from 'lucide-react';

// Mock Data with Category Icons
const ALL_TAGS = [
  { id: 't1', name: 'AI', count: 42, icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', description: 'Machine learning, neural networks, and prompt engineering.' },
  { id: 't2', name: 'Design', count: 128, icon: Palette, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', description: 'Visual theory, UI patterns, and design system documentation.' },
  { id: 't3', name: 'Ethics', count: 15, icon: Scale, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', description: 'Philosophical frameworks and ethical implications of technology.' },
  { id: 't4', name: 'Research', count: 89, icon: Microscope, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', description: 'Academic papers, user interviews, and market analysis data.' },
  { id: 't5', name: 'Strategy', count: 34, icon: PieChart, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', description: 'Long-term roadmaps and high-level product objectives.' },
];

const TagCard = ({ tag, onSelect }) => {
  const Icon = tag.icon;
  return (
    <div
      onClick={() => onSelect(tag)}
      className="bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer group relative hover:border-gray-200 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${tag.bg} ${tag.color} transition-colors group-hover:bg-white group-hover:shadow-sm ring-1 ring-transparent group-hover:ring-gray-100`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
          {tag.count}
        </span>
      </div>
      <h3 className="text-[17px] font-bold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors">#{tag.name}</h3>
      <p className="text-[13px] text-gray-500 font-medium leading-relaxed line-clamp-2">
        {tag.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
        View analysis <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  );
};

const GenerateTagsCard = () => (
  <div className="rounded-2xl p-5 border-2 border-dashed border-gray-100 cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[160px]">
    <div className="w-10 h-10 rounded-xl bg-gray-50 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white transition-all">
      <Wand2 className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
    </div>
    <h3 className="text-[14px] font-bold text-gray-500 group-hover:text-indigo-600 transition-colors">Generate Auto-Tags</h3>
  </div>
);

const TagAnalysisPanel = ({ tag, onClose }) => {
  if (!tag) return null;

  return (
    <div className="w-[380px] bg-white border-l border-gray-100 h-full flex flex-col absolute right-0 top-0 bottom-0 shadow-[-12px_0_32px_-12px_rgba(0,0,0,0.05)] animate-slide-in-right z-40 overflow-y-auto custom-scrollbar">
      <div className="p-6 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <PieChart className="w-3.5 h-3.5" /> Tag Analysis
        </h2>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-5 mb-10">
          <div className={`w-14 h-14 rounded-2xl ${tag.bg} ${tag.color} flex items-center justify-center shadow-sm`}>
            {tag.icon && <tag.icon className="w-7 h-7" />}
          </div>
          <div>
            <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tight">#{tag.name}</h1>
            <p className="text-[12px] font-bold text-gray-400 tracking-tight">Created 14 days ago</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total Items</p>
            <span className="text-[20px] font-black text-gray-900">{tag.count}</span>
          </div>
          <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Growth</p>
            <span className="text-[20px] font-black text-emerald-600">+12%</span>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-4">Common Pairs</h3>
          <div className="flex flex-wrap gap-2">
            {['#Ethics', '#Future', '#AI Models'].map(pTag => (
              <span key={pTag} className="px-3.5 py-1.5 bg-white text-gray-600 rounded-xl text-[12px] font-bold border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer shadow-sm">
                {pTag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-4">Recent Notes</h3>
          <div className="space-y-4">
            {[
              { title: 'Foundations of Modern AI', time: '2h ago' },
              { title: 'Neural Optimization', time: '5h ago' }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase">{item.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="w-full h-36 rounded-2xl bg-gray-950 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Context" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-1.5">Active Connections</h4>
              <p className="text-[11px] text-white/80 font-medium max-w-[180px]">Linked to 14 active clusters in your graph.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Tags = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(ALL_TAGS[0]);
  const [lastSelectedTag, setLastSelectedTag] = useState(ALL_TAGS[0]);

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
    setLastSelectedTag(tag);
  };

  const filteredTags = useMemo(() =>
    ALL_TAGS.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  return (
    <div className="flex relative h-full -mx-8 -my-8 bg-white/50 backdrop-blur-sm min-h-screen">
      {/* Main Content Area */}
      <div className={`flex-1 p-10 overflow-y-auto transition-all duration-500 ${selectedTag ? 'pr-[400px]' : ''}`}>
        <div className="max-w-[1100px] mx-auto">

          {/* Header */}
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
                  <div className={`p-1.5 rounded-lg ${lastSelectedTag.bg} ${lastSelectedTag.color}`}>
                    <PieChart className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Last Insight</p>
                    <p className="text-[13px] font-bold text-gray-900 leading-none">#{lastSelectedTag.name}</p>
                  </div>
                </button>
              )}
              <button className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all active:scale-95">
                <Plus className="w-4 h-4 stroke-[3px]" />
                New Tag
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-10 animate-fade-in-up stagger-2">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-6 py-2.5 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all text-[14px] font-medium placeholder:text-gray-400 shadow-sm"
              />
            </div>

            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button
                className="p-2 rounded-lg transition-all bg-white text-indigo-600 shadow-sm"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tags Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredTags.map((tag, i) => (
              <div key={tag.id} className="animate-fade-in-up" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
                <TagCard tag={tag} onSelect={handleSelectTag} />
              </div>
            ))}
            <div className="animate-fade-in-up" style={{ animationDelay: `${(filteredTags.length + 3) * 80}ms` }}>
              <GenerateTagsCard />
            </div>
          </div>

        </div>
      </div>

      {/* Analysis Panel */}
      <TagAnalysisPanel tag={selectedTag} onClose={() => setSelectedTag(null)} />
    </div>
  );
};

export default Tags;
