import React from 'react';
import { Search, Plus, Bell, X, Zap, LinkIcon, FileText, Copy } from 'lucide-react';

const Navbar = ({
  showAddOptions,
  setShowAddOptions,
  showDiscovery,
  setShowDiscovery
}) => {
  return (
    <div className="sticky top-0 z-50">
      <header className="glass-effect px-8 py-5 flex items-center justify-between animate-fade-in relative z-10">
        {/* Search bar */}
        <div className="relative w-full max-w-xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-[18px] w-[18px] text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Ask your knowledge base..."
            className="block w-full pl-11 pr-20 py-2.5 bg-[#F5F5F7] border border-transparent rounded-2xl text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-200 transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100 px-2 py-1 rounded-lg">CMD + K</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowAddOptions(!showAddOptions)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
              showAddOptions 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5'
            }`}
          >
            <Plus className={`w-4 h-4 transition-transform duration-500 ${showAddOptions ? 'rotate-45' : 'rotate-0'}`} />
            {showAddOptions ? 'Close' : 'Add New'}
          </button>
        <div className="relative">
          <button
            onClick={() => setShowDiscovery(!showDiscovery)}
            className={`relative p-2 transition-all duration-300 rounded-full h-10 w-10 flex items-center justify-center ${showDiscovery ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            <div className={`transition-transform duration-500 ${showDiscovery ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
              {showDiscovery ? <X className="w-5 h-5" /> : <Bell className="w-[22px] h-[22px]" />}
            </div>
            {!showDiscovery && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
          </button>

          {/* Discovery Popover Panel */}
          {showDiscovery && (
            <div className="absolute top-12 right-0 w-[350px] z-[100] animate-spring-in">
              <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[32px] p-8 shadow-2xl shadow-indigo-100/40 space-y-8">
                <div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                    Discovery <span className="bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-md text-[9px]">New</span>
                  </h2>

                  <div className="bg-indigo-50/30 border border-indigo-100/60 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-[14px] h-[14px] text-indigo-600 fill-indigo-600/20" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">AI Recommended</span>
                    </div>

                    <h3 className="font-extrabold text-[16px] mb-2 text-gray-900">Attention is All You Need</h3>
                    <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">You might like this paper based on your interest in "Transformer Models".</p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 98% Match</span>
                      <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Add to Library</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {['Design System', 'Typography', 'Machine Learning', 'Startups', 'Ethics', 'Psychology'].map(tag => (
                      <button key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all hover:-translate-y-0.5">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer">
          <img src="https://ui-avatars.com/api/?name=User&background=random&color=fff" className="w-full h-full object-cover" alt="User" />
        </button>
      </div>
    </header>

    {/* Add Options Overlay/Bar */}
    {showAddOptions && (
      <div className="absolute top-full left-0 right-0 glass-effect border-t-0 py-4 px-8 flex items-center justify-center gap-4 animate-slide-down shadow-xl shadow-indigo-100/20 z-0">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 border border-gray-200 hover:border-indigo-300 rounded-2xl text-sm font-semibold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-spring-in stagger-1 group">
            <LinkIcon className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> Save Link
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 border border-gray-200 hover:border-blue-300 rounded-2xl text-sm font-semibold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-spring-in stagger-2 group">
            <FileText className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Upload PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 border border-gray-200 hover:border-purple-300 rounded-2xl text-sm font-semibold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 animate-spring-in stagger-3 group">
            <Copy className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" /> Paste Content
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Navbar;
