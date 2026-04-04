import React, { useState, useEffect, useRef } from 'react';
import Collections from '../Components/Collections';
import Home from '../Components/Home';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import KnowledgeGraph from '../Components/KnowledgeGraph';
import Tags from '../Components/Tags';
import ExtensionPromo from '../Components/ExtensionPromo';
import SearchPage from '../Components/SearchPage';
import { gsap } from 'gsap';
import { useHome } from '../Hooks/useHome';
import { X, Sparkles } from 'lucide-react';


const Homepage = () => {
  const { handleCreatePost, loading } = useHome();
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showHelp, setShowHelp] = useState(false);

  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(sidebarRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
      )
        .fromTo(navbarRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          "-=0.8"
        )
        .fromTo(contentRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.9)' },
          "-=0.6"
        );
    });
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">

      <div ref={sidebarRef} className="h-full z-20">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setShowHelp={setShowHelp} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative scroll-smooth bg-white/50">

        <div ref={navbarRef} className="z-10">
          <Navbar
            showAddOptions={showAddOptions}
            setShowAddOptions={setShowAddOptions}
            showDiscovery={showDiscovery}
            setShowDiscovery={setShowDiscovery}
            createPost={handleCreatePost}
            isLoading={loading}
            setActiveTab={setActiveTab}
          />
        </div>

        <div ref={contentRef} className="flex-1 p-8 max-w-[1200px] mx-auto w-full space-y-10 pb-20">

          {activeTab === 'Home' && (
            <Home showAddOptions={showAddOptions} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'Collections' && (
            <Collections />
          )}

          {activeTab === 'Knowledge Graph' && (
            <KnowledgeGraph />
          )}

          {activeTab === 'Tags' && (
            <Tags />
          )}
          
          {activeTab === 'Search' && (
            <SearchPage />
          )}

        </div>
        
        <ExtensionPromo />

        {/* Help Side Popup - Fixed for Global Viewport Visibility */}
        {showHelp && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-12 animate-fade-in">
            <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
              onClick={() => setShowHelp(false)}
            />
            <div 
              className="bg-white rounded-[60px] relative z-10 shadow-[0_40px_140px_-20px_rgba(0,0,0,0.5)] animate-slide-in-left border border-gray-100 overflow-hidden flex flex-row"
              style={{ width: '1100px', height: '540px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Branding */}
              <div className="w-[360px] bg-indigo-600 p-16 flex flex-col justify-center items-center text-center relative shrink-0">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
                 <div className="w-28 h-28 bg-white/20 backdrop-blur-2xl rounded-[36px] flex items-center justify-center text-white shadow-2xl mb-10 relative z-10 border border-white/30">
                  <Sparkles className="w-14 h-14" />
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter mb-4 relative z-10 leading-none">Archivist AI</h2>
                <div className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 relative z-10">
                  <span className="text-white font-black text-[11px] uppercase tracking-widest">Neural Ecosystem v1.2</span>
                </div>
              </div>

              {/* Right Column: Information */}
              <div className="flex-1 bg-white p-16 relative flex flex-col justify-center min-w-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                
                <button 
                  onClick={() => setShowHelp(false)}
                  className="absolute top-10 right-10 p-4 text-gray-300 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all z-50 transition-transform active:scale-90"
                >
                  <X className="w-7 h-7" />
                </button>

                <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-indigo-600 font-bold text-xs uppercase tracking-[0.3em]">The Intelligence Layer</h3>
                    <p className="text-[32px] text-gray-900 font-black leading-[1.1] tracking-tighter">
                      Building a personal <span className="bg-indigo-600 text-white px-2">second brain</span> through deep semantic synthesis.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Semantic Core</h4>
                      <p className="text-[16px] text-gray-500 font-medium leading-relaxed">
                        Automated knowledge clustering using high-dimensional vector embeddings.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Neural Recall</h4>
                      <p className="text-[16px] text-gray-500 font-medium leading-relaxed">
                        Intelligent resurfacing of relevant insights across your entire network.
                      </p>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 shadow-md flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 592}`} alt="User" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-gray-900 leading-none mb-1">Research Network</p>
                        <p className="text-[11px] font-bold text-gray-400">Global synthesis data</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">System Status</p>
                      <p className="text-[12px] font-bold text-gray-400 animate-pulse">Running Neural Synthesis...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Homepage;