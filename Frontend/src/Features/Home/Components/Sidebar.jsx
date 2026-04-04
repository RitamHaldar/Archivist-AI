import React from 'react';
import {
  Home as HomeIcon, Folder, Network, Tag, Star, Settings, HelpCircle
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

const LibraryItem = ({ color, label }) => (
  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 transition-all">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
    <span>{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-[280px] bg-[#FCFCFD] border-r border-gray-100 flex flex-col justify-between py-6 px-4 animate-fade-in-up">
      <div>
        <div className="flex items-center gap-3 px-3 mb-10">
          <div className="w-9 h-9 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center bg-white text-indigo-600 font-bold text-lg select-none">
            A
          </div>
          <span className="font-bold text-lg tracking-tight">Archivist AI</span>
        </div>

        <nav className="space-y-1 mb-8">
          <SidebarItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
          <SidebarItem icon={Folder} label="Collections" active={activeTab === 'Collections'} onClick={() => setActiveTab('Collections')} />
          <SidebarItem icon={Network} label="Knowledge Graph" active={activeTab === 'Knowledge Graph'} onClick={() => setActiveTab('Knowledge Graph')} />
          <SidebarItem icon={Tag} label="Tags" active={activeTab === 'Tags'} onClick={() => setActiveTab('Tags')} />
        </nav>

        <div>
          <h4 className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 select-none">Your Library</h4>
          <div className="space-y-1">
            <LibraryItem color="bg-indigo-500" label="AI Ethics" />
            <LibraryItem color="bg-pink-500" label="Design Theory" />
          </div>
        </div>
      </div>

      <div className="space-y-1 border-t border-gray-100 pt-4 mt-8">
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={HelpCircle} label="Help" />
      </div>
    </aside>
  );
};

export default Sidebar;
