import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { useHome } from '../Hooks/useHome';
import {
  FileText, Play, X, Zap,
  Plus, Minus, RotateCcw, Maximize, Minimize2,
  MoreHorizontal, Network, Star, Bookmark,
  Globe, Sparkles, ExternalLink, Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { gsap } from 'gsap';


const formatTimeAgo = (dateString) => {
  if (!dateString) return 'recently';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (seconds < 86400 * 7) return `${days}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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



const ResurfacedCard = ({ type, time, title, summary, context, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-[28px] p-6 border border-gray-100 card-hover group cursor-pointer relative overflow-hidden flex flex-col h-full shadow-sm"
  >
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
  const drawerHeaderRef = useRef(null);
  const drawerContentRef = useRef(null);
  const topRef = useRef(null);

  const { collections, posts, loading, error, fetchHomeData } = useHome();

  const [selectedNode, setSelectedNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Items');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const topics = useMemo(() => ['All', ...collections.map(c => c.name)], [collections]);

  const drawerRef = useRef(null);

  useEffect(() => {
    if (selectedNode && drawerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        // Slide in container
        tl.fromTo(drawerRef.current,
          { x: '110%', autoAlpha: 0 },
          { x: '0%', autoAlpha: 1, duration: 0.8, ease: 'expo.out' }
        );

        // Animate Header
        tl.fromTo(drawerHeaderRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power4.out' },
          "-=0.4"
        );

        // Staggered Content
        if (drawerContentRef.current) {
          tl.fromTo(Array.from(drawerContentRef.current.children),
            { opacity: 0, x: 40, filter: 'blur(10px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.1, ease: 'power3.out' },
            "-=0.3"
          );
        }
      });
      return () => ctx.revert();
    }
  }, [selectedNode]);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = isFullScreen ? window.innerHeight : 520;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const mainG = svg.append("g");

    const zoom = d3.zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        mainG.attr("transform", event.transform);
      });

    svg.call(zoom)
      .on("wheel.zoom", null)
      .on("dblclick.zoom", null);

    window.graphZoomIn = () => svg.transition().duration(500).call(zoom.scaleBy, 1.3);
    window.graphZoomOut = () => svg.transition().duration(500).call(zoom.scaleBy, 0.7);

    const defs = svg.append("defs");

    const filter = defs.append("filter")
      .attr("id", "soft-glow")
      .attr("height", "300%")
      .attr("width", "300%")
      .attr("x", "-100%")
      .attr("y", "-100%");

    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", "10")
      .attr("result", "blur");

    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", "0")
      .attr("dy", "5")
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const getTypeConfig = (type) => {
      switch (type) {
        case 'url': return { color: '#4F46E5', glow: 'rgba(79, 70, 229, 0.4)', icon: Globe };
        case 'pdf': return { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)', icon: FileText };
        case 'image': return { color: '#EC4899', glow: 'rgba(236, 72, 153, 0.4)', icon: ImageIcon };
        case 'youtube': return { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)', icon: Play };
        default: return { color: '#6366F1', glow: 'rgba(99, 102, 241, 0.4)', icon: FileText };
      }
    };

    const graphData = (() => {
      const filteredPosts = selectedTopic === 'All'
        ? posts
        : posts.filter(p => p.folder === selectedTopic);

      const nodes = filteredPosts.map(p => {
        let source = 'Unknown';
        try {
          source = new URL(p.url).hostname.replace('www.', '');
        } catch (e) {
          source = p.type === 'image' || p.type === 'pdf' ? 'Upload' : 'External';
        }

        return {
          id: p._id,
          label: p.title,
          type: p.type,
          source: source,
          tags: p.tags || [],
          summary: p.summary,
          url: p.url,
          folder: p.folder || 'Unsorted'
        };
      });

      const links = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].folder === nodes[j].folder && nodes[i].folder !== 'Unsorted') {
            links.push({ source: nodes[i].id, target: nodes[j].id });
          }
        }
      }
      return { nodes, links };
    })();

    window.__currentNodes = graphData.nodes;

    const data = {
      nodes: graphData.nodes.map(d => ({ ...d })),
      links: graphData.links.map(d => ({ ...d }))
    };

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(160))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50));

    const linkPaths = mainG.append("g")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke", "rgba(79, 70, 229, 0.06)")
      .attr("stroke-width", 1.5)
      .style("pointer-events", "none");

    const nodeGroup = mainG.append("g")
      .selectAll("g")
      .data(data.nodes)
      .enter().append("g")
      .attr("class", "cursor-pointer group select-none")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        setSelectedNode(d);
        event.stopPropagation();
      });

    nodeGroup.append("rect")
      .attr("rx", 30)
      .attr("ry", 30)
      .attr("height", 64)
      .attr("width", d => Math.max(200, d.label.length * 8 + 100))
      .attr("x", d => -(Math.max(200, d.label.length * 8 + 100) / 2))
      .attr("y", -32)
      .attr("fill", d => getTypeConfig(d.type).glow)
      .attr("class", "blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300");

    nodeGroup.append("rect")
      .attr("rx", 26)
      .attr("ry", 26)
      .attr("height", 52)
      .attr("width", d => Math.max(200, d.label.length * 8 + 100))
      .attr("x", d => -(Math.max(200, d.label.length * 8 + 100) / 2))
      .attr("y", -26)
      .attr("fill", "#ffffff")
      .attr("stroke", "#f0f0f5")
      .attr("stroke-width", 1.5)
      .style("filter", "drop-shadow(0 8px 16px rgba(0,0,0,0.06))")
      .attr("class", "transition-all duration-300 group-hover:stroke-indigo-400 group-hover:-translate-y-1");

    nodeGroup.append("circle")
      .attr("r", 15)
      .attr("cx", d => -(Math.max(200, d.label.length * 8 + 100) / 2) + 42)
      .attr("cy", 0)
      .attr("fill", d => getTypeConfig(d.type).color)
      .attr("class", "shadow-sm");

    nodeGroup.append("circle")
      .attr("r", 4)
      .attr("cx", d => -(Math.max(200, d.label.length * 8 + 100) / 2) + 42)
      .attr("cy", 0)
      .attr("fill", "#ffffff");

    nodeGroup.append("text")
      .text(d => d.label)
      .attr("x", d => -(Math.max(200, d.label.length * 8 + 100) / 2) + 72)
      .attr("y", -2)
      .style("font-size", "14px")
      .style("font-weight", "800")
      .style("fill", "#111827")
      .style("pointer-events", "none");

    nodeGroup.append("text")
      .text(d => d.source.toUpperCase())
      .attr("x", d => -(Math.max(200, d.label.length * 8 + 100) / 2) + 72)
      .attr("y", 16)
      .style("font-size", "10px")
      .style("font-weight", "900")
      .style("fill", "#9CA3AF")
      .style("letter-spacing", "0.08em")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      linkPaths
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    svg.on("click", () => setSelectedNode(null));

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
      delete window.graphZoomIn;
      delete window.graphZoomOut;
    };
  }, [selectedTopic, posts, isFullScreen]);

  const toggleFullScreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const graphNodesCount = useMemo(() => {
    const filtered = selectedTopic === 'All'
      ? posts
      : posts.filter(p => p.folder === selectedTopic);
    return filtered.length;
  }, [posts, selectedTopic]);

  const activeResurfaced = useMemo(() => {
    const filtered = selectedTopic === 'All'
      ? posts
      : posts.filter(p => p.folder === selectedTopic);

    return filtered.slice(0, 3).map(p => ({
      id: p._id,
      type: p.type.toUpperCase(),
      time: formatTimeAgo(p.createdAt),
      title: p.title,
      summary: p.summary,
      context: `Relevant to your ${p.folder} collection.`
    }));
  }, [posts, selectedTopic]);

  return (
    <div ref={topRef} className="space-y-16 animate-fade-in pb-20">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="animate-fade-in-up stagger-1">
            <h1 className="text-[48px] font-black tracking-tighter text-gray-900 mb-2 leading-none">Knowledge Graph</h1>
            <p className="text-[18px] text-gray-500 font-medium tracking-tight">Visualize the neural pathways of your synthesized thoughts.</p>
          </div>
        </div>

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

      <div className={`relative bg-[#FAFAFB] border border-gray-100/50 shadow-2xl shadow-indigo-100/40 overflow-hidden transition-all duration-500 animate-fade-in-up stagger-3 ${isFullScreen ? 'rounded-none w-screen h-screen' : 'rounded-[48px] min-h-[520px]'}`} ref={wrapperRef}>
        
        <div className={`absolute top-10 left-10 flex items-center gap-8 z-10 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-[24px] border border-white shadow-xl shadow-indigo-100/20 transition-all ${isFullScreen ? 'scale-125' : ''}`}>
          {[
            { color: 'bg-indigo-600', label: 'URLS' },
            { color: 'bg-purple-600', label: 'PDFS' },
            { color: 'bg-pink-600', label: 'IMAGES' },
            { color: 'bg-emerald-600', label: 'YOUTUBE' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm ring-2 ring-white`}></span>
              <span className="text-[11px] font-black text-gray-400 tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className={`absolute bottom-10 left-10 flex flex-col gap-3 z-10 transition-all ${isFullScreen ? 'scale-125' : ''}`}>
          <button onClick={() => window.graphZoomIn?.()} className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><Plus className="w-5 h-5 group-hover:scale-110" /></button>
          <button onClick={() => window.graphZoomOut?.()} className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group"><Minus className="w-5 h-5 group-hover:scale-110" /></button>
          <button onClick={toggleFullScreen} className="w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 group">
            {isFullScreen ? <Minimize2 className="w-5 h-5 group-hover:scale-110" /> : <Maximize className="w-5 h-5 group-hover:scale-110" />}
          </button>
        </div>

        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4F46E5 1.5px, transparent 0)', backgroundSize: '28px 28px' }}></div>

        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-600 font-black tracking-widest text-xs uppercase animate-pulse">Syncing Neural Pathways...</p>
          </div>
        )}

        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ height: isFullScreen ? '100%' : '520px' }}></svg>
      </div>

      <section className="animate-fade-in-up stagger-4">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-4">
            <h2 className="text-[32px] font-black text-gray-900 tracking-tight">Resurfaced for You</h2>
            <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-indigo-100 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-indigo-600" /> AI Selection
            </div>
          </div>
          <button className="text-[12px] font-black text-indigo-600 hover:text-indigo-800 transition-colors bg-white px-6 py-2.5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md">View All History</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeResurfaced.map((card, idx) => (
            <ResurfacedCard
              key={idx}
              {...card}
              onClick={() => {
                const node = window.__currentNodes?.find(n => n.id === card.id);
                if (node) {
                  setSelectedNode(node);
                  topRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>
      </section>

      <section className="animate-fade-in-up stagger-5">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-[32px] font-black text-gray-900 tracking-tight">Your Knowledge Clusters</h2>
          <div className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <MoreHorizontal className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.slice(0, 4).map((c, idx) => (
            <ClusterCard
              key={c._id}
              icon={idx % 2 === 0 ? Network : Star}
              label={c.name}
              count={c.itemCount || 0}
              description={`Automated cluster for ${c.name} related insights across your neuro-network.`}
              colorClass={idx % 2 === 0 ? "bg-indigo-600" : "bg-purple-600"}
              bgClass={idx % 2 === 0 ? "bg-indigo-400" : "bg-purple-400"}
            />
          ))}
        </div>
      </section>

      {selectedNode && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[90] animate-fade-in"
            onClick={() => {
              gsap.to(drawerRef.current, { x: '110%', autoAlpha: 0, duration: 0.5, ease: 'power2.in', onComplete: () => setSelectedNode(null) });
            }}
          />

          <div className="fixed top-6 right-6 h-[40%] w-[420px] z-[100] pointer-events-none overflow-hidden">
            <div 
              ref={drawerRef}
              className="w-full h-full bg-white shadow-[-40px_0_100px_-20px_rgba(0,0,0,0.15)] rounded-[40px] border border-gray-100 overflow-hidden flex flex-col pointer-events-auto relative"
            >
              <div ref={drawerHeaderRef} className="h-52 bg-gray-900 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full p-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="px-3 py-1 bg-white/5 backdrop-blur-md text-white/90 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">
                        {selectedNode.type} synthesis
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        gsap.to(drawerRef.current, { x: '110%', autoAlpha: 0, duration: 0.5, ease: 'power2.in', onComplete: () => setSelectedNode(null) });
                      }} 
                      className="w-10 h-10 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-full transition-all flex items-center justify-center group/close backdrop-blur-lg border border-white/10 shadow-lg"
                    >
                      <X className="w-4 h-4 group-hover/close:rotate-90 transition-transform duration-500" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-white/40">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">{selectedNode.source}</span>
                      </div>
                    </div>
                    <h2 className="text-[24px] font-black text-white leading-[1.2] tracking-tighter line-clamp-2">{selectedNode.label}</h2>
                  </div>
                </div>
              </div>

              <div ref={drawerContentRef} className="flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-hide">
                
                <div className="relative group/insights">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Semantic Context</span>
                  </div>
                  <div className="relative bg-[#FAFAFC] p-6 rounded-[28px] border border-gray-100">
                    <p className="text-[15px] text-gray-800 leading-[1.6] font-bold italic">
                      "{selectedNode.summary || "Archivist-AI processing narrative synthesis..."}"
                    </p>
                    <div className="absolute -left-px top-6 bottom-6 w-1 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Network className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural Entities</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tags.length > 0 ? selectedNode.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-black text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-sm">
                        #{tag.toUpperCase()}
                      </span>
                    )) : <span className="text-[12px] text-gray-400 font-bold italic">No entities associated.</span>}
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 gap-3 pb-10">
                  <a
                    href={selectedNode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-[20px] text-[14px] font-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2 active:scale-[0.98] group/btn"
                  >
                    Open Resource
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                  <button className="w-full py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-[20px] text-[14px] font-black transition-all border border-gray-100 flex items-center justify-center gap-2 active:scale-[0.98]">
                    Sync Collection
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgeGraph;
