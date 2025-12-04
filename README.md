<div align="center">

# 🌿 EcoGuard Naga

**AI-Powered Civic Innovation for Environmental Monitoring**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white)](https://ai.google.dev)

*Empowering citizens of Naga City to report environmental hazards with AI-assisted detection*

[View Demo](https://ai.studio/apps/drive/1JucHNVA6aJ3kWvwGjzCdSJuu9lHdbo2L) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 About The Project

**EcoGuard Naga** is a citizen-centric web application that leverages AI to streamline environmental hazard reporting in Naga City. Citizens can snap a photo of any environmental issue—from illegal dumping to flooding—and our AI automatically classifies the hazard, assesses severity, and routes the report to the Local Government Unit (LGU) for rapid response.

### 🎯 Problem Statement
Urban environmental monitoring traditionally relies on manual reporting systems that are slow, inconsistent, and lack proper classification. This leads to delayed responses and inefficient resource allocation.

### 💡 Our Solution
- **AI-Powered Detection**: Gemini 2.5 Flash analyzes images to identify 15+ hazard types
- **Auto-Geolocation**: GPS pinpoints exact hazard location
- **Instant Classification**: Severity levels (Low/Medium/High) are automatically assessed
- **Civic Engagement**: Gamified experience with tracking and leaderboards

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript |
| **Build Tool** | Vite 6.2 |
| **AI/ML** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Maps** | Leaflet 1.9.4 |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS (inline) |

---

## 📁 Project Structure

```
ecoguard/
├── components/
│   ├── ui/
│   │   └── Button.tsx          # Reusable button component
│   ├── CitizenApp.tsx          # 🔥 Main app (reporting flow, AI analysis)
│   ├── DemoPreview.tsx         # Demo section for landing page
│   ├── Features.tsx            # Features showcase section
│   ├── FooterCTA.tsx           # Call-to-action footer
│   ├── Hero.tsx                # Hero section with main CTA
│   ├── HowItWorks.tsx          # How it works explanation
│   ├── Impact.tsx              # Impact statistics section
│   └── Navbar.tsx              # Navigation bar
├── App.tsx                     # Root component (view routing)
├── index.tsx                   # App entry point
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies & scripts
└── metadata.json               # App metadata & permissions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20.x)
- **npm** or **pnpm**
- **Gemini API Key** from [Google AI Studio](https://ai.google.dev/)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ecoguard

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local   # If .env.example exists
# OR create manually:
echo "API_KEY=your_gemini_api_key_here" > .env.local

# 4. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: Gemini API Key
API_KEY=your_gemini_api_key_here

# Alternative naming (check vite.config.ts for prefix):
# VITE_GEMINI_API_KEY=your_key_here
```

> ⚠️ **Important**: The API key is accessed via `process.env.API_KEY` in `CitizenApp.tsx`. Make sure your Vite config exposes this variable correctly.

---

## 👥 Team Development Guide

### For All Developers

#### Branch Strategy
```bash
main          # Production-ready code
├── dev       # Integration branch
├── feat/*    # Feature branches (e.g., feat/dashboard-stats)
└── fix/*     # Bug fix branches
```

#### Workflow
1. Pull latest from `dev`: `git pull origin dev`
2. Create feature branch: `git checkout -b feat/your-feature`
3. Make changes and commit with descriptive messages
4. Push and create Pull Request to `dev`

### Task Division Suggestions

| Developer | Focus Area | Key Files |
|-----------|------------|-----------|
| **Dev 1** | AI & Image Analysis | `CitizenApp.tsx` (analyzeImage function) |
| **Dev 2** | UI/UX & Landing Page | `Hero.tsx`, `Features.tsx`, `Navbar.tsx` |
| **Dev 3** | Maps & Geolocation | `CitizenApp.tsx` (MiniMap, location logic) |
| **Dev 4** | Backend Integration & State | `App.tsx`, API integration, data persistence |

---

## 🧩 Key Components

### `CitizenApp.tsx` - Core Application Logic

This is the **main component** containing:

- **Report Flow States**: `home` → `camera` → `details` → `success`
- **AI Analysis**: Uses Gemini 2.5 Flash for image classification
- **Geolocation**: Auto-detects user location on report submission
- **MiniMap**: Leaflet-based location preview

#### Hazard Types Detected
```typescript
// Waste Categories
'litter' | 'illegal_dumping' | 'bin_overflow'

// Water Categories  
'flood' | 'stagnant_water' | 'water_pollution'

// Nature Categories
'vegetation_overgrowth' | 'fallen_tree' | 'soil_erosion'

// Infrastructure Categories
'pothole' | 'broken_streetlight' | 'vandalism' | 'damaged_signage'

// Other
'fire_hazard' | 'air_pollution' | 'other'
```

#### AI Integration Example
```typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data }}, { text: prompt }] },
  config: { responseMimeType: 'application/json', responseSchema: schema }
});
```

### `App.tsx` - View Router

Simple view toggling between landing page and citizen app:

```typescript
const [view, setView] = useState<'landing' | 'app'>('landing');
```

---

## 🎨 Design System

### Colors
```css
--primary: #059669 (Emerald 600)
--secondary: Teal gradient
--background: #F8FAF9 (Light gray-green)
```

### Key UI Patterns
- **Glass-morphism**: `backdrop-blur-xl bg-white/80`
- **Soft shadows**: `shadow-card`, `shadow-emerald-900/10`
- **Rounded corners**: `rounded-3xl`, `rounded-2xl`
- **Animations**: `animate-float`, `animate-pulse`, `animate-ping`

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## 🔒 Permissions Required

The app requests these browser permissions (defined in `metadata.json`):

- **Camera**: For capturing hazard photos
- **Geolocation**: For pinpointing report location
- **Microphone**: Reserved for future voice notes

---

## 🐛 Common Issues & Fixes

### 1. API Key Not Working
```bash
# Make sure .env.local exists and has the correct format
API_KEY=AIza...your_key

# Restart the dev server after adding env vars
npm run dev
```

### 2. Map Not Loading
```bash
# Leaflet CSS might be missing - it's loaded via CDN in index.html
# Check that you have internet connectivity
```

### 3. Geolocation Denied
- User must allow location access in browser
- HTTPS required in production for geolocation

---

## 🗺️ Roadmap

- [x] AI-powered hazard detection
- [x] Auto-geolocation
- [x] Report submission flow
- [ ] Backend API integration
- [ ] User authentication
- [ ] Report history & tracking
- [ ] Admin dashboard for LGU
- [ ] Push notifications
- [ ] Offline support (PWA)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project was created for hackathon purposes.

---

## 🙏 Acknowledgments

- **Naga City LGU** - Partner organization
- **Google AI Studio** - Gemini API
- **Hackathon Organizers**

---

<div align="center">

**Built with 💚 for a cleaner Naga City**

*EcoGuard Naga Team - Hackathon 2024*

</div>
