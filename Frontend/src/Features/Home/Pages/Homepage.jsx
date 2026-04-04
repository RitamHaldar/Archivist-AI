import React, { useState, useEffect, useRef } from 'react';
import Collections from '../Components/Collections';
import Home from '../Components/Home';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import KnowledgeGraph from '../Components/KnowledgeGraph';
import Tags from '../Components/Tags';
import { gsap } from 'gsap';
import { useHome } from '../Hooks/useHome';


const Homepage = () => {
  const { handleCreatePost, loading } = useHome();
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

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
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
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

        </div>
      </main>
    </div>
  );
}

export default Homepage;