# Archivist AI 🧠

**Archivist AI** is a state-of-the-art neural research and knowledge management ecosystem. It transforms a chaotic collection of bookmarks, PDFs, and media into a unified, semantically-linked "Second Brain," powered by vector-based intelligence and interactive discovery.

---

## 🚀 Core Features

### 1. Neural Knowledge Graph & Discovery
- **Autonomous Synthesis**: Archvisit AI doesn't just store data; it understands it. New entries are automatically cross-referenced with your existing knowledge base via vector embeddings.
- **Dynamic Discovery**: A dedicated "Discovery" pane that proactively surfaces related research and suggested knowledge clusters every time you add new content.
- **Intelligent Notifications**: A state-aware notification bell that alerts you to new AI-identified discovery nodes without disrupting your flow.

### 2. Multi-Modal Research Ingest
- **Extensible Scraper**: Deep extraction of content from URLs, YouTube transcripts, and articles.
- **Neural OCR**: High-accuracy text extraction from images using neural OCR processing.
- **Smart PDF Intake**: Intelligent PDF parsing with automatic character-limiting (15,000 chars) for optimal AI processing feasibility.
- **Cloud-Synced Taxonomy**: A unified tagging system that maps assets to high-level research clusters.

### 3. Intelligent Search & Analysis
- **Semantic Search**: Beyond keywords—search for concepts. "How do LLMs handle memory?" will find relevant assets even if those exact words aren't present.
- **Cluster Analysis**: An immersive "Tag Analysis" drawer providing deep insights into tag overlaps, item counts, and neural clusters.
- **Institutional Detail Panel**: Rich slide-out panels for every asset including AI-generated summaries, source links, and dedicated "Intelligence Nodes."

### 4. Continuous Integration Extension
- **Universal Capture**: A browser extension that enables true "one-click" research ingestion from any page.
- **Pre-Built Distribution**: Ready-to-load `dist` folder for the extension for frictionless setup.

---

## 🛠️ Technical Stack

### **Frontend (Neural Dashboard)**
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for highly-available global state.
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock) for high-performance physics-based UI transitions.
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for the core design system and [Tailwind CSS](https://tailwindcss.com/) for rapid utility layouts.
- **Icons**: [Lucide React](https://lucide.dev/) for a minimalist, modern icon set.
- **Visual Feedback**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and react-dom portals.

### **Backend (Intelligence Engine)**
- **Runtime**: [Node.js](https://nodejs.org/en) (LTS)
- **Framework**: [Express.js](https://expressjs.com/)
- **Primary Database**: [MongoDB](https://www.mongodb.com/) with Mongoose for structured metadata.
- **Vector Database**: [Pinecone](https://www.pinecone.io/) for high-speed semantic similarity searches.
- **Services**: Custom `reader` and `scraper` services for robust content extraction.
- **OCR Engine**: [OCR.space](https://ocr.space/) API integration for multi-modal text discovery.

### **Extension (Neural Ingest)**
- **Architecture**: Manifest V3
- **Tech**: React + Vite + Tailwind CSS

---

## 📂 Project Structure

```text
├── Frontend/           # React dashboard & Neural UI
│   ├── src/Features/   # Modularized feature folders (Home, Auth, etc.)
│   └── public/         # Static assets and neural node icons
├── Backend/            # Express server and Neural logic
│   ├── src/models/     # Mongoose Schemas (User, Post, Collection)
│   ├── src/services/   # Extraction, OCR, and Scraper engines
│   └── src/controllers/# AI Semantic logic and Post management
└── Extension/          # Browser extension source and dist
```

---

## 🛠️ Quick Start

### 1. Requirements
- Node.js (v18+)
- MongoDB Instance
- Pinecone API Key (for semantic logic)
- OCR.space API Key (for image processing)

### 2. Setup
1. Clone the repo: `git clone https://github.com/RitamHaldar/Archivist-AI.git`
2. Install dependencies: Run `npm install` in both `Frontend/` and `Backend/` directories.
3. Configure environment: Add `.env` files to both folders (see `.env.example` where provided).
4. Run Dev Environment: `npm run dev` in both directories.

