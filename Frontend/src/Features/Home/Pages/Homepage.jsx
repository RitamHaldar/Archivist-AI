import React, { useState } from 'react';
import Collections from '../Components/Collections';
import Home from '../Components/Home';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import KnowledgeGraph from '../Components/KnowledgeGraph';
import Tags from '../Components/Tags';
import Favorites from '../Components/Favorites';


const Homepage = () => {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="flex h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative scroll-smooth">
        
        <Navbar 
          showAddOptions={showAddOptions} 
          setShowAddOptions={setShowAddOptions} 
          showDiscovery={showDiscovery} 
          setShowDiscovery={setShowDiscovery} 
        />

        {/* Content Body */}
        <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full space-y-10 pb-20">
          
          {activeTab === 'Home' && (
            <Home showAddOptions={showAddOptions} />
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
          
          {activeTab === 'Favorites' && (
            <Favorites />
          )}

        </div>
      </main>
    </div>
  );
}

export default Homepage;