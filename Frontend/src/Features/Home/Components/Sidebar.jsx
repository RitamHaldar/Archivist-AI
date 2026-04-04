import React, { useState } from 'react';
import {
  Home as HomeIcon, Folder, Network, Tag, Settings, HelpCircle, X, Sparkles
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'}`}>
    <div className="flex items-center gap-3">
      <Icon className={`w-[18px] h-[18px] transition-colors ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <span>{label}</span>
    </div>
    {badge && (
      <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full group-hover:bg-white transition-colors">{badge}</span>
    )}
  </button>
);

const Sidebar = ({ activeTab, setActiveTab, setShowHelp = () => {} }) => {
  return (
    <>
      <aside className="w-[280px] bg-[#FCFCFD] border-r border-gray-100 flex flex-col h-full py-8 px-6 animate-fade-in-up relative">
        <div className="flex-1">
          <div className="flex items-center gap-3 px-2 mb-12">
            <div className="w-10 h-10 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center bg-white text-indigo-600 font-bold text-xl select-none">
              A
            </div>
            <span className="font-extrabold text-[20px] tracking-tighter text-gray-900">Archivist AI</span>
          </div>

          <nav className="space-y-2 mb-8">
            <SidebarItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
            <SidebarItem icon={Folder} label="Collections" active={activeTab === 'Collections'} onClick={() => setActiveTab('Collections')} />
            <SidebarItem icon={Network} label="Knowledge Graph" active={activeTab === 'Knowledge Graph'} onClick={() => setActiveTab('Knowledge Graph')} />
            <SidebarItem icon={Tag} label="Tags" active={activeTab === 'Tags'} onClick={() => setActiveTab('Tags')} />
          </nav>
        </div>

        <div className="mt-auto">
          <button 
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-3 px-2 py-3 text-gray-400 hover:text-indigo-600 transition-all group duration-300 transform hover:translate-x-1"
          >
            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[14px] font-bold tracking-tight">Help & Info</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
