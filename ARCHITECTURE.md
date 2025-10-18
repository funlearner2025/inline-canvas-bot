# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Telegram App                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Mini App (Frontend)                     │  │
│  │                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │   Index      │  │  DailyAstro  │  │ FutureMonth  │    │  │
│  │  │   Page       │  │    Page      │  │    Page      │    │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │  │
│  │         │                  │                  │            │  │
│  │         └──────────────────┴──────────────────┘            │  │
│  │                            │                                │  │
│  │                   ┌────────▼────────┐                      │  │
│  │                   │   API Client    │                      │  │
│  │                   │   (lib/api.ts)  │                      │  │
│  │                   └────────┬────────┘                      │  │
│  └────────────────────────────┼──────────────────────────────┘  │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
                                 │ HTTPS Requests
                                 │
                    ┌────────────▼────────────┐
                    │   Flask Backend API     │
                    │   (Vercel Hosted)       │
                    │                         │
                    │  ┌──────────────────┐   │
                    │  │ /dailyastro      │   │
                    │  │ /futuremonth     │   │
                    │  │ /futureday       │   │
                    │  │ /autocomplete    │   │
                    │  └──────────────────┘   │
                    └────────────┬────────────┘
                                 │
                                 │ API Calls
                                 │
                    ┌────────────▼────────────┐
                    │  Google Maps API        │
                    │  (Places Autocomplete)  │
                    └─────────────────────────┘
```

## Component Hierarchy

```
App (with TelegramThemeProvider)
│
├── BrowserRouter
│   ├── Index Page
│   │   ├── CosmicBackground
│   │   └── Navigation Cards (3)
│   │
│   ├── DailyAstro Page
│   │   ├── CosmicBackground
│   │   ├── Header (with back button)
│   │   ├── Action Card
│   │   ├── LoadingSpinner (conditional)
│   │   └── Results Card (conditional)
│   │
│   ├── FutureMonth Page
│   │   ├── CosmicBackground
│   │   ├── Header (with back button)
│   │   ├── LocationAutocomplete
│   │   ├── Month/Year Selectors
│   │   ├── Submit Button
│   │   └── Results Card (conditional)
│   │
│   └── FutureDay Page
│       ├── CosmicBackground
│       ├── Header (with back button)
│       ├── LocationAutocomplete
│       ├── Day/Month/Year Selectors
│       ├── Submit Button
│       └── Results Card (conditional)
```

## Data Flow

```
User Action
    │
    ├─→ UI Event (button click, input change)
    │
    ├─→ Framer Motion Animation (instant feedback)
    │
    ├─→ React State Update (loading = true)
    │
    ├─→ API Call (via lib/api.ts)
    │
    ├─→ Flask Backend
    │       │
    │       ├─→ Process Request
    │       │
    │       ├─→ Call Google Maps API (if autocomplete)
    │       │
    │       └─→ Return Response
    │
    ├─→ Update State (data, loading = false)
    │
    ├─→ Animate Results (Framer Motion)
    │
    └─→ Display to User
```

## Animation Architecture

```
GPU Layer (Hardware Accelerated)
│
├── Transform animations
│   ├── translateX / translateY
│   ├── scale
│   └── rotate
│
├── Opacity animations
│
└── Framer Motion Orchestration
    ├── Initial state
    ├── Animate state
    ├── Exit state (AnimatePresence)
    └── Transition config
```

## Theme System

```
Telegram App Theme
    │
    ├─→ TelegramThemeProvider
    │       │
    │       ├─→ Detect theme params
    │       │
    │       ├─→ Set CSS variables
    │       │       ├── --tg-bg-color
    │       │       ├── --tg-text-color
    │       │       └── --tg-button-color
    │       │
    │       └─→ Toggle dark class
    │
    └─→ Tailwind CSS
            │
            ├─→ Light mode colors
            │
            └─→ Dark mode colors (.dark class)
```

## File Organization

```
src/
│
├── components/
│   ├── ui/                      # shadcn-ui components (35+)
│   ├── CosmicBackground.tsx     # Animated background
│   ├── CosmicCard.tsx           # Interactive cards
│   ├── LocationAutocomplete.tsx # Location search
│   ├── LoadingSpinner.tsx       # Loading indicator
│   └── TelegramThemeProvider.tsx # Theme sync
│
├── pages/
│   ├── Index.tsx                # Home/Landing page
│   ├── DailyAstro.tsx           # Daily predictions
│   ├── FutureMonth.tsx          # Monthly insights
│   ├── FutureDay.tsx            # Daily insights
│   ├── DailyPanchangam.tsx      # Traditional view
│   └── NotFound.tsx             # 404 page
│
├── lib/
│   ├── api.ts                   # Backend API client
│   │   ├── postDailyAstro()
│   │   ├── postFutureMonth()
│   │   ├── postFutureDay()
│   │   └── searchLocation()
│   │
│   ├── telegram.ts              # Telegram utilities
│   │   ├── initTelegram()
│   │   ├── getTelegramTheme()
│   │   ├── isDarkMode()
│   │   └── showLoading()
│   │
│   └── utils.ts                 # Shared utilities
│
├── hooks/
│   ├── use-mobile.tsx           # Mobile detection
│   ├── use-toast.ts             # Toast notifications
│   └── useTelegram.ts           # Telegram hook
│
├── App.tsx                      # Main app component
├── main.tsx                     # Entry point
├── index.css                    # Global styles
└── telegram.d.ts                # TypeScript definitions
```

## API Request/Response Flow

```
Frontend Request
    │
    ├─→ Prepare payload
    │   {
    │     lat: number,
    │     lon: number,
    │     location?: string,
    │     day?: number,
    │     month?: number,
    │     year?: number
    │   }
    │
    ├─→ Add headers
    │   Content-Type: application/json
    │
    ├─→ Send to backend
    │   POST ${VITE_FLASK_API_URL}/endpoint
    │
    ├─→ Backend processes
    │   │
    │   ├─→ Validate input
    │   ├─→ Calculate predictions
    │   └─→ Format response
    │
    └─→ Response received
        {
          message: string,
          ...additional data
        }
```

## Mobile Optimization Strategy

```
Layout
    ├─→ Safe Area Insets
    │   ├── iOS: Top notch, bottom bar
    │   └── Android: Gesture navigation
    │
    ├─→ Responsive Design
    │   ├── Mobile: Single column
    │   ├── Tablet: 2 columns
    │   └── Desktop: 3 columns
    │
    └─→ Touch Optimization
        ├── Min tap target: 44x44px
        ├── Debounced inputs
        └── Haptic feedback ready

Animations
    ├─→ GPU Acceleration
    │   ├── transform: translateZ(0)
    │   ├── will-change hints
    │   └── Composite layers
    │
    ├─→ Frame Rate Adaptive
    │   ├── 60fps (standard)
    │   └── 120fps (ProMotion/high refresh)
    │
    └─→ Performance Monitoring
        ├── Avoid layout thrashing
        ├── Minimize repaints
        └── Use CSS containment

Network
    ├─→ Request Optimization
    │   ├── Debounce: 300ms
    │   ├── Request cancellation
    │   └── Error retry logic
    │
    └─→ Loading States
        ├── Skeleton screens
        ├── Loading spinners
        └── Progress indicators
```

## Security Architecture

```
Frontend
    ├─→ No API keys exposed
    ├─→ Environment variables
    ├─→ HTTPS only
    └─→ Input validation

Backend
    ├─→ CORS configuration
    ├─→ Rate limiting
    ├─→ Input sanitization
    └─→ API key management

Telegram
    ├─→ User authentication
    ├─→ Data validation
    └─→ Secure communication
```

## Deployment Pipeline

```
Development
    ├─→ Local dev server (Vite)
    ├─→ Hot module replacement
    └─→ TypeScript checking

Build
    ├─→ npm run build
    ├─→ Vite optimization
    │   ├── Tree shaking
    │   ├── Code splitting
    │   ├── Minification
    │   └── Asset optimization
    └─→ dist/ output

Vercel
    ├─→ Auto deployment
    ├─→ Environment variables
    ├─→ Edge network CDN
    └─→ HTTPS certificates

Telegram
    ├─→ Mini App URL configuration
    ├─→ Bot integration
    └─→ User access
```

---

This architecture ensures:
- ✅ Fast performance on mobile
- ✅ Cross-platform compatibility
- ✅ Smooth 60fps/120fps animations
- ✅ Secure data handling
- ✅ Scalable structure
- ✅ Easy maintenance
