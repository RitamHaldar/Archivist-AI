import React from 'react';
import { 
  ChevronRight, Grid, List, Plus, ChevronDown, ListFilter,
  Globe, FileText, PlayCircle, Share2, Bookmark, Download, Clock, Sparkles
} from 'lucide-react';

const Card = ({ type, source, title, tags, date, icon: ActionIcon, bgClass, graphic }) => (
  <div className="bg-white rounded-[24px] border border-[1px] border-gray-100 flex flex-col h-full overflow-hidden subtle-ring card-hover group cursor-pointer w-[280px]">
    {/* Graphic Area */}
    <div className={`h-[180px] w-full ${bgClass} p-5 relative overflow-hidden flex items-center justify-center`}>
      {graphic}
      {/* Small top-left icon representing the type overlay */}
      <div className="absolute top-4 left-4 w-7 h-7 bg-white/90 backdrop-blur shadow-sm rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
        {type === 'ARTICLE' ? <Globe className="w-3.5 h-3.5 text-gray-700" /> : 
         type === 'PDF REPORT' ? <FileText className="w-3.5 h-3.5 text-red-500 fill-red-500/20" /> : 
         <PlayCircle className="w-3.5 h-3.5 text-gray-600 fill-gray-600" />}
      </div>
    </div>
    
    {/* Content Area */}
    <div className="p-5 flex flex-col flex-1 relative z-10 bg-white min-h-[190px]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-100/80 text-gray-600 px-2.5 py-1 rounded-md">{type}</span>
        <span className="text-[10px] font-semibold text-gray-400 tracking-wide">{source}</span>
      </div>
      
      <h3 className="font-extrabold text-[17px] leading-snug mb-4 text-gray-900 line-clamp-3 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-[10px] font-bold tracking-wide text-indigo-600 bg-indigo-50/80 px-2 py-1 flex items-center justify-center hover:bg-indigo-100 transition-colors">{tag}</span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-50/80 text-gray-400">
        <span className="text-[11px] font-semibold">Added {date}</span>
        <button className="hover:text-gray-900 transition-colors">
          <ActionIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const Collections = () => {
  return (
    <div className="animate-fade-in-up">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8 animate-fade-in-up stagger-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-3">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Collections</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900">AI Ethics Research</span>
          </div>
          
          <h1 className="text-[42px] font-extrabold tracking-tight text-gray-900 mb-2">AI Ethics Research</h1>
          <div className="flex items-center gap-2 text-[14px] font-bold text-indigo-500/80">
            <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-90"></div>
            AI-curated insights from 42 sources
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-100">
            <button className="p-2 rounded-full bg-gray-100 text-gray-900 w-[42px] h-[42px] flex items-center justify-center shadow-sm">
              <Grid className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors w-[42px] h-[42px] flex items-center justify-center">
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-[14px] rounded-full text-[14px] font-bold transition-all shadow-md shadow-indigo-100 hover:shadow-lg hover:-translate-y-0.5">
            <Plus className="w-[18px] h-[18px]" /> New Entry
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in-up stagger-2 border-b border-gray-100/80 pb-6 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100/50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors min-h-[38px] min-w-[180px] justify-between">
            <div className="flex items-center gap-2">
               <span className="text-gray-400 uppercase tracking-widest text-[9px]">Sort:</span> Recently Updated 
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>
          
          <div className="flex gap-2 flex-wrap min-h-[38px]">
            <button className="px-5 py-2 rounded-full text-[11px] font-bold bg-white text-indigo-600 border border-indigo-100 shadow-[0_2px_8px_rgba(79,70,229,0.06)] transition-colors">All Resources</button>
            <button className="px-5 py-2 rounded-full text-[11px] font-bold text-gray-500 bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors">Articles</button>
            <button className="px-5 py-2 rounded-full text-[11px] font-bold text-gray-500 bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors">PDFs</button>
            <button className="px-5 py-2 rounded-full text-[11px] font-bold text-gray-500 bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors">Videos</button>
          </div>
        </div>
        
        <button className="flex items-center gap-2 text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          <ListFilter className="w-4 h-4" /> Advanced Filters
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="flex flex-wrap gap-6 mb-12 animate-fade-in-up stagger-3 justify-center md:justify-start">
        {/* Card 1 */}
        <Card 
          type="ARTICLE" source="medium.com" 
          title="The Moral Landscape of AGI" 
          tags={['#Ethics', '#AGI']} 
          date="Oct 12, 2023" icon={Bookmark}
          bgClass="bg-[#2a7a7a]"
          graphic={
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full bg-[#3facad] opacity-20 animate-pulse-slow"></div>
              <div className="w-16 h-16 rounded-full bg-[#82d6d4] opacity-80 backdrop-blur-[2px] shadow-inner flex items-center justify-center relative z-10">
                 {/* subtle globe marking */}
                 <div className="w-full h-[1px] bg-white/40 absolute top-1/2 -translate-y-1/2 rotate-12"></div>
                 <div className="h-full w-[1px] bg-white/40 absolute left-1/2 -translate-x-1/2 rotate-12"></div>
                 <div className="w-10 h-10 border border-white/40 rounded-full absolute"></div>
              </div>
              <p className="mt-4 text-white/90 text-[10px] font-medium tracking-wide">Safe for work</p>
            </div>
          }
        />

        {/* Card 2 */}
        <Card 
          type="PDF REPORT" source="arxiv.org" 
          title="Bias in Large Language Models: A Meta-Analysis" 
          tags={['#LLM', '#Bias']} 
          date="Oct 08, 2023" icon={Download}
          bgClass="bg-[#dedeed]"
          graphic={
            <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
               <div className="w-[50px] h-[60px] bg-[#a9a7d3] rounded-md flex items-center justify-center shadow-md relative">
                 <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-white/40 rounded-bl-sm rounded-tr-md"></div>
                 <span className="text-white font-black text-xs tracking-tight">PDF</span>
               </div>
               
               {/* Background abstract boxes */}
               <div className="absolute w-[50px] h-[60px] bg-[#a9a7d3]/40 rounded-md -rotate-12 translate-x-4 translate-y-2 mix-blend-multiply opacity-60"></div>
            </div>
          }
        />

        {/* Card 3 */}
        <Card 
          type="VIDEO" source="youtube.com" 
          title="Stanford Symposium: AI Governance & Law" 
          tags={['#Governance', '#Law']} 
          date="Sep 29, 2023" icon={Clock}
          bgClass="bg-[#317373]"
          graphic={
            <div className="flex flex-col items-center justify-center w-full relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="absolute -top-14 w-40 h-40 bg-[#1f5959] rounded-full opacity-60 blur-xl"></div>
              
              <div className="border-[1.5px] border-white/20 px-3 py-1 pb-[5px] rounded-lg bg-[#276b6b]/60 backdrop-blur-sm mb-4 relative z-10 flex flex-col items-center">
                 <div className="w-full flex justify-between space-x-[2px] mb-[2px] opacity-70">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                 </div>
                 <p className="text-[#f1ca7e] text-[10px] font-black uppercase tracking-[0.2em] relative top-[2px]">Resource</p>
                 <div className="w-full flex justify-between space-x-[2px] mt-[3px] opacity-70">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                 </div>
              </div>
              
              <div className="bg-[#e49c3b] px-4 py-1.5 rounded-full transform rotate-3 relative z-10 shadow-lg">
                <p className="text-white text-[8px] font-bold uppercase tracking-widest leading-none mt-[1px]">Safe for work</p>
              </div>
            </div>
          }
        />

        {/* Card 4 */}
        <Card 
          type="ARTICLE" source="openai.com" 
          title="Safety Guidelines for Superintelligence" 
          tags={['#Safety', '#AI']} 
          date="Sep 21, 2023" icon={Share2}
          bgClass="bg-[#1b5e5f]"
          graphic={
            <div className="relative w-full h-full flex items-center justify-center opacity-80 overflow-hidden group-hover:scale-105 transition-transform duration-700">
               {/* Abstract shapes representing OpenAI style logo/art */}
               <div className="absolute w-[80px] h-[80px] border-[16px] border-[#3eb4af] rounded-full top-[20%] right-[10%] transform rotate-45 mix-blend-screen opacity-90"></div>
               <div className="absolute w-[50px] h-[50px] bg-[#3eb4af] rounded-tl-full rounded-tr-[10px] rounded-br-full rounded-bl-[10px] bottom-[10%] left-[20%] opacity-90 mix-blend-screen transform -rotate-[30deg]"></div>
               <div className="absolute w-[30px] h-[30px] bg-[#3eb4af] rounded-tl-full rounded-tr-none rounded-br-full rounded-bl-full top-[15%] left-[30%] opacity-80 mix-blend-screen -rotate-90"></div>
            </div>
          }
        />
      </div>

      {/* AI Summary Banner */}
      <div className="bg-gradient-to-br from-[#ebeef1] to-[#e1e4e8] rounded-[24px] p-6 pr-8 flex items-center justify-between shadow-inner animate-fade-in-up stagger-4 relative overflow-hidden h-[95px] max-w-[1100px] border-[1px] border-white backdrop-blur flex-wrap md:flex-nowrap gap-4">        
        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
          <div className="w-[50px] h-[50px] bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
            <Sparkles className="w-5 h-5 text-indigo-700 fill-indigo-700/30" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-1">AI Research Summary Available</h3>
            <p className="text-[12px] text-gray-500 font-medium tracking-wide">
              The AI has analyzed these 42 items and found a recurring theme: "The trade-off between model transparency and performance."
            </p>
          </div>
        </div>
        
        <div className="flex md:justify-end w-full md:w-auto relative z-10">
           <button className="bg-white hover:bg-gray-50 text-indigo-700 px-6 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 whitespace-nowrap border border-gray-100">
             View Synthesis
           </button>
        </div>
      </div>

    </div>
  );
};

export default Collections;
