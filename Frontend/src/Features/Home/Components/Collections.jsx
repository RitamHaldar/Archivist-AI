import React, { useState, useMemo, useRef } from 'react';
import {
  ChevronRight, X,
  Globe, FileText, PlayCircle, Bookmark, Sparkles,
  Search, Image as ImageIcon,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCollection } from '../home.slice';
import { useHome } from '../Hooks/useHome';

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

const CollectionCard = ({ collection, onClick }) => {
  const style = getCollectionStyle(collection.name);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[32px] p-8 border border-gray-100 flex flex-col h-[280px] w-full overflow-hidden subtle-ring card-hover group cursor-pointer relative"
    >
      <div className={`absolute top-0 right-0 w-48 h-48 ${style.bg} rounded-full blur-3xl opacity-20 -mr-24 -mt-24 group-hover:opacity-40 transition-opacity`}></div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shadow-sm border border-white`}>
          <Bookmark className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
          <div className={`w-1.5 h-1.5 rounded-full ${style.accent}`}></div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{collection.count} Items</span>
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-[22px] font-black text-gray-900 leading-tight mb-3 tracking-tighter group-hover:text-indigo-600 transition-colors">
          {collection.name}
        </h3>

        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>{collection.stats.pdf || 0} PDFs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{collection.stats.url || 0} Links</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{collection.stats.image || 0} Images</span>
          </div>
        </div>
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
  if (!collection) return null;

  const style = getCollectionStyle(collection.name);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[30] animate-fade-in"
        onClick={onClose}
      />

      <div className="w-[480px] bg-white border border-gray-100 h-[80%] flex flex-col fixed right-6 top-6 shadow-[-32px_0_64px_-32px_rgba(0,0,0,0.1)] animate-slide-in-right z-40 overflow-y-auto custom-scrollbar rounded-[40px] border-l border-white shadow-2xl">
        <div className="p-8 sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Collection Deep-Dive
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-10 flex-1 flex flex-col">
          <div className="flex items-center gap-6 mb-10">
            <div className={`w-16 h-16 rounded-[2rem] ${style.bg} ${style.color} flex items-center justify-center shadow-lg shadow-indigo-100/50 border border-white`}>
              <Bookmark className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tighter">{collection.name}</h1>
              <p className="text-[12px] font-bold text-gray-400 tracking-tight uppercase flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${style.accent} animate-pulse`}></div>
                Connected Neural Nodes • {collection.count} Items
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] opacity-50 mb-6">Synchronized Assets</h3>
            <div className="grid grid-cols-1 gap-3">
              {posts.map((post) => {
                const previewUrl = getPostPreview(post);
                return (
                  <a
                    key={post._id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[2rem] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all border border-transparent hover:border-indigo-100 group/item relative overflow-hidden active:scale-[0.98]"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-50 overflow-hidden relative z-10">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                            onError={(e) => { e.target.style.display = 'none'; }}
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
                      <h4 className="text-[14px] font-black text-gray-800 line-clamp-1 tracking-tight group-hover/item:text-indigo-600 transition-colors">{post.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.type}</span>
                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        <span className="text-[10px] font-bold text-gray-400 truncate">{new URL(post.url).hostname}</span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-50 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all transform translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
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

  if (loading && !posts.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="animate-fade-in-up -mx-8 -my-8 pb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up stagger-3">
          {filteredCollections.map((col) => (
            <CollectionCard
              key={col.name}
              collection={col}
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
