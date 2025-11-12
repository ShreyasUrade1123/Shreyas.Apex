<div align="center">

# 🚀 Shreyas.Apex - Modern Personal Portfolio

[![Website](https://img.shields.io/badge/Visit-Shreyas.Apex-34D399?style=for-the-badge&logo=vercel&logoColor=white)](https://shreyas-apex.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**A modern, performant, and feature-rich personal portfolio of Shreyas Prashant Urade showcasing real-time integrations, interactive components, and a powerful MDX blog system.**

[Live Demo]() • [Report Bug](https://github.com/ShreyasUrade1123/Shreyas.Apex/issues) • [Request Feature](https://github.com/ShreyasUrade1123/Shreyas.Apex/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)
- [Configuration](#-configuration)
- [Development](#-development)
- [Performance](#-performance)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Shreyas.Apex** is a cutting-edge personal portfolio of **Shreyas Prashant Urade**, built with Next.js 15 and React 19, featuring real-time integrations with Spotify and GitHub, an MDX-powered blog, and interactive components with smooth animations. Designed with performance, accessibility, and user experience in mind.

### ✨ Highlights

- **Real-time Spotify Integration** - Display currently playing music with album art and playback progress
- **GitHub Contribution Graph** - Live 365-day heatmap with streak tracking
- **MDX Blog System** - Full-featured blog with syntax highlighting, math equations, and Mermaid diagrams
- **Interactive Components** - Smooth animations powered by Framer Motion
- **Performance Optimized** - Aggressive code splitting, caching, and lazy loading
- **Fully Type-Safe** - Built with TypeScript in strict mode
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility First** - Reduced motion support and semantic HTML

---

## 🎨 Features

### 🎵 Real-Time Integrations

- **Spotify "Now Playing"**
  - Live display of currently playing song
  - Album artwork and playback progress
  - Smooth animations and particle effects
  - 5-minute cache for optimal performance

- **GitHub Contribution Graph**
  - 365-day activity heatmap
  - Current streak and longest streak tracking
  - Total contributions count
  - 24-hour cache with graceful fallbacks

### 📝 Blog System

- **MDX-Powered Posts** with full Markdown support
- **Syntax Highlighting** with multiple themes (Shiki)
- **Math Equations** rendering with KaTeX
- **Mermaid Diagrams** for flowcharts and visualizations
- **Auto-linking Headings** for easy navigation
- **GitHub Flavored Markdown** support
- **Pagination** for better performance
- **Skeleton Loading States** for improved UX

### 🎭 Interactive Components

- **Smooth Page Transitions** with Framer Motion
- **Particle Effects** on hover interactions
- **Custom Loading Screen** with animations
- **Back to Top Button** with smooth scrolling
- **Interactive Location Map** powered by Mapbox GL
- **Embedded Tweets** support
- **Canvas Confetti** for celebrations

### ⚡ Performance Features

- **Aggressive Code Splitting**
  - Separate chunks for React, Framer Motion, icons
  - Vendor code optimization
  - Dynamic imports for heavy components

- **Advanced Caching**
  - Client-side localStorage cache
  - Server-side in-memory cache
  - Configurable TTL per resource

- **Image Optimization**
  - Modern formats (AVIF, WebP)
  - Responsive breakpoints
  - Lazy loading with blur placeholders

- **Accessibility**
  - Reduced motion detection
  - Page visibility API for performance
  - Semantic HTML structure
  - ARIA labels and roles

---

## 🛠️ Tech Stack

### Core

- **[Next.js 15.2.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://react.dev/)** - UI library
- **[TypeScript 5.8.2](https://www.typescriptlang.org/)** - Type safety
- **[Node.js](https://nodejs.org/)** - JavaScript runtime

### Styling & UI

- **[Tailwind CSS 3.3.5](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.6.5](https://www.framer.com/motion/)** - Animation library
- **[Headless UI 2.2.2](https://headlessui.com/)** - Unstyled accessible components
- **[Radix UI](https://www.radix-ui.com/)** - Primitive components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Additional icons

### Content & Blog

- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** - MDX support
- **[Shiki](https://shiki.matsu.io/)** - Syntax highlighting
- **[rehype](https://github.com/rehypejs/rehype)** - HTML processing
- **[remark](https://github.com/remarkjs/remark)** - Markdown processing
- **[KaTeX](https://katex.org/)** - Math rendering
- **[Mermaid](https://mermaid.js.org/)** - Diagram rendering

### Third-Party Integrations

- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - Music integration
- **[GitHub API](https://docs.github.com/en/rest)** - Contribution data
- **[Mapbox GL](https://www.mapbox.com/)** - Interactive maps
- **[PostHog](https://posthog.com/)** - Analytics

### Developer Tools

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size analysis
- **[Vercel Analytics](https://vercel.com/analytics)** - Web vitals monitoring
- **[Zod](https://zod.dev/)** - Schema validation

---

## 📁 Project Structure

```
Shreyas.Apex/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── spotify/              # Spotify API endpoints
│   │   │   │   ├── currently-playing/
│   │   │   │   └── token/
│   │   │   └── weather/              # Weather API endpoint
│   │   ├── blog/                     # Blog section
│   │   │   ├── [slug]/               # Dynamic blog post routes
│   │   │   │   ├── BlogPostClient.tsx
│   │   │   │   ├── mdx.tsx           # MDX components
│   │   │   │   └── page.tsx
│   │   │   ├── BlogClient.tsx
│   │   │   ├── metadata.ts
│   │   │   └── page.tsx
│   │   ├── credits/                  # Credits page
│   │   │   ├── CreditsClient.tsx
│   │   │   └── page.tsx
│   │   ├── og/                       # Open Graph image generation
│   │   │   └── blog/
│   │   ├── projects/                 # Projects showcase
│   │   │   ├── ProjectsClient.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # 404 page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── About.tsx                 # About section
│   │   ├── BackButton.tsx            # Navigation component
│   │   ├── BlogPostSkeleton.tsx      # Loading skeleton
│   │   ├── BlogStyles.tsx            # Blog-specific styles
│   │   ├── Education.tsx             # Education section
│   │   ├── ErrorBoundary.tsx         # Error handling
│   │   ├── Experience.tsx            # Experience timeline
│   │   ├── GitCommitHistory.tsx      # GitHub contribution graph
│   │   ├── GitHubComments.tsx        # Comment system
│   │   ├── HobbySection.tsx          # Hobbies display
│   │   ├── LocationSection.tsx       # Mapbox integration
│   │   ├── NavBar.tsx                # Navigation bar
│   │   ├── NowPlaying.tsx            # Spotify integration
│   │   ├── Pagination.tsx            # Blog pagination
│   │   ├── ProjectCards.tsx          # Project card component
│   │   ├── Projects.tsx              # Projects section
│   │   ├── SkillsSection.tsx         # Skills showcase
│   │   ├── Socials.tsx               # Social links
│   │   └── utils/                    # Utility components
│   │       ├── BackToTop.tsx
│   │       ├── blog.ts
│   │       ├── ClientOnly.tsx
│   │       ├── formatDate.ts
│   │       ├── LoadingScreen.tsx
│   │       ├── mdx.ts
│   │       ├── MermaidInitializer.tsx
│   │       ├── TransitionLink.tsx
│   │       └── TransitionWrapper.tsx
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useClientRandom.ts        # Client-side random generation
│   │   ├── usePageVisibility.ts      # Page visibility detection
│   │   ├── useReducedMotion.ts       # Motion preference detection
│   │   └── useWeather.ts             # Weather data hook
│   │
│   ├── services/                     # External API services
│   │   └── github.ts                 # GitHub API integration
│   │
│   ├── styles/                       # Global styles
│   │   ├── globals.css
│   │   └── transition.css
│   │
│   └── utils/                        # Utility functions
│       ├── cache.ts                  # Caching system (24hr TTL)
│       └── spotify.ts                # Spotify API utilities
│
├── public/                           # Static assets
│   ├── favicon.ico
│   ├── grain.png                     # Texture overlay
│   ├── music.mp3                     # Background music
│   └── og/                           # Open Graph images
│
├── Configuration Files
├── .env.example                      # Environment variables template
├── next.config.js                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── biome.jsonc                       # Biome linter config
├── vercel.json                       # Vercel deployment config
├── postcss.config.js                 # PostCSS configuration
├── package.json                      # Dependencies & scripts
├── get-spotify-token.js              # Spotify token helper script
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** or **bun** package manager
- **Spotify Developer Account** (for music integration)
- **GitHub Account** (for contribution graph)
- **Mapbox Account** (optional, for maps)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ShreyasUrade1123/Shreyas.Apex.git
cd Shreyas.Apex
```

2. **Install dependencies**

```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see [Configuration](#-configuration) section).

4. **Run the development server**

```bash
npm run dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## 📸 Screenshots

> **Note:** Add your own screenshots below by replacing the placeholder paths.

### Homepage
![Homepage Screenshot](./public/screenshots/homepage.png)
*Interactive homepage with smooth animations and real-time integrations*

### Blog
![Blog Screenshot](./public/screenshots/blog.png)
*MDX-powered blog with syntax highlighting and math rendering*

### Projects
![Projects Screenshot](./public/screenshots/projects.png)
*Project showcase with filtering and interactive cards*

### Spotify Integration
![Spotify Screenshot](./public/screenshots/spotify.png)
*Real-time display of currently playing music*

### GitHub Contributions
![GitHub Screenshot](./public/screenshots/github.png)
*365-day contribution heatmap with streak tracking*

### Mobile View
![Mobile Screenshot](./public/screenshots/mobile.png)
*Fully responsive design optimized for mobile devices*

---

## ⚙️ Configuration

### Spotify Integration Setup

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click "Create app"
   - Fill in:
     - **App name:** "My Portfolio - NowPlaying"
     - **App description:** "Shows currently playing music"
     - **Redirect URI:** `http://localhost:3000/api/callback`
     - Check "Web API"
   - Click "Save"

2. **Get your credentials**
   - Go to your app's Settings
   - Copy **Client ID** and **Client Secret**

3. **Obtain a refresh token**

Run the included helper script:

```bash
node get-spotify-token.js
```

Follow the interactive prompts to authorize your app and get a refresh token.

4. **Add to `.env.local`**

```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

### GitHub Integration

Update the username in `src/components/GitCommitHistory.tsx` and `src/services/github.ts`:

```typescript
const GITHUB_USERNAME = 'YourGitHubUsername';
```

### Mapbox Integration (Optional)

Get a Mapbox access token from [Mapbox](https://www.mapbox.com/) and add to `.env.local`:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Update `src/components/LocationSection.tsx` to use the environment variable.

### Environment Variables Reference

```bash
# Required for Spotify integration
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Optional integrations
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run preview          # Build and preview production

# Code Quality
npm run check            # Run Biome linter
npm run check:write      # Auto-fix linting issues
npm run check:unsafe     # Auto-fix with unsafe changes
npm run typecheck        # TypeScript type checking

# Analysis
ANALYZE=true npm run build  # Analyze bundle size
```

### Code Quality Tools

- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)
- **TypeScript** - Strict mode enabled
- **Git Hooks** - Pre-commit checks (if configured)

### Project Guidelines

- **Components:** Use functional components with TypeScript
- **Styling:** Tailwind utility classes preferred over custom CSS
- **State Management:** React hooks and context
- **API Routes:** Placed in `src/app/api/`
- **Animations:** Use Framer Motion for complex animations
- **Imports:** Use path alias `~/` for src directory

### Adding a Blog Post

1. Create a new MDX file in your content directory
2. Add frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-01-12"
description: "Post description for SEO"
---

Your content here...
```

3. The post will automatically appear in your blog

---

## ⚡ Performance

### Optimization Strategies

#### Code Splitting
- **React & React DOM** - Separate vendor chunk
- **Framer Motion** - Isolated chunk for animation library
- **Icons** - Combined chunk for icon libraries
- **Vendor Code** - All node_modules in separate chunk
- **Common Code** - Shared code across pages

#### Caching System
- **Client-side:** localStorage with configurable TTL
- **Server-side:** In-memory cache for API responses
- **Spotify API:** 5-minute cache
- **GitHub API:** 24-hour cache

#### Image Optimization
- **Formats:** AVIF and WebP with fallbacks
- **Responsive:** Multiple breakpoints for all screen sizes
- **Lazy Loading:** Intersection Observer API
- **Cache:** 60-second minimum TTL

#### Bundle Size Management
```bash
# Analyze your bundle
ANALYZE=true npm run build
```

Opens a visual representation of your bundle size.

### Performance Metrics

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Core Web Vitals:** All green

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - Add all variables from `.env.local` in Vercel dashboard
   - Settings → Environment Variables

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Upload .next folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style (Biome will auto-format)
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ Liability and warranty disclaimer

---

## 📧 Contact

**Shreyas Prashant Urade** - High school student, part-time coder, full-time chaos creator

- **Website:** [Shreyas.Apex](https://shreyas-apex.vercel.app)
- **GitHub:** [@ShreyasUrade1123](https://github.com/ShreyasUrade1123)
- **Email:** shreyasurade4940@gmail.com

---

## 🌟 Acknowledgments

- **Design Inspiration:** Various modern portfolio designs
- **Icons:** [Lucide](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Fonts:** [Geist Sans & Geist Mono](https://vercel.com/font)
- **Hosting:** [Vercel](https://vercel.com/)
- **APIs:** [Spotify](https://developer.spotify.com/), [GitHub](https://docs.github.com/en/rest)

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/ShreyasUrade1123/Shreyas.Apex?style=social)
![GitHub Forks](https://img.shields.io/github/forks/ShreyasUrade1123/Shreyas.Apex?style=social)
![GitHub Watchers](https://img.shields.io/github/watchers/ShreyasUrade1123/Shreyas.Apex?style=social)

---

<div align="center">

Made with ❤️ by [Shreyas Prashant Urade](https://shreyas-apex.vercel.app)

If you found this project helpful, please consider giving it a ⭐!

</div>
