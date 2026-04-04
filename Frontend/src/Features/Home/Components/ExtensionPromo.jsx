import React, { useState, useEffect } from 'react';

const ExtensionPromo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const promoShown = localStorage.getItem('extensionPromoShown');
    if (!promoShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstallClick = () => {
    // Chrome restricts programmatic "silent" installation of local extensions.
    // Opening a modal to guide the user on the local installation gracefully.
    setShowModal(true);
  };

  const closePromo = () => {
    setIsVisible(false);
    setShowModal(false);
    localStorage.setItem('extensionPromoShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Banner */}
      {!showModal && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-indigo-100 overflow-hidden shadow-indigo-100/50">
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <button
                onClick={closePromo}
                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-1.5 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Supercharge your workflow</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Install the <strong>Archivist AI</strong> browser extension to save links and files directly to your board.
              </p>
            </div>

            <button
              onClick={handleInstallClick}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors mt-2"
            >
              Add to Chrome
            </button>
          </div>
        </div>
      )}

      {/* Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Extension Installation
              </h3>
              <button onClick={closePromo} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Because this extension is privately built and completely secure for your local environment, Google Chrome requires a quick manual link. Just follow these 3 steps:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Open Extension Developer Mode</p>
                    <p className="text-xs text-gray-500 mt-0.5">Type <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-600 select-all">chrome://extensions</code> in a new tab, and toggle <strong>Developer mode</strong> ON in the top right.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Load the files</p>
                    <p className="text-xs text-gray-500 mt-0.5">Click the <strong>Load unpacked</strong> button on the top left of the extensions page.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Select the build folder</p>
                    <p className="text-xs text-gray-500 mt-0.5">Navigate to your project folder and select the <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-600 select-all">Project/Extension/dist</code> directory.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={closePromo}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Got it, I'll install it now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtensionPromo;
