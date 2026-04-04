import React, { useRef, useEffect, useState } from 'react';
import { Search, Plus, Bell, X, Zap, LinkIcon, FileText, PlayCircle, Image as ImageIcon, Globe, Upload, ChevronRight, Sparkles } from 'lucide-react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useSelector } from 'react-redux';

const Navbar = ({
  showAddOptions,
  setShowAddOptions,
  showDiscovery,
  setShowDiscovery,
  createPost,
  isLoading
}) => {
  const optionsRef = useRef(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const loaderIconRef = useRef(null);
  const loaderTextRef = useRef(null);

  const [activeModal, setActiveModal] = useState(null); // 'url' | 'pdf' | 'youtube' | 'image'
  const [urlInput, setUrlInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    if (showAddOptions && optionsRef.current) {
      const buttons = optionsRef.current.querySelectorAll('button');
      gsap.fromTo(optionsRef.current,
        { y: -20, opacity: 0, scaleY: 0.8 },
        { y: 0, opacity: 1, scaleY: 1, duration: 0.6, ease: 'expo.out' }
      );
      gsap.fromTo(buttons,
        { y: 15, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.1 }
      );
    }
  }, [showAddOptions]);

  useEffect(() => {
    if (activeModal && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(modalContentRef.current,
        { scale: 0.9, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
      );
    }
  }, [activeModal]);

  useEffect(() => {
    if (isLoading && modalContentRef.current) {
      gsap.fromTo(loaderIconRef.current,
        { rotate: 0, scale: 0.8, opacity: 0 },
        { rotate: 360, scale: 1, opacity: 1, duration: 2, repeat: -1, ease: "none" }
      );
      gsap.to(loaderTextRef.current, {
        opacity: 0.5,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: "power1.inOut"
      });
    }
  }, [isLoading]);

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files[0];
      if (file) {
        setSelectedFileName(file.name);
      }
    }
  };

  const closeModal = () => {
    if (isLoading) return; // Prevent closing while uploading

    gsap.to(modalContentRef.current, {
      scale: 0.9,
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveModal(null);
        setUrlInput('');
        setSelectedFileName('');
      }
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: activeModal,
      content: urlInput || null,
      file: fileInputRef?.current?.files[0] || null
    };

    if (createPost) {
      createPost(payload)
        .then(() => {
          gsap.to(modalContentRef.current, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            onComplete: closeModal
          });
        })
        .catch((err) => {
          console.error("Failed to create post:", err);
        });
    }
  };

  const renderLoadingState = () => {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div
            ref={loaderIconRef}
            className="relative w-24 h-24 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Processing Discovery...</h3>
          <p ref={loaderTextRef} className="text-gray-500 font-medium tracking-wide">Syncing asset to your neural network</p>
        </div>

        <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 w-1/2 rounded-full" style={{
            animation: 'loading-bar 1.5s infinite ease-in-out'
          }} />
        </div>

        <style>{`
            @keyframes loading-bar {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `}</style>
      </div>
    );
  };

  const renderModalForm = () => {
    if (isLoading) return renderLoadingState();

    const isUrlType = activeModal === 'url' || activeModal === 'youtube';
    const title = activeModal === 'url' ? 'Save URL' :
      activeModal === 'youtube' ? 'Save Youtube Link' :
        activeModal === 'pdf' ? 'Upload PDF' : 'Upload Image';
    const Icon = activeModal === 'url' ? Globe :
      activeModal === 'youtube' ? PlayCircle :
        activeModal === 'pdf' ? FileText : ImageIcon;
    const accentColor = activeModal === 'url' ? 'indigo' :
      activeModal === 'youtube' ? 'red' :
        activeModal === 'pdf' ? 'purple' : 'pink';

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className={`p-3 rounded-2xl bg-${accentColor}-100 text-${accentColor}-600`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">Enter the details to add to your library</p>
          </div>
        </div>

        {isUrlType ? (
          <div className="space-y-4">
            <div className="relative group">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="url"
                placeholder="https://example.com/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!urlInput}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            >
              Extract & Save
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-10 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
            >
              <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">{activeModal === 'pdf' ? 'PDF (max 50MB)' : 'JPG, PNG or GIF (max 10MB)'}</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelection}
                className="hidden"
                accept={activeModal === 'pdf' ? ".pdf" : "image/*"}
              />
            </div>
            {selectedFileName && (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-fade-in">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <ChevronRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-emerald-700 truncate">{selectedFileName}</span>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!selectedFileName}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:grayscale active:scale-[0.98]"
            >
              Process Asset
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <header className="glass-effect px-8 py-5 flex items-center justify-between animate-fade-in relative z-10">
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Ask your knowledge base..."
              className="block w-full pl-11 pr-20 py-2.5 bg-[#F5F5F7] border border-transparent rounded-2xl text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-200 transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100 px-2 py-1 rounded-lg">CMD + K</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setShowAddOptions(!showAddOptions)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${showAddOptions
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5'
                }`}
            >
              <Plus className={`w-4 h-4 transition-transform duration-500 ${showAddOptions ? 'rotate-45' : 'rotate-0'}`} />
              {showAddOptions ? 'Close' : 'Add New'}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowDiscovery(!showDiscovery)}
                className={`relative p-2 transition-all duration-300 rounded-full h-10 w-10 flex items-center justify-center ${showDiscovery ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <div className={`transition-transform duration-500 ${showDiscovery ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
                  {showDiscovery ? <X className="w-5 h-5" /> : <Bell className="w-[22px] h-[22px]" />}
                </div>
                {!showDiscovery && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>

              {showDiscovery && (
                <div className="absolute top-12 right-0 w-[350px] z-[100] animate-spring-in">
                  <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[32px] p-8 shadow-2xl shadow-indigo-100/40 space-y-8">
                    <div>
                      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                        Discovery <span className="bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-md text-[9px]">New</span>
                      </h2>

                      <div className="bg-indigo-50/30 border border-indigo-100/60 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="w-[14px] h-[14px] text-indigo-600 fill-indigo-600/20" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">AI Recommended</span>
                        </div>

                        <h3 className="font-extrabold text-[16px] mb-2 text-gray-900">Attention is All You Need</h3>
                        <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">You might like this paper based on your interest in "Transformer Models".</p>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 98% Match</span>
                          <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Add to Library</button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {['Design System', 'Typography', 'Machine Learning', 'Startups', 'Ethics', 'Psychology'].map(tag => (
                          <button key={tag} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all hover:-translate-y-0.5">
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer">
              {useSelector((state) => state.auth.user.username)}
            </button>
          </div>
        </header>

        {showAddOptions && (
          <div ref={optionsRef} className="absolute top-full left-0 right-0 glass-effect border-t-0 py-5 px-8 flex items-center justify-center gap-4 shadow-xl shadow-indigo-100/20 z-0 origin-top overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl">
              <button
                onClick={() => setActiveModal('url')}
                className="flex items-center gap-2.5 px-6 py-3 bg-white/80 border border-gray-200 hover:border-indigo-300 rounded-[22px] text-sm font-bold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <LinkIcon className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> Save URL
              </button>

              <button
                onClick={() => setActiveModal('pdf')}
                className="flex items-center gap-2.5 px-6 py-3 bg-white/80 border border-gray-200 hover:border-purple-300 rounded-[22px] text-sm font-bold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <FileText className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" /> Upload PDF
              </button>

              <button
                onClick={() => setActiveModal('youtube')}
                className="flex items-center gap-2.5 px-6 py-3 bg-white/80 border border-gray-200 hover:border-red-300 rounded-[22px] text-sm font-bold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <PlayCircle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" /> Save Youtube Link
              </button>

              <button
                onClick={() => setActiveModal('image')}
                className="flex items-center gap-2.5 px-6 py-3 bg-white/80 border border-gray-200 hover:border-pink-300 rounded-[22px] text-sm font-bold text-gray-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <ImageIcon className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" /> Upload Image
              </button>
            </div>
          </div>
        )}
      </div>

      {activeModal && createPortal(
        <div
          ref={modalRef}
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-xl animate-fade-in grid place-items-center"
          onClick={(e) => e.target === modalRef.current && closeModal()}
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[3rem] p-12 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/50 m-4"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {renderModalForm()}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navbar;
