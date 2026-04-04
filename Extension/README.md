# Archivist AI Browser Extension

Empower your research with the Archivist AI extension. Capture bookmarks, neural nodes, and research insights directly from your browser and sync them instantly to your neural knowledge graph.

## 🚀 Setup Instructions

Follow these steps to get the extension up and running in your browser:

### 1. Clone the Repository
First, download the source code locally using Git:

```bash
# Clone the main repository
git clone https://github.com/RitamHaldar/Archivist-AI.git

# Navigate to the extension directory
cd Archivist-AI/Extension
```

### 2. Load into Your Browser
Since a pre-compiled **`dist`** folder is provided, you can load it directly:

1. **Open the Extensions Page**: Paste `chrome://extensions/` into your browser's address bar (works for Chrome, Edge, Brave, and Opera).
2. **Enable Developer Mode**: Toggle the switch in the top-right corner to activate developer tools.
3. **Load Unpacked**: Click the **"Load unpacked"** button that appears.
4. **Select the Build Folder**: In the file picker, navigate to this project and select the **`Extension/dist`** folder.

### 3. Verification
- You should now see the **Archivist AI** icon in your browser's extension bar.
- Pin the extension for quick access.
- Ensure your backend server is running at the configured endpoint (default: `https://archivist-ai.onrender.com`) to allow successful authentication and syncing.

## 🧠 Core Features
- **Neural Ingest**: One-click "Send to Archivist" for any web page.
- **Auto-Summarization**: Automatically extracts key insights and semantic metadata.
- **Seamless Sync**: Direct integration with your cloud-hosted research dashboard.

---
> [!TIP]
> Periodically check the **"Archive History"** in the main dashboard to ensure sync-consistency between your browser sessions and the neural graph.
