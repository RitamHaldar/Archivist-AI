import React from 'react';
import {
  Link as LinkIcon, FileText, Copy, Sparkles, Clock, Zap, Network,
  MoreHorizontal, Star, ArrowUpRight, Plus
} from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* Welcome Section */}
      <section className="animate-fade-in-up stagger-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            Welcome back, User <span className="animate-float origin-bottom-left inline-block">👋</span>
          </h1>
          <div className="flex items-center gap-3 relative min-h-[40px]">
            {/* Revealable Options */}
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-indigo-900 hover:bg-indigo-50 transition-colors cursor-default mt-2 w-max pr-8">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <p className="font-medium text-sm">
            <span className="font-bold">✨ AI Insight:</span> You saved 12 items this week, 3 related to AI.
          </p>
        </div>
      </section>

      {/* Resurfaced for You */}
      <section className="animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[19px] font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" /> Resurfaced for You
          </h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 subtle-ring card-hover flex flex-col justify-between h-full group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">Concept</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">Saved 4 months ago</span>
              </div>
              <h3 className="font-bold text-lg mb-2">The Philosophy of Minimalist UI</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">"Simplicity is not the absence of clutter, but the presence of focus." - Jony Ive.</p>
            </div>
            <div className="flex gap-2 items-start mt-auto pt-4 border-t border-gray-50 relative z-10 text-indigo-600">
              <Zap className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold">AI Context: Relevant to your current "Design System" project.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 subtle-ring card-hover flex flex-col justify-between h-full group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-50 text-pink-600 px-2.5 py-1 rounded-full">Resource</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">Saved 2 weeks ago</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Neural Architecture Patterns</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">A deep dive into how transformer models maintain contextual coherence in large...</p>
            </div>
            <div className="flex gap-2 items-start mt-auto pt-4 border-t border-gray-50 relative z-10 text-indigo-600">
              <Zap className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold">AI Context: You mentioned "transformers" in a note yesterday.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 subtle-ring card-hover flex flex-col justify-between h-full group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full">Paper</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">Saved 1 year ago</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Digital Gardens vs. File C...</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Moving from static archival to organic growth of knowledge structures.</p>
            </div>
            <div className="flex gap-2 items-start mt-auto pt-4 border-t border-gray-50 relative z-10 text-indigo-600">
              <Zap className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold">AI Context: This is the foundation of collection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Knowledge Clusters & Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up stagger-3">
        {/* Knowledge Clusters */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[19px] font-bold">Knowledge Clusters</h2>
            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cluster 1 */}
            <div className="bg-[#f8f9fb] rounded-[24px] p-6 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-indigo-100 rounded-tl-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-400">42 Items</span>
              </div>
              <h3 className="font-bold text-lg mb-1 relative z-10">Artificial Intelligence</h3>
              <p className="text-sm text-gray-500 font-medium relative z-10 mb-6 w-4/5 line-clamp-2">Deep learning, LLMs, and Neural Networks.</p>

              <div className="flex items-center relative z-10 mt-auto">
                <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-[#f8f9fb] -ml-0 z-30 overflow-hidden"><img src="https://ui-avatars.com/api/?name=JS&background=random" alt="user" /></div>
                <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-[#f8f9fb] -ml-2 z-20 overflow-hidden"><img src="https://ui-avatars.com/api/?name=AB&background=random" alt="user" /></div>
                <div className="w-7 h-7 rounded-full bg-indigo-100/80 text-indigo-700 border-2 border-[#f8f9fb] -ml-2 z-10 flex items-center justify-center text-[10px] font-bold">+30</div>
              </div>
            </div>

            {/* Cluster 2 */}
            <div className="bg-[#f8f9fb] rounded-[24px] p-6 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-pink-100 rounded-tl-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-[#be185d] flex items-center justify-center text-white shadow-md shadow-pink-200">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-semibold text-gray-400">28 Items</span>
              </div>
              <h3 className="font-bold text-lg mb-1 relative z-10">Visual Design</h3>
              <p className="text-sm text-gray-500 font-medium relative z-10 mb-6 w-4/5 line-clamp-2">Typography, UI/UX, and color theory principles.</p>

              <div className="flex items-center relative z-10 mt-auto">
                <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-[#f8f9fb] -ml-0 z-30 overflow-hidden"><img src="https://ui-avatars.com/api/?name=DL&background=random" alt="user" /></div>
                <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-[#f8f9fb] -ml-2 z-20 overflow-hidden"><img src="https://ui-avatars.com/api/?name=MK&background=random" alt="user" /></div>
                <div className="w-7 h-7 rounded-full bg-pink-100/80 text-pink-700 border-2 border-[#f8f9fb] -ml-2 z-10 flex items-center justify-center text-[10px] font-bold">+25</div>
              </div>
            </div>
          </div>
        </section>

        {/* Connections */}
        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[19px] font-bold">Connections</h2>
            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"><ArrowUpRight className="w-5 h-5" /></button>
          </div>

          <div className="bg-[#f4f5f8] rounded-[24px] h-[230px] relative overflow-hidden flex flex-col items-center justify-center border border-gray-100 group">
            {/* Mock graph decoration */}
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
              <p className="font-bold text-[13px] text-gray-900">1,204 Active Nodes</p>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-4 py-2.5 rounded-full shadow transition-colors z-10 uppercase tracking-widest">
              Expand Graph View
            </button>

            <button className="absolute bottom-4 right-4 w-10 h-10 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 hover:scale-110 transition-all">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>

      {/* Activity Layer - Now Full Width */}
      <div className="pt-6 animate-fade-in-up stagger-4 relative">
        {/* Recent Activity */}
        <section className="space-y-4">
          <h2 className="text-[19px] font-bold mb-6">Recent Activity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Activity 1 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 group hover:border-indigo-100 transition-colors card-hover flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[15px] text-gray-900 truncate">Building a Second Brain - Summary</h3>
                  <span className="text-xs font-semibold text-gray-400 shrink-0">2 hours ago</span>
                </div>
                <p className="text-[13px] text-gray-500 mb-3 truncate">Personal knowledge management systems and the power of external memory...</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#productivity</span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#notes</span>
                </div>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 group hover:border-gray-200 transition-colors card-hover flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100/80 flex items-center justify-center shrink-0 border border-gray-200">
                <LinkIcon className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[15px] text-gray-900 truncate">The Rise of Local LLMs</h3>
                  <span className="text-xs font-semibold text-gray-400 shrink-0">Yesterday</span>
                </div>
                <p className="text-[13px] text-gray-400 mb-3 truncate hover:text-indigo-500 cursor-pointer transition-colors">https://techcrunch.com/2023/12/04/local-llms-privacy...</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#ai</span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#privacy</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Highlights */}
      <section className="pt-6 animate-fade-in-up stagger-5">
        <h2 className="text-[19px] font-bold mb-6 flex items-center gap-2">
          <span className="text-indigo-600 text-2xl font-serif leading-none mt-1">"</span> Recent Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Highlight 1 */}
          <div className="bg-[#f8f9fb] p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden card-hover">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            <p className="text-gray-900 font-medium italic mb-6 relative z-10 leading-relaxed text-[15px]">"The best way to predict the future is to invent it."</p>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alan Kay • Computing Theory</span>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="bg-[#f8f9fb] p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden card-hover">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-500"></div>
            <p className="text-gray-900 font-medium italic mb-6 relative z-10 leading-relaxed text-[15px]">"Information is the resolution of uncertainty."</p>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Claude Shannon • Information Theory</span>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="bg-[#f8f9fb] p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden card-hover">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500"></div>
            <p className="text-gray-900 font-medium italic mb-6 relative z-10 leading-relaxed text-[15px]">"Tools for thought are not just software, they are ways of being."</p>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Howard Rheingold • Digital Literacy</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
