import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ChevronRight, X,
  Globe, FileText, PlayCircle, Bookmark, Sparkles,
  Search, Image as ImageIcon,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCollection } from '../home.slice';
import { useHome } from '../Hooks/useHome';
import { gsap } from 'gsap';

const COLLECTION_STYLES = [
  { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', accent: 'bg-indigo-500' },
  { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', accent: 'bg-purple-500' },
  { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', accent: 'bg-emerald-500' },
  { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', accent: 'bg-rose-500' },
  { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', accent: 'bg-amber-500' },
];

const getCollectionStyle = (name) => {
  const index = name.length % COLLECTION_STYLES.length;
  return COLLECTION_STYLES[index];
};

const CollectionCard = ({ collection, onClick, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const style = getCollectionStyle(collection.name);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -12,
      scale: 1.02,
      rotateX: -4,
      rotateY: 2,
      duration: 0.4,
      ease: 'power2.out',
      boxShadow: '0 30px 60px -12px rgba(99, 102, 241, 0.25)',
      backgroundColor: '#fdfdfd'
    });
    gsap.to(glowRef.current, {
      opacity: 0.8,
      scale: 1.5,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.75)',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      backgroundColor: '#ffffff'
    });
    gsap.to(glowRef.current, {
      opacity: 0.2,
      scale: 1,
      duration: 0.5,
      ease: 'power2.in'
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="bg-white rounded-[40px] p-10 border border-gray-100 flex flex-col h-[300px] w-full overflow-hidden subtle-ring group cursor-pointer relative transition-colors duration-500 hover:border-indigo-200"
    >
      <div
        ref={glowRef}
        className={`absolute top-0 right-0 w-64 h-64 ${style.bg} rounded-full blur-[80px] opacity-20 -mr-32 -mt-32 transition-opacity pointer-events-none`}
      ></div>

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className={`w-16 h-16 rounded-3xl ${style.bg} ${style.color} flex items-center justify-center shadow-xl shadow-indigo-500/5 group-hover:shadow-${style.color}/20 transition-all duration-500 border border-white`}>
          <Bookmark className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="px-4 py-1.5 bg-gray-50/80 backdrop-blur-sm rounded-full border border-gray-100 flex items-center gap-2 group-hover:bg-white transition-colors">
            <div className={`w-2 h-2 rounded-full ${style.accent} animate-pulse`}></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{collection.count} Nodes</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <span className={`text-[10px] font-black ${style.color} uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-500`}>
          Synchronized Cluster
        </span>
        <h3 className="text-[26px] font-black text-gray-900 leading-[1.1] mb-5 tracking-tighter group-hover:text-indigo-600 transition-colors duration-300">
          {collection.name}
        </h3>

        <div className="flex items-center gap-5 text-[11px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors">
          <div className="flex items-center gap-1.5 bg-gray-50/50 px-2.5 py-1 rounded-lg group-hover:bg-white transition-colors">
            <FileText className="w-4 h-4 text-purple-600/60" />
            <span>{collection.stats.pdf || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50/50 px-2.5 py-1 rounded-lg group-hover:bg-white transition-colors">
            <Globe className="w-4 h-4 text-indigo-600/60" />
            <span>{collection.stats.url || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50/50 px-2.5 py-1 rounded-lg group-hover:bg-white transition-colors">
            <ImageIcon className="w-4 h-4 text-pink-600/60" />
            <span>{collection.stats.image || 0}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border border-white">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};


const getPostPreview = (post) => {
  if (post.type === 'image') return post.url;
  if (post.type === 'youtube') {
    try {
      const urlObj = new URL(post.url);
      const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch (e) {
      return null;
    }
  }
  if (post.type === 'url') {
    try {
      const urlObj = new URL(post.url);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const CollectionAnalysisPanel = ({ collection, posts, onClose }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  if (!collection) return null;

  const style = getCollectionStyle(collection.name);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[30] animate-fade-in"
        onClick={onClose}
      />

      <div className="w-[480px] bg-white border border-gray-100 h-[80%] flex flex-col fixed right-6 top-6 shadow-[-32px_0_64px_-32px_rgba(0,0,0,0.1)] animate-slide-in-right z-40 overflow-hidden custom-scrollbar rounded-[40px] border-l border-white shadow-2xl">
        <div className="p-8 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            {selectedPost ? 'Neural Detail Analysis' : 'Collection Deep-Dive'}
          </h2>
          <div className="flex items-center gap-2">
            {selectedPost && (
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5"
              >
                <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 rotate-180" />
                </div>
                Back to Assets
              </button>
            )}
            <button onClick={() => { onClose(); setSelectedPost(null); }} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {selectedPost ? (
            <div className="p-10 animate-fade-in">
              <div className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-500/5 bg-gray-50 aspect-video group">
                {getPostPreview(selectedPost) ? (
                  <img
                    src={getPostPreview(selectedPost)}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Sparkles className="w-20 h-20" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <div className={`px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white shadow-sm flex items-center gap-2`}>
                    {selectedPost.type === 'pdf' ? <FileText className="w-3 h-3 text-purple-600" /> :
                      selectedPost.type === 'image' ? <ImageIcon className="w-3 h-3 text-pink-500" /> :
                        selectedPost.type === 'youtube' ? <PlayCircle className="w-3 h-3 text-red-500" /> :
                          <Globe className="w-3 h-3 text-indigo-500" />}
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{selectedPost.type}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tighter mb-4">{selectedPost.title}</h1>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                  <Globe className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-500">{new URL(selectedPost.url).hostname}</span>
                </div>
                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-400">Synchronized Node</span>
              </div>

              <div className="bg-indigo-50/50 rounded-[2.5rem] p-8 border border-indigo-100/50 relative overflow-hidden group/card mb-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/40 rounded-full blur-3xl -mr-12 -mt-12 opacity-50"></div>
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-black text-indigo-700 uppercase tracking-widest">AI Intelligence Summary</span>
                </div>
                <p className="text-[15px] font-medium text-gray-700 leading-relaxed relative z-10 indent-4 italic">
                  {selectedPost.summary || "No description available for this neural node."}
                </p>
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Semantic Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white border border-gray-100 text-[10px] font-bold text-gray-600 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-[14px] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 hover:shadow-indigo-200 group active:scale-95"
              >
                Access Source Node <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ) : (
            <div className="p-10 pt-0 animate-fade-in">
              <div className="flex items-center gap-6 mb-10 sticky top-0 bg-white py-10 z-10 border-b border-gray-50 -mx-10 px-10">
                <div className={`w-16 h-16 rounded-[2rem] ${style.bg} ${style.color} flex items-center justify-center shadow-lg shadow-indigo-100/50 border border-white`}>
                  <Bookmark className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tighter">{collection.name}</h1>
                  <div className="text-[12px] font-bold text-gray-400 tracking-tight uppercase flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${style.accent} animate-pulse`}></div>
                    Connected Neural Nodes • {collection.count} Items
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] opacity-50 mb-6">Synchronized Assets</h3>
                <div className="grid grid-cols-1 gap-3">
                  {posts.map((post) => {
                    const previewUrl = getPostPreview(post);
                    return (
                      <div
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center gap-4 p-4 rounded-[2rem] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all border border-transparent hover:border-indigo-100 group/item relative overflow-hidden cursor-pointer active:scale-[0.98]"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-50 overflow-hidden relative z-10">
                            {previewUrl ? (
                              <img
                                src={previewUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="text-gray-400 group-hover/item:text-indigo-600 transition-colors">
                                {post.type === 'pdf' ? <FileText className="w-6 h-6" /> :
                                  post.type === 'image' ? <ImageIcon className="w-6 h-6" /> :
                                    post.type === 'youtube' ? <PlayCircle className="w-6 h-6" /> :
                                      <Globe className="w-6 h-6" />}
                              </div>
                            )}
                          </div>

                          <div className="absolute -bottom-1 -right-1 z-20 w-6 h-6 bg-white rounded-lg shadow-md border border-gray-50 flex items-center justify-center">
                            {post.type === 'pdf' ? <FileText className="w-3 h-3 text-purple-600" /> :
                              post.type === 'image' ? <ImageIcon className="w-3 h-3 text-pink-500" /> :
                                post.type === 'youtube' ? <PlayCircle className="w-3 h-3 text-red-500" /> :
                                  <Globe className="w-3 h-3 text-indigo-500" />}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-[14px] font-black text-gray-800 line-clamp-1 tracking-tight group-hover/item:text-indigo-600 transition-colors uppercase">{post.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.type}</span>
                            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                            <span className="text-[10px] font-bold text-gray-400 truncate">{new URL(post.url).hostname}</span>
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-50 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all transform translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};


const Collections = () => {
  const { posts, loading } = useHome();
  const dispatch = useDispatch();
  const selectedCollection = useSelector((state) => state.home.selectedCollection);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const topRef = useRef(null);

  const availableCollections = useMemo(() => {
    if (!posts) return [];

    const collectionMap = new Map();
    posts.forEach(post => {
      const folderName = post.folder || 'Unsorted';
      if (!collectionMap.has(folderName)) {
        collectionMap.set(folderName, { name: folderName, count: 0, stats: { pdf: 0, image: 0, video: 0, url: 0 } });
      }
      const col = collectionMap.get(folderName);
      col.count++;

      if (post.type === 'pdf') col.stats.pdf++;
      else if (post.type === 'image') col.stats.image++;
      else if (post.type === 'youtube') {
        col.stats.video++;
        col.stats.url++;
      }
      else col.stats.url++;
    });

    return Array.from(collectionMap.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  const filteredCollections = useMemo(() => {
    let results = availableCollections;

    if (selectedType !== 'All') {
      const typeKey = selectedType.toLowerCase() === 'videos' ? 'video' :
        selectedType.toLowerCase() === 'pdfs' ? 'pdf' :
          selectedType.toLowerCase() === 'images' ? 'image' : 'url';
      results = results.filter(c => c.stats[typeKey] > 0);
    }

    if (searchQuery) {
      results = results.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return results;
  }, [availableCollections, selectedType, searchQuery]);

  const collectionPosts = useMemo(() => {
    if (!selectedCollection || !posts) return [];
    let items = posts.filter(p => (p.folder || 'Unsorted') === selectedCollection.name);

    if (selectedType !== 'All') {
      const typeMap = { 'Articles': 'article', 'PDFs': 'pdf', 'Videos': 'youtube', 'Images': 'image' };
      const targetType = typeMap[selectedType];
      items = items.filter(p => {
        if (targetType === 'article') return p.type !== 'pdf' && p.type !== 'image' && p.type !== 'youtube';
        return p.type === targetType;
      });
    }

    return items;
  }, [selectedCollection, posts, selectedType]);

  const handleSelectCollection = (col) => {
    dispatch(setSelectedCollection(col));
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && filteredCollections.length > 0) {
      gsap.fromTo(gridRef.current.children,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
          rotateX: 10
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          clearProps: 'transform'
        }
      );
    }
  }, [filteredCollections]);

  if (loading && !posts.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="-mx-8 -my-8 pb-20">
      <div className="p-10 max-w-[1200px] mx-auto min-h-screen">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="animate-fade-in-up stagger-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Curated Intelligence</span>
            </div>
            <h1 className="text-[48px] font-black tracking-tighter text-gray-900 leading-none mb-3">Neural Collections</h1>
            <p className="text-[18px] text-gray-500 font-medium tracking-tight">Structured pathways through your synchronized research clusters.</p>
          </div>

          <div className="flex items-center gap-3 animate-fade-in-up stagger-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            {['All', 'Articles', 'PDFs', 'Videos', 'Images'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2.5 rounded-xl text-[12px] font-black transition-all ${selectedType === type
                  ? 'bg-white text-indigo-600 shadow-sm border border-gray-100'
                  : 'text-gray-400 hover:text-gray-600'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-12 animate-fade-in-up stagger-2 max-w-[600px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-bold text-[14px] shadow-sm"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((col, index) => (
            <CollectionCard
              key={col.name}
              collection={col}
              index={index}
              onClick={() => handleSelectCollection(col)}
            />
          ))}

          {filteredCollections.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center opacity-50">
              <Bookmark className="w-16 h-16 text-gray-300 mb-6" />
              <h3 className="text-xl font-black text-gray-900">No Collections Found</h3>
              <p className="font-bold text-gray-400">Expand your research to synthesize new clusters.</p>
            </div>
          )}
        </div>
      </div>

      <CollectionAnalysisPanel
        collection={selectedCollection}
        posts={collectionPosts}
        onClose={() => dispatch(setSelectedCollection(null))}
      />
    </div>
  );
};

export default Collections;
