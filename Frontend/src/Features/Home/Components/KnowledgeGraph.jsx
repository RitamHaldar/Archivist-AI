import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  FileText, Play, X, Zap,
  Plus, Minus, RotateCcw, Maximize,
  ArrowRight, MoreHorizontal, Network, Star,
  ChevronLeft, ChevronRight, Share2, Bookmark, Download, Globe, Sparkles
} from 'lucide-react';

const temporaryData = {
  'All': {
    nodes: [
      { id: '1', label: 'Cognitive Load Theory', type: 'article', source: 'interaction-design.org', tags: ['#UXDesign', '#Cognitive', '#Theory'], summary: 'Focuses on how spatial awareness dictates digital navigation patterns. Key takeaway: minimize friction by mapping to physical mental models.' },
      { id: '2', label: 'Design Theory 2024', type: 'pdf', source: 'Document', tags: ['#Trends', '#UI', '#2024'], summary: 'Comprehensive review of emerging design trends, focusing on spatial UI and glassmorphic elements.' },
      { id: '3', label: 'Tweet by @DieterRams', type: 'tweet', source: 'Twitter', tags: ['#Inspiration', '#Minimalism'], summary: '"Good design is as little design as possible." A foundational principle for creating intuitive interfaces.' },
      { id: '4', label: 'Visual Hierarchy Tutorial', type: 'video', source: 'YouTube', tags: ['#Tutorial', '#Design'], summary: 'Video guide on establishing clear visual pathways using scale, color, and spacing.' },
      { id: '5', label: 'Gestalt Principles', type: 'article', source: 'smashingmagazine.com', tags: ['#Psychology', '#UX'], summary: 'Understanding how the human eye perceives visual elements as a whole rather than disconnected parts.' },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '2', target: '4' },
      { source: '1', target: '5' },
      { source: '4', target: '5' },
    ]
  },
  'AI Ethics': {
    nodes: [
      { id: '101', label: 'Algorithmic Bias', type: 'pdf', source: 'researchgate.net', tags: ['#Ethics', '#Bias', '#AI'], summary: 'Exploring how historical data can perpetuate bias in commercial algorithms.' },
      { id: '102', label: 'The Trolley Problem AI', type: 'article', source: 'medium.com', tags: ['#Ethics', '#Philosophy'], summary: 'Classical philosophical dilemmas in the context of autonomous vehicles.' },
      { id: '103', label: 'EU AI Act Summary', type: 'article', source: 'europa.eu', tags: ['#Regulation', '#Legal'], summary: 'Key points of the upcoming European legislation on artificial intelligence.' },
    ],
    links: [
      { source: '101', target: '102' },
      { source: '101', target: '103' },
    ]
  },
  'Design Systems': {
    nodes: [
      { id: '201', label: 'Atomic Design', type: 'article', source: 'bradfrost.com', tags: ['#DesignSystems', '#Code'], summary: 'The foundational methodology for creating modular UI systems.' },
      { id: '202', label: 'Tokens at Scale', type: 'video', source: 'Figma Youtube', tags: ['#Figma', '#Tokens'], summary: 'How to manage design tokens across large multi-platform applications.' },
      { id: '203', label: 'Accessible Contrast', type: 'article', source: 'w3c.org', tags: ['#Accessibility', '#Color'], summary: 'Understanding WCAG 2.1 guidelines for visual hierarchy.' },
    ],
    links: [
      { source: '201', target: '202' },
      { source: '201', target: '203' },
    ]
  }
};

const ResurfacedData = {
  'All': [
    { type: 'Concept', time: '4 MONTHS AGO', title: 'The Philosophy of Minimalist UI', summary: '"Simplicity is not the absence of clutter, but the presence of focus." - Jony Ive.', context: 'Relevant to your current Design System project.' },
    { type: 'Resource', time: '2 WEEKS AGO', title: 'Neural Architecture Patterns', summary: 'A deep dive into how transformer models maintain contextual coherence...', context: 'You mentioned transformers in a note yesterday.' },
    { type: 'Paper', time: '1 YEAR AGO', title: 'Digital Gardens vs. File Cabinets', summary: 'Moving from static archival to organic growth of knowledge structures.', context: 'This is the foundation of collection.' },
  ],
  'AI Ethics': [
    { type: 'Article', time: '1 MONTH AGO', title: 'Human-Centered AI', summary: 'Principles for designing algorithms that prioritize user agency and transparency.', context: 'You were researching AI alignment last week.' },
    { type: 'Report', time: '3 MONTHS AGO', title: 'State of AI Bias 2023', summary: 'Comprehensive analysis of bias markers in top LLM providers.', context: 'Directly relates to the Bias node in your graph.' },
  ],
  'Design Systems': [
    { type: 'Guide', time: '1 WEEK AGO', title: 'The Component Lifecycle', summary: 'Strategies for managing deprecated components in living design systems.', context: 'Matches your current work on UI refactoring.' },
    { type: 'Tool', time: '2 MONTHS AGO', title: 'Style Dictionary deep-dive', summary: 'Automating multi-platform token delivery across web and mobile.', context: 'You saved this while setting up Figma sync.' },
  ]
};

const ClusterCard = ({ icon: Icon, label, count, description, colorClass, bgClass }) => (
  <div className={`rounded-[32px] p-8 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full bg-[#FAFAFB] shadow-md shadow-gray-100/20`}>
    <div className={`absolute right-0 bottom-0 w-48 h-48 ${bgClass} rounded-tl-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-12 relative z-10">
      <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center text-white shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[12px] font-bold text-gray-400 bg-white/80 px-3 py-1 rounded-full border border-gray-50">{count} Items</span>
    </div>
    <h3 className="font-extrabold text-xl mb-2 relative z-10 text-gray-900">{label}</h3>
    <p className="text-sm text-gray-500 font-medium relative z-10 mb-6 leading-relaxed">{description}</p>
  </div>
);

const RevisitItem = ({ image, title, savedAt, status }) => (
  <div className="flex-none w-[320px] bg-white rounded-[28px] p-4 subtle-ring card-hover flex items-center gap-4 group cursor-pointer border border-gray-50/50">
    <div className="w-20 h-20 rounded-[20px] overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
      <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
      {status === 'review' && <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center backdrop-blur-none"></div>}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-[15px] text-gray-900 mb-1 truncate leading-tight">{title}</h3>
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Saved {savedAt}</p>
      <div className="flex items-center gap-1.5 text-indigo-600">
        {status === 'review' ? (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 rounded-md">
            <Star className="w-3 h-3 fill-indigo-600" />
            <span className="text-[10px] font-bold">Review suggested</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-md">
            <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-600">Refresh your memory</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ResurfacedCard = ({ type, time, title, summary, context }) => (
  <div className="bg-white rounded-[28px] p-6 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full shadow-sm">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${['Concept', 'Article', 'Guide'].includes(type) ? 'bg-indigo-50 text-indigo-600' :
          ['Resource', 'Tool'].includes(type) ? 'bg-pink-50 text-pink-600' :
            'bg-emerald-50 text-emerald-600'
          }`}>
          {type}
        </span>
        <span className="text-[11px] font-bold text-gray-400 tracking-tight">Saved {time}</span>
      </div>
      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-600 transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    <h3 className="font-extrabold text-[17px] text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
      {title}
    </h3>
    <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2 leading-relaxed">
      {summary}
    </p>
    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2 text-indigo-600 relative z-10">
      <Zap className="w-3.5 h-3.5 fill-indigo-600" />
      <p className="text-[11px] font-bold tracking-tight">AI Context: {context}</p>
    </div>
  </div>
);

const KnowledgeGraph = () => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Items');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = ['All', 'AI Ethics', 'Design Systems'];

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = 520;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    const filter = defs.append("filter")
      .attr("id", "soft-shadow")
      .attr("height", "200%");

    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", "8")
      .attr("result", "blur");

    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", "0")
      .attr("dy", "10")
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const getTypeConfig = (type) => {
      switch (type) {
        case 'article': return { color: '#4F46E5', icon: Globe };
        case 'pdf': return { color: '#8B5CF6', icon: FileText };
        case 'tweet': return { color: '#EC4899', icon: X };
        case 'video': return { color: '#10B981', icon: Play };
        default: return { color: '#6366F1', icon: FileText };
      }
    };

    const topicData = temporaryData[selectedTopic] || temporaryData['All'];
    const data = {
      nodes: topicData.nodes.map(d => ({ ...d })),
      links: topicData.links.map(d => ({ ...d }))
    };

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(180))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(80));

    const linkPaths = svg.append("g")
      .selectAll("path")
      .data(data.links)
      .enter().append("path")
      .attr("stroke", "#E5E7EB")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("stroke-dasharray", "6,6")
      .attr("class", "animate-dash-offset");

    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "cursor-pointer group")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        setSelectedNode(d);
        event.stopPropagation();
      });

    nodeGroup.append("rect")
      .attr("rx", 22)
      .attr("ry", 22)
      .attr("height", 48)
      .attr("width", d => Math.max(180, d.label.length * 8 + 90))
      .attr("x", d => -(Math.max(180, d.label.length * 8 + 90) / 2))
      .attr("y", -24)
      .attr("fill", "#ffffff")
      .attr("stroke", "#F3F4F6")
      .attr("stroke-width", 1.5)
      .style("filter", "url(#soft-shadow)")
      .attr("class", "transition-all duration-300");

    nodeGroup.append("circle")
      .attr("r", 15)
      .attr("cx", d => -(Math.max(180, d.label.length * 8 + 90) / 2) + 28)
      .attr("cy", 0)
      .attr("fill", d => getTypeConfig(d.type).color);

    nodeGroup.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("x", d => -(Math.max(180, d.label.length * 8 + 90) / 2) + 22)
      .attr("y", -6)
      .attr("fill", "#ffffff")
      .attr("rx", 2);

    nodeGroup.append("text")
      .text(d => d.label)
      .attr("x", d => -(Math.max(180, d.label.length * 8 + 90) / 2) + 54)
      .attr("y", 5)
      .style("font-size", "14px")
      .style("font-weight", "700")
      .style("fill", "#111827")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      linkPaths.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    svg.on("click", () => setSelectedNode(null));

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      d3.select(this).select("rect").attr("stroke", "#4F46E5").attr("stroke-width", 2);
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
      d3.select(this).select("rect").attr("stroke", "#F3F4F6").attr("stroke-width", 1.5);
    }

    return () => simulation.stop();
  }, [selectedTopic]);

  const activeResurfaced = useMemo(() => ResurfacedData[selectedTopic] || ResurfacedData['All'], [selectedTopic]);

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="animate-fade-in-up stagger-1">
            <h1 className="text-[48px] font-black tracking-tighter text-gray-900 mb-2 leading-none">Knowledge Graph</h1>
            <p className="text-[18px] text-gray-500 font-medium tracking-tight">Visualize the neural pathways of your synthesized thoughts.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-[20px] shadow-sm border border-white/50">
            {['Items', 'Tags', 'Domains', 'Time'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2.5 rounded-2xl text-[14px] font-bold transition-all duration-300 ${activeFilter === tab ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/[0.02]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selector */}
        <div className="flex items-center gap-3 animate-fade-in-up stagger-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">Explore Topics:</span>
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-6 py-2.5 rounded-2xl text-[13px] font-extrabold transition-all border ${selectedTopic === topic
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-500 border-gray-100 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Area Card */}
      <div className="relative bg-[#FAFAFB] rounded-[48px] border border-gray-100/50 shadow-2xl shadow-indigo-100/40 overflow-hidden min-h-[520px] animate-fade-in-up stagger-3" ref={wrapperRef}>
        <div className="absolute top-10 left-10 flex items-center gap-8 z-10 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-[24px] border border-white shadow-xl shadow-indigo-100/20">
          {[
            { color: 'bg-indigo-600', label: 'ARTICLES' },
            { color: 'bg-purple-600', label: 'PDFS' },
            { color: 'bg-pink-600', label: 'TWEETS' },
            { color: 'bg-emerald-600', label: 'VIDEOS' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm ring-2 ring-white`}></span>
              <span className="text-[11px] font-black text-gray-400 tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-10 flex flex-col gap-3 z-10">
          <button className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><Plus className="w-5 h-5 group-hover:scale-110" /></button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><Minus className="w-5 h-5 group-hover:scale-110" /></button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><RotateCcw className="w-5 h-5 group-hover:rotate-180" /></button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><Maximize className="w-5 h-5 group-hover:scale-110" /></button>
        </div>

        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4F46E5 1.5px, transparent 0)', backgroundSize: '28px 28px' }}></div>
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ height: '520px' }}></svg>

        {selectedNode && (
          <div className="absolute top-0 right-0 h-full w-[460px] p-8 animate-slide-in-right z-30 pointer-events-none">
            <div className="w-full h-full bg-white/98 backdrop-blur-3xl border border-gray-100 rounded-[48px] shadow-[0_48px_96px_-24px_rgba(0,0,0,0.2)] p-12 flex flex-col pointer-events-auto overflow-y-auto scrollbar-hide">
              <div className="flex items-center justify-between mb-10">
                <span className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em]">{selectedNode.type}</span>
                <button onClick={() => setSelectedNode(null)} className="p-3.5 hover:bg-gray-100 rounded-2xl transition-all duration-500 text-gray-400 hover:text-gray-900 group">
                  <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
              <div className="w-full h-48 rounded-[40px] bg-gradient-to-br from-indigo-600 via-violet-500 to-fuchsia-500 mb-10 shadow-2xl relative overflow-hidden group/banner">
                <div className="absolute bottom-8 right-8 p-5 rounded-[24px] bg-white/20 backdrop-blur-md shadow-2xl border border-white/20 text-white animate-float"><Zap className="w-7 h-7 fill-white" /></div>
              </div>
              <h2 className="text-[32px] font-black text-gray-900 mb-2 leading-[1.1] tracking-tight">{selectedNode.label}</h2>
              <p className="text-[15px] font-bold text-gray-400 mb-12 flex items-center gap-2">Source: <span className="text-gray-900 uppercase tracking-widest text-[13px]">{selectedNode.source}</span></p>
              <div className="mb-12">
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] mb-5">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedNode.tags.map(tag => (
                    <span key={tag} className="px-4.5 py-2 bg-gray-50/80 text-gray-700 rounded-2xl text-[12px] font-bold border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all cursor-default">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mb-14 flex-1">
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] mb-5">AI Summary Notes</h3>
                <div className="relative"><div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/30 rounded-full"></div><p className="text-[16px] text-gray-700 leading-relaxed font-medium italic pl-8 py-2">"{selectedNode.summary}"</p></div>
              </div>
              <div className="space-y-4 pt-4 mt-auto">
                <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[28px] text-[15px] font-black transition-all shadow-xl shadow-indigo-200">Open Original</button>
                <button className="w-full py-5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-[28px] text-[15px] font-black transition-all border">Add to Collection</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resurfaced for You Section */}
      <section className="animate-fade-in-up stagger-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-[28px] font-black text-gray-900 tracking-tight">Resurfaced for You</h2>
            <div className="bg-indigo-100/50 text-indigo-600 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-indigo-100">
              <Sparkles className="w-3 h-3 fill-indigo-600" /> AI Selected
            </div>
          </div>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-5 py-2 rounded-2xl">View Archive</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeResurfaced.map((card, idx) => (
            <ResurfacedCard 
              key={idx}
              {...card}
            />
          ))}
        </div>
      </section>

      {/* Knowledge Clusters Section */}
      <section className="animate-fade-in-up stagger-5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-black text-gray-900 tracking-tight">Your Knowledge Clusters</h2>
          <MoreHorizontal className="w-6 h-6 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClusterCard icon={Network} label="Machine Learning" count={24} description="Neural nets, LLMs, and Python scripts." colorClass="bg-indigo-600" bgClass="bg-indigo-400" />
          <ClusterCard icon={Star} label="Design Systems" count={18} description="Atomic patterns and token architecture." colorClass="bg-purple-600" bgClass="bg-purple-400" />
        </div>
      </section>
    </div>
  );
};

export default KnowledgeGraph;
