# AI Context Guide for Telegram Mini App

> **For AI Assistants**: This document provides a complete technical blueprint of this Telegram Mini App project. Use this as your primary reference when analyzing, modifying, or extending the codebase.

---

## 🔄 Logic Flow Diagram

```
User Input (Telegram WebView)
    ↓
React Component (pages/*.tsx)
    ↓
Form State Management (useState hooks)
    ↓
Validation & User Feedback
    ↓
API Call (lib/api.ts)
    ↓
Flask Backend (VITE_FLASK_API_URL)
    ↓
External Services (Google Maps API, Astrology Engine)
    ↓
JSON/Text Response
    ↓
React State Update (setState)
    ↓
UI Re-render (Framer Motion animations)
    ↓
Telegram Theme Sync (TelegramThemeProvider)
    ↓
User Sees Result
```

---

## 📊 File Responsibility Table

| File / Folder | Purpose | Safe for AI Edit | Notes |
|---------------|---------|------------------|-------|
| **Core Application** |
| `src/App.tsx` | Root layout, routing, SDK initialization | ✅ | Add routes or global wrappers only |
| `src/main.tsx` | React entry point | ⚠️ | Rarely edited - only for global providers |
| `src/index.css` | Global styles, CSS variables, theme colors | ✅ | Primary location for theme changes |
| `index.html` | HTML template, viewport meta tags | ⚠️ | Only edit for meta tags or title |
| **Pages (Main Edit Zone)** |
| `src/pages/Index.tsx` | Home navigation page | ✅ | Safe to modify layout and cards |
| `src/pages/DailyAstro.tsx` | Daily astrology page | ✅ | Safe to modify UI and form logic |
| `src/pages/FutureMonth.tsx` | Future month predictions | ✅ | Safe to modify UI and form logic |
| `src/pages/FutureDay.tsx` | Future day predictions (most complex) | ✅ | Safe to modify - dual-mode interface |
| `src/pages/NotFound.tsx` | 404 error page | ✅ | Safe to customize |
| **Custom Components (Reusable)** |
| `src/components/CosmicBackground.tsx` | Animated starfield | ⚠️ | Modify with caution - performance critical |
| `src/components/CosmicCard.tsx` | Hero card component | ✅ | Safe to modify styling and props |
| `src/components/CustomSelect.tsx` | **Critical mobile dropdown fix** | ⚠️ | **Only modify for bug fixes - battle-tested** |
| `src/components/LocationAutocomplete.tsx` | Location search with autocomplete | ✅ | Safe to modify UI and behavior |
| `src/components/TelegramInput.tsx` | Telegram-styled input | ✅ | Safe to modify styling |
| `src/components/TelegramThemeProvider.tsx` | Theme synchronization | ❌ | **Do not modify - core functionality** |
| `src/components/LoadingSpinner.tsx` | Loading indicator | ✅ | Safe to modify |
| **shadcn-ui Primitives** |
| `src/components/ui/*` | Radix UI + Tailwind primitives (49 files) | ⚠️ | **Avoid direct modification - regenerate if needed** |
| **Library & Utilities** |
| `src/lib/api.ts` | Backend API calls and endpoints | ⚠️ | **Only update endpoints, payloads, or error handling** |
| `src/lib/telegram.ts` | Telegram SDK integration | ❌ | **Do not modify - platform critical** |
| `src/lib/utils.ts` | Helper functions (cn, etc.) | ✅ | Safe to add utilities |
| **Hooks** |
| `src/hooks/useTelegram.ts` | Telegram SDK utilities | ❌ | **Do not modify** |
| `src/hooks/use-mobile.tsx` | Mobile detection | ✅ | Safe to modify breakpoints |
| `src/hooks/use-toast.ts` | Toast notifications | ✅ | Safe to modify |
| **Configuration (Rarely Modified)** |
| `vite.config.ts` | Vite build configuration | ❌ | **Do not modify without explicit instruction** |
| `tailwind.config.ts` | Tailwind CSS configuration | ⚠️ | **Only add theme extensions - don't remove existing** |
| `tsconfig.json` | TypeScript configuration | ❌ | **Do not modify** |
| `tsconfig.app.json` | TypeScript app configuration | ❌ | **Do not modify** |
| `package.json` | Dependencies and scripts | ⚠️ | **Only add dependencies when requested** |
| `components.json` | shadcn-ui configuration | ❌ | **Do not modify** |
| **Type Definitions** |
| `src/telegram.d.ts` | Telegram SDK TypeScript declarations | ❌ | **Do not modify** |
| **Environment** |
| `.env` | Environment variables (not in repo) | ✅ | Safe to add new variables |
| `.env.example` | Environment variable template | ✅ | Update when adding new variables |

### Legend
- ✅ **Safe for AI Edit**: Can be modified with standard precautions
- ⚠️ **Edit with Caution**: Only modify when necessary, test thoroughly
- ❌ **Do Not Touch**: Critical infrastructure, modify only with explicit instruction

---

## 🎯 AI Editing Protocols

### Decision Map: User Intent → Files to Modify

| User Request Type | Primary Files to Edit | Secondary Files | Testing Focus |
|-------------------|----------------------|-----------------|---------------|
| "Add a new page" | `src/pages/NewPage.tsx`, `src/App.tsx` (routing) | `src/pages/Index.tsx` (add nav card) | iOS/Android navigation |
| "Change theme colors" | `src/index.css` (CSS variables) | `tailwind.config.ts` (if new colors) | Light/dark mode sync |
| "Fix dropdown issue" | `src/components/CustomSelect.tsx` | N/A | iOS Telegram WebView |
| "Add API endpoint" | `src/lib/api.ts` (new function) | Page component (integrate call) | Network error handling |
| "Modify form validation" | Page component (`FutureDay.tsx`, etc.) | N/A | Empty state handling |
| "Update animations" | Page/component with motion.div | N/A | 60fps on iPhone 12 |
| "Change layout" | Specific page component | N/A | Mobile portrait orientation |
| "Add debug logging" | Page component (add debug panel) | `.env.example` (add variable) | Telegram Mini App view |
| "Fix mobile layout" | Specific page component | `src/index.css` (safe-area) | iPhone X+ notch, Android nav bar |
| "Add location feature" | Use `LocationAutocomplete.tsx` component | N/A | Autocomplete UX |

### Safe Modification Policies

#### ✅ **ALWAYS Safe to Do**
- Add new page components following the established pattern
- Modify page-level layouts and styling within `src/pages/*`
- Update form state and validation logic
- Add new API endpoint functions in `src/lib/api.ts`
- Extend Tailwind theme in `tailwind.config.ts` (additive only)
- Add CSS custom properties in `src/index.css`
- Create new reusable components in `src/components/`
- Add environment variables to `.env.example`

#### ⚠️ **Proceed with Caution**
- Modifying `CustomSelect.tsx` (mobile compatibility critical)
- Changing animation duration/easing (performance impact)
- Updating `src/lib/api.ts` endpoint URLs (backend dependency)
- Modifying `CosmicBackground.tsx` (GPU performance sensitive)
- Editing `tailwind.config.ts` (don't remove existing values)
- Adding npm packages (check bundle size impact)

#### ❌ **NEVER Do Without Explicit Instruction**
- Modify `src/lib/telegram.ts` (platform integration)
- Edit `src/components/TelegramThemeProvider.tsx` (theme sync)
- Change `vite.config.ts` (build configuration)
- Modify files in `src/components/ui/*` (shadcn-ui managed)
- Edit TypeScript config files (`tsconfig*.json`)
- Change `src/hooks/useTelegram.ts` (SDK wrapper)
- Replace `CustomSelect` with native `<select>` (known bug)
- Disable safe-area insets (notch support)

### Testing Recommendations

#### Platform Testing Priority
1. **iOS Telegram** (highest priority - most quirks)
   - Test on iPhone 12+ with notch
   - Verify `CustomSelect` dropdown behavior
   - Check safe-area insets (top/bottom)
   - Test theme switching (light/dark)

2. **Android Telegram** (medium priority)
   - Test on Pixel/Samsung devices
   - Verify bottom navigation bar spacing
   - Check input focus behavior

3. **Telegram Desktop** (lowest priority)
   - Quick visual check
   - Verify mouse hover states

#### Checklist After Each Edit
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors in editor
- [ ] Test on mobile device (real device preferred)
- [ ] Verify dark/light mode both work
- [ ] Check safe-area insets on notch devices
- [ ] Confirm animations run at 60fps
- [ ] Test form validation (empty states, invalid inputs)
- [ ] Verify API calls with backend (or mock)

---

## 🏗️ Component Hierarchy

```
App.tsx (Root)
├── TelegramThemeProvider (Theme Sync)
│   └── Router
│       ├── Index.tsx (Home Page)
│       │   ├── CosmicBackground
│       │   └── CosmicCard (×3 navigation cards)
│       │       └── motion.div (Framer Motion wrapper)
│       ├── DailyAstro.tsx
│       │   ├── CosmicBackground
│       │   ├── TelegramInput (location search)
│       │   └── LocationAutocomplete (optional)
│       ├── FutureMonth.tsx
│       │   ├── CosmicBackground
│       │   ├── LocationAutocomplete
│       │   ├── CustomSelect (Month)
│       │   ├── CustomSelect (Year)
│       │   └── Debug Panel (conditional)
│       ├── FutureDay.tsx (Most Complex)
│       │   ├── CosmicBackground
│       │   ├── Menu View
│       │   │   └── Option Cards (×2)
│       │   ├── Single Day View
│       │   │   ├── LocationAutocomplete
│       │   │   ├── CustomSelect (Month)
│       │   │   ├── CustomSelect (Day)
│       │   │   └── CustomSelect (Year)
│       │   ├── Date Range View
│       │   │   ├── LocationAutocomplete
│       │   │   ├── From: CustomSelect (×3)
│       │   │   └── To: CustomSelect (×3)
│       │   └── Debug Panel (conditional)
│       └── NotFound.tsx
│           └── CosmicBackground
└── Common Components (used across pages)
    ├── LoadingSpinner (API call in progress)
    ├── CustomSelect (all dropdowns)
    ├── LocationAutocomplete (location searches)
    └── TelegramInput (text inputs)
```

### Component Interaction Flow

```
User Interaction
    ↓
CustomSelect (controlled component)
    ↓
onChange callback
    ↓
Parent setState (e.g., setMonth)
    ↓
State Update Triggers Re-render
    ↓
Validation Check (before submit)
    ↓
API Call (if valid)
    ↓
Loading Spinner Shows
    ↓
Response Received
    ↓
State Update (prediction text)
    ↓
Results Card Animates In (Framer Motion)
```

---

## 🚫 Do-Not-Touch Rules

### Files AI Should NEVER Modify (Without Explicit User Instruction)

1. **`src/lib/telegram.ts`**
   - **Why**: Core Telegram SDK initialization, viewport management, theme detection
   - **Risk**: Breaking this breaks the entire Telegram integration
   - **If User Requests Changes**: Ask for clarification and explain risks

2. **`src/components/TelegramThemeProvider.tsx`**
   - **Why**: Manages automatic theme synchronization with Telegram app
   - **Risk**: App won't sync with Telegram's light/dark mode
   - **If User Requests Changes**: Suggest testing in both themes first

3. **`src/hooks/useTelegram.ts`**
   - **Why**: Telegram SDK utilities wrapper
   - **Risk**: Loss of SDK functionality

4. **`vite.config.ts`**
   - **Why**: Build configuration optimized for Telegram WebView
   - **Risk**: Build failures, performance degradation
   - **If User Requests Changes**: Only add plugins/aliases, never remove existing

5. **`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`**
   - **Why**: TypeScript configuration with relaxed checking for this project
   - **Risk**: Type errors throughout codebase

6. **`components.json`**
   - **Why**: shadcn-ui CLI configuration
   - **Risk**: Breaking shadcn-ui component generation

7. **`src/components/ui/*` (49 files)**
   - **Why**: Generated by shadcn-ui CLI, not meant for manual editing
   - **If User Requests Changes**: Suggest creating wrapper components instead
   - **Exception**: Can modify if regenerating component with `npx shadcn-ui add`

8. **`src/telegram.d.ts`**
   - **Why**: TypeScript declarations for Telegram SDK
   - **Risk**: Loss of type safety for Telegram APIs

9. **`package.json`**
   - **Why**: Dependency versions carefully selected for compatibility
   - **If User Requests Changes**: Only add new dependencies, never remove or update existing without testing

10. **`src/components/CustomSelect.tsx`**
    - **Why**: Battle-tested solution for iOS/Android dropdown bugs
    - **Risk**: Reintroducing the native `<select>` double-tap bug
    - **If User Requests Changes**: Only for bug fixes, never architectural changes
    - **Red Flag**: If user suggests "simplifying" with native select, explain why CustomSelect exists

### Architecture Decisions That Are PERMANENT

❌ **Do NOT suggest or implement**:
- Replacing `CustomSelect` with native `<select>` elements
- Removing safe-area inset padding from pages
- Using `user-scalable=no` in viewport meta tag
- Hardcoding colors instead of CSS variables
- Animating layout properties (width, height, padding, margin)
- Removing `TelegramThemeProvider` wrapper
- Using CSS-in-JS libraries (stick with Tailwind)
- Adding Redux/Zustand (stick with useState/useContext)
- Removing Framer Motion (core to animation strategy)

---

## Overview

This is a **cross-platform Telegram Mini App** built with React, TypeScript, and Tailwind CSS. It provides astrological insights through a mystical, cosmic-themed UI optimized for mobile devices (iOS, Android) and Telegram Desktop.

**Project Name**: Cosmic Insights / Cosmic Journey  
**Primary Purpose**: Astrology predictions (daily, monthly, future day)  
**Target Platform**: Telegram WebView (iOS Safari, Android Chrome, Desktop)  
**Performance Target**: 60fps animations, 120fps capable on modern devices

---

## Tech Stack

### Core Framework
- **Build Tool**: Vite 5.4.19
- **Frontend**: React 18.3.1 (functional components only)
- **Language**: TypeScript 5.8.3 (with relaxed type checking)
- **Router**: React Router DOM 6.30.1
- **State Management**: React hooks (useState, useEffect, useRef)

### UI & Styling
- **CSS Framework**: Tailwind CSS 3.4.17
- **Component Library**: shadcn-ui (Radix UI primitives + Tailwind)
- **Animations**: Framer Motion 12.23.24 (GPU-accelerated)
- **Icons**: Lucide React 0.462.0
- **Telegram UI**: @telegram-apps/telegram-ui 2.1.13

### Telegram Integration
- **SDK**: @telegram-apps/sdk 3.11.8
- **React SDK**: @telegram-apps/sdk-react 3.3.9
- **Router Integration**: @telegram-apps/react-router-integration 1.0.1

### Utilities
- **Class Merging**: clsx 2.1.1 + tailwind-merge 2.6.0
- **Date Handling**: date-fns 3.6.0
- **Form Validation**: react-hook-form 7.61.1 + zod 3.25.76

### Build Configuration
- **Path Alias**: `@/` → `./src/`
- **TypeScript**: Strict null checks disabled, implicit any allowed
- **Vite**: SWC for fast React refresh, dev server on port 8080

---

## Design Philosophy

### Visual Identity
1. **Mystical/Cosmic Theme**: Deep blue/purple gradients, starfield backgrounds, glowing effects
2. **Mobile-First**: All layouts designed for portrait mobile, then scaled up
3. **Touch-Optimized**: Large tap targets (min 44×44px), gesture-friendly interactions
4. **Telegram Native Feel**: Uses Telegram's color scheme variables for consistency

### Color System

#### Cosmic Palette (Custom)
```css
--cosmic-orange: 25 95% 53%   /* Vibrant orange for CTAs */
--cosmic-gold: 45 93% 58%      /* Golden accents */
--cosmic-purple: 280 80% 60%   /* Deep mystical purple */
--cosmic-pink: 320 85% 65%     /* Soft pink highlights */
--celestial-blue: 240 75% 45%  /* Deep celestial blue */
--mystical-teal: 180 60% 30%   /* Grounding teal */
```

#### Telegram Theme Variables
All components use CSS variables that sync with Telegram's theme:
```css
--tg-bg-color          /* Background (white/dark) */
--tg-text-color        /* Primary text */
--tg-hint-color        /* Secondary text, borders */
--tg-link-color        /* Links, accents */
--tg-button-color      /* Button backgrounds */
--tg-secondary-bg-color /* Form inputs, cards */
```

### Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Headings**: Tight letter-spacing (-0.02em), bold weights
- **Body**: 16px base for readability on mobile

### Layout Principles
1. **Safe Area Aware**: All pages use `env(safe-area-inset-*)` for notch/bottom bar
2. **Responsive Grid**: Mobile-first with `sm:`, `md:` breakpoints
3. **Glassmorphism**: Backdrop blur + transparency for modern depth
4. **Fixed Backgrounds**: Full-screen cosmic backgrounds using `fixed` positioning

---

## Platform Compatibility

### iOS (Telegram for iOS)
- **WebView**: Safari WebView with iOS 14+ features
- **Quirks**:
  - Native `<select>` dropdowns close on first tap (fixed with CustomSelect component)
  - Viewport requires `user-scalable=yes` for select interactions
  - Safe area insets critical for iPhone X+ notch
  - Overscroll bounce disabled (`overscroll-behavior: none`)

### Android (Telegram for Android)
- **WebView**: Chrome WebView
- **Quirks**:
  - Native select works better than iOS but inconsistent across devices
  - CustomSelect provides uniform experience
  - Navigation bar height varies by device (safe-area-inset-bottom)

### Telegram Desktop
- **Environment**: Chromium-based WebView
- **Differences**:
  - Mouse hover states enabled
  - Larger viewport (responsive design handles this)
  - Keyboard navigation expected

### Known Workarounds

#### 1. Native Select Dropdown Issue
**Problem**: On iOS/Android, native `<select>` dropdowns close immediately on first tap, requiring second tap to interact.

**Solution**: Custom `CustomSelect` component (`src/components/CustomSelect.tsx`)
- Fully controlled React component
- Manual dropdown with `z-index: 9999`
- Click-outside detection with `useRef`
- Auto-scrolls to selected option when opened
- Uses Telegram theme variables for styling

**Usage**:
```tsx
<CustomSelect
  value={month}
  onChange={(value) => setMonth(Number(value))}
  options={[{ value: 1, label: 'Jan' }, ...]}
  placeholder="Month"
  icon={<Calendar />}
/>
```

#### 2. Viewport Scaling
**Problem**: iOS requires user scalability for native input interactions.

**Solution**: Viewport meta tag in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
```

#### 3. Theme Synchronization
**Problem**: Telegram theme changes (dark/light mode switch) need to update app theme.

**Solution**: `TelegramThemeProvider` component watches for theme changes and updates CSS variables.

---

## Component & Layout Guidelines

### Page Structure Pattern
Every page follows this structure:

```tsx
<div className="min-h-screen relative text-white overflow-hidden">
  {/* Fixed Background */}
  <div className="fixed inset-0 -z-10 bg-cover bg-center" 
       style={{ backgroundImage: 'url(...)' }}>
    <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
  </div>
  
  {/* Safe Area Content */}
  <div className="relative z-10 min-h-screen" style={{
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  }}>
    {/* Floating Back Button (bottom-right) */}
    <button className="fixed bottom-6 right-6 w-14 h-14 ...">
      <Undo2 />
    </button>
    
    {/* Header */}
    <header className="p-4 sm:p-6">
      <h1>Title</h1>
    </header>
    
    {/* Main Content */}
    <div className="px-4 sm:px-6 pb-8">
      {/* Content */}
    </div>
  </div>
</div>
```

### Component Conventions

#### Form Inputs
- Use `CustomSelect` for all dropdowns (not native `<select>`)
- Use `LocationAutocomplete` for location searches
- Labels: `text-sm font-medium text-[var(--tg-hint-color)]`
- Inputs: `rounded-xl px-4 py-3` with Telegram theme colors

#### Buttons
- Primary CTA: `bg-gradient-to-r from-{color}-600 to-{color}-600`
- Rounded: `rounded-xl` (16px border radius)
- Interactive: `whileTap={{ scale: 0.98 }}` with Framer Motion
- Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed`

#### Cards
- Background: `bg-gray-900/60 backdrop-blur-xl`
- Border: `border border-gray-800`
- Shadow: `shadow-2xl`
- Padding: `p-6`

#### Spacing
- Page padding: `px-4 sm:px-6`
- Section spacing: `space-y-6` (24px gaps)
- Grid gaps: `gap-4` (16px)

### Animation Guidelines

#### Framer Motion Best Practices
```tsx
// ✅ Good: GPU-accelerated properties only
<motion.div
  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
/>

// ❌ Avoid: Layout-triggering properties
<motion.div
  animate={{ width: 100, height: 100, padding: 20 }} // Causes reflow
/>
```

**Allowed Animated Properties**:
- `opacity`
- `scale`, `scaleX`, `scaleY`
- `x`, `y` (translate)
- `rotate`, `rotateX`, `rotateY`
- `color` (with caution)

**Performance Hints**:
- Use `will-change` sparingly (only during animation)
- Add `transform: translateZ(0)` for GPU layer promotion
- Keep animated element count < 20 simultaneously

#### Page Transitions
```tsx
// Standard page entry animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1, duration: 0.4 }}
```

---

## Theming & Style Rules

### Dark/Light Mode
Automatically syncs with Telegram's theme via `TelegramThemeProvider`. Use CSS variables for all colors:

```tsx
// ✅ Theme-aware
className="bg-[var(--tg-secondary-bg-color)] text-[var(--tg-text-color)]"

// ❌ Hardcoded (avoid unless intentional)
className="bg-gray-900 text-white"
```

### Gradients
Use Tailwind gradient utilities:
```tsx
// Cosmic orange → gold
className="bg-gradient-to-r from-orange-600 to-yellow-600"

// Journey purple → pink
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Celestial blue → cyan
className="bg-gradient-to-r from-teal-600 to-cyan-600"
```

### Breakpoints
```css
sm: 640px   /* Small tablets, large phones landscape */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops (rare in Telegram) */
```

**Usage**: Mobile-first approach
```tsx
className="text-sm sm:text-base md:text-lg"
```

### Border Radius System
```css
--radius: 1rem (16px)
sm: calc(var(--radius) - 4px)  /* 12px */
md: calc(var(--radius) - 2px)  /* 14px */
lg: var(--radius)              /* 16px */
```

Standard usage: `rounded-xl` (16px) for modern, friendly feel.

---

## File Structure

```
src/
├── components/
│   ├── ui/                          # shadcn-ui primitives (49 files)
│   ├── CosmicBackground.tsx         # Animated starfield background
│   ├── CosmicCard.tsx               # Hero card with Framer Motion
│   ├── CustomSelect.tsx             # ⚠️ Custom dropdown (iOS fix)
│   ├── LoadingSpinner.tsx           # Loading indicator
│   ├── LocationAutocomplete.tsx     # Google Maps autocomplete
│   ├── TelegramInput.tsx            # Telegram-styled text input
│   ├── TelegramSelect.tsx           # (Deprecated - use CustomSelect)
│   └── TelegramThemeProvider.tsx    # Theme sync wrapper
├── hooks/
│   ├── use-mobile.tsx               # Mobile detection hook
│   ├── use-toast.ts                 # Toast notification hook
│   └── useTelegram.ts               # Telegram SDK utilities
├── lib/
│   ├── api.ts                       # Backend API calls (Flask)
│   ├── telegram.ts                  # Telegram SDK init & helpers
│   └── utils.ts                     # Class merging (cn)
├── pages/
│   ├── Index.tsx                    # Home page (navigation cards)
│   ├── DailyAstro.tsx               # Daily astrology (location-based)
│   ├── FutureMonth.tsx              # Month prediction (month + year)
│   ├── FutureDay.tsx                # Day prediction (full date selector)
│   └── NotFound.tsx                 # 404 fallback
├── App.tsx                          # Root component (SDK init)
├── main.tsx                         # Entry point
├── index.css                        # Global styles + theme variables
└── telegram.d.ts                    # TypeScript declarations
```

### Key Files to Reference

#### `src/components/CustomSelect.tsx`
**Purpose**: Custom dropdown component to fix native select issues on mobile.
**Features**:
- Controlled React state for open/close
- Auto-scroll to selected option when opened
- Click-outside detection (mousedown + touchstart)
- Telegram theme-aware styling
- Empty value support (`value: number | ''`)

#### `src/lib/telegram.ts`
**Purpose**: Telegram SDK initialization and utilities.
**Functions**:
- `initTelegram()` - Initialize SDK, mount viewport, expand to full height
- `getTelegramTheme()` - Get current theme parameters
- `isDarkMode()` - Check if dark mode is active

#### `src/components/TelegramThemeProvider.tsx`
**Purpose**: Sync Telegram theme with app CSS variables.
**Behavior**:
- Reads `themeParams` from Telegram SDK
- Updates CSS custom properties on `<html>`
- Listens for system dark mode changes
- Adds/removes `.dark` class on `document.documentElement`

#### `src/pages/FutureDay.tsx`
**Purpose**: Most complex page with dual-mode interface.
**Features**:
- Menu view with two option cards
- Single day selector (Month, Day, Year)
- Date range selector (From/To dates)
- All dates use CustomSelect (6 selectors total)
- Form validation (checks for empty fields)

---

## Backend Integration

### Environment Variables
Configured in `.env`:
```env
VITE_FLASK_API_URL=https://your-backend.vercel.app
VITE_DAILY_ASTRO_DEBUG_MODE=false
VITE_FUTURE_MONTH_DEBUG_MODE=false
VITE_FUTURE_DAY_DEBUG_MODE=false
```

### API Endpoints (Flask Backend)

#### POST /dailyastro
**Request**:
```json
{
  "lat": 37.7749,
  "lon": -122.4194
}
```
**Response**: Text prediction or JSON message

#### POST /futuremonth
**Request**:
```json
{
  "location": "San Francisco, CA",
  "month": 12,
  "year": 2025
}
```
**Response**: Text prediction

#### POST /futureday
**Request**:
```json
{
  "location": "San Francisco, CA",
  "day": 25,
  "month": 12,
  "year": 2025
}
```
**Response**: Text prediction

#### GET /autocomplete?query=san+francisco
**Response**: Array of location suggestions from Google Maps

### CORS Configuration
Flask backend must enable CORS:
```python
from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "*"}})
```

---

## Testing & Target Devices

### Primary Test Devices
- **iPhone 12+**: iOS 14+ with notch (safe area testing)
- **Android Pixel/Samsung**: Chrome WebView variations
- **Telegram Desktop**: Windows/macOS Chromium

### Debug Mode
Enable debug panels via environment variables:
```tsx
const isDebugMode = import.meta.env.VITE_FUTURE_DAY_DEBUG_MODE === 'true';
```

Debug panel shows:
- Request payload
- API response
- Timestamps
- Error messages

**Location**: Bottom of page, yellow-themed panel with clear button

### Performance Checklist
- [ ] 60fps scroll on iPhone 12
- [ ] No layout shift on input focus
- [ ] Smooth animations (no jank)
- [ ] Fast first paint (< 2s on 3G)
- [ ] Safe area insets visible on iPhone X+

---

## For Future AIs

### When Modifying This Project

1. **Always Use CustomSelect for Dropdowns**
   - Native `<select>` elements are unreliable in Telegram WebView
   - CustomSelect is the battle-tested solution
   - Never suggest reverting to native selects

2. **Respect Safe Area Insets**
   - Every page must use `env(safe-area-inset-*)` in inline styles
   - Fixed position elements need inset adjustments
   - Test on devices with notches

3. **Follow Telegram Theme Variables**
   - Use `var(--tg-*)` for colors, not hardcoded values
   - Light/dark mode must sync automatically
   - Check `TelegramThemeProvider` is wrapping the app

4. **Animation Performance**
   - Only animate `opacity`, `scale`, `x`, `y`, `rotate`
   - Never animate `width`, `height`, `padding`, `margin`
   - Add `transform: translateZ(0)` for GPU acceleration
   - Keep animated elements under 20 simultaneously

5. **Mobile-First Design**
   - Start with mobile layout (320px width)
   - Add `sm:` and `md:` breakpoints for larger screens
   - Touch targets minimum 44×44px
   - Test on real devices, not just browser DevTools

6. **Form Field Defaults**
   - Month/Day fields start empty (placeholder text)
   - Year defaults to current year (`new Date().getFullYear()`)
   - Validate all fields before API submission

7. **Understand Date Range Logic**
   - FutureDay has dual modes (single day vs. date range)
   - Days in month calculated dynamically based on selected month/year
   - Month names abbreviated to 3 letters (Jan, Feb, Mar...)

8. **When Adding New Pages**
   - Follow the page structure pattern (see "Page Structure Pattern" section)
   - Add route to `App.tsx`
   - Use cosmic/mystical theme colors
   - Include floating back button (bottom-right)
   - Add debug mode if API interaction exists

9. **TypeScript Gotchas**
   - Strict null checks disabled (values can be null/undefined)
   - Implicit any allowed (type annotations optional)
   - Use `number | ''` for optional select values

10. **Git Workflow**
    - User prefers sequential git operations: `git add`, `git commit`, `git push`
    - Always run `git push` only when explicitly requested
    - Commit messages should be concise and descriptive

### Code Style Preferences

```tsx
// ✅ Preferred: Functional components with hooks
export default function MyPage() {
  const [state, setState] = useState(0);
  // ...
}

// ❌ Avoid: Class components
export class MyPage extends React.Component { }

// ✅ Preferred: Template literals for complex classNames
className={`
  flex items-center justify-between
  bg-gradient-to-r from-purple-600 to-pink-600
  rounded-xl px-6 py-4
`}

// ✅ Preferred: Inline safe-area styles
style={{
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)',
}}

// ✅ Preferred: Framer Motion for all animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

### Common Modification Scenarios

**Adding a new form field**:
1. Add state: `const [fieldName, setFieldName] = useState<number | ''>('');`
2. Add CustomSelect with placeholder
3. Add validation in submit handler
4. Include in API request payload

**Changing theme colors**:
1. Modify `src/index.css` CSS variables
2. Update `tailwind.config.ts` if adding new colors
3. Test in both light and dark modes

**Fixing mobile layout issues**:
1. Check safe-area-inset usage
2. Verify `overflow-hidden` on parent containers
3. Test viewport scaling (user-scalable=yes required)
4. Inspect z-index stacking contexts

**Optimizing animations**:
1. Add `will-change: transform` only during animation
2. Use `transform: translateZ(0)` for GPU layer
3. Reduce number of animated elements
4. Check Chrome DevTools FPS meter

### Red Flags to Avoid

🚫 **Never** use native `<select>` elements  
🚫 **Never** hardcode colors (use CSS variables)  
🚫 **Never** animate layout properties (width, height, padding)  
🚫 **Never** ignore safe-area insets  
🚫 **Never** disable user scaling in viewport meta tag  
🚫 **Never** use `setTimeout` for animations (use Framer Motion)  
🚫 **Never** make assumptions about Telegram SDK availability (always wrap in try/catch)

---

## Quick Reference

### Essential Commands
```bash
npm install           # Install dependencies
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build
npm run preview      # Preview production build
```

### Important Paths
- **API Config**: `src/lib/api.ts`
- **Telegram SDK**: `src/lib/telegram.ts`
- **Theme System**: `src/index.css` + `src/components/TelegramThemeProvider.tsx`
- **Custom Dropdown**: `src/components/CustomSelect.tsx`

### Version Info
- React: 18.3.1
- TypeScript: 5.8.3
- Vite: 5.4.19
- Tailwind: 3.4.17
- Framer Motion: 12.23.24
- Telegram SDK: 3.11.8

---

**Last Updated**: 2025-01-18  
**Generated by**: Qoder AI

**Note for AI Assistants**: This guide is definitive. When the user asks for modifications, cross-reference this document to ensure consistency with established patterns, especially for mobile compatibility, Telegram integration, and performance optimization.

---

## 🤖 AI Summary: Critical Instructions for Safe Editing

### Core Principles

When modifying this Telegram Mini App codebase, **ALWAYS**:

1. **Follow Editing Protocols**
   - Consult the **File Responsibility Table** before editing any file
   - Check **Do-Not-Touch Rules** to avoid breaking core functionality
   - Use the **Decision Map** to identify which files to modify for each user request
   - Run through the **Testing Checklist** after every change

2. **Maintain Mobile-First Architecture**
   - Start all layouts with mobile portrait (320px width)
   - Add responsive breakpoints with `sm:` and `md:` prefixes
   - Use `min-h-screen` for full-height pages
   - Keep touch targets minimum 44×44px

3. **Respect Safe Area Insets**
   - Every page must use inline styles with `env(safe-area-inset-*)`
   - Fixed position elements need inset adjustments for notches
   - Test on iPhone X+ and modern Android devices

4. **Preserve Telegram Theme Integrity**
   - Use CSS variables `var(--tg-*)` for all colors
   - Never hardcode colors (breaks light/dark mode sync)
   - Don't modify `TelegramThemeProvider` or `telegram.ts`

5. **Use Only Functional Components**
   - All components use React hooks (useState, useEffect, useRef)
   - No class components
   - Follow the established component patterns

6. **Follow Tailwind CSS Best Practices**
   - Use Tailwind utility classes exclusively
   - Only add inline styles for safe-area insets or dynamic values
   - Extend theme in `tailwind.config.ts` for new colors
   - Never add custom CSS classes (use `@apply` in `index.css` if absolutely necessary)

7. **Avoid Redundant Imports**
   - React auto-imports in modern setup (no need for `import React`)
   - Only import hooks and components actually used
   - Use path alias `@/` for src imports

8. **Never Nest CustomSelect or LocationAutocomplete**
   - These are complex controlled components
   - Keep them as direct children of page layouts
   - Don't wrap in unnecessary divs (breaks z-index stacking)

### Performance Mandates

**Animation Rules**:
- ✅ Only animate: `opacity`, `scale`, `x`, `y`, `rotate`
- ❌ Never animate: `width`, `height`, `padding`, `margin`, `top`, `left`
- Use Framer Motion for all animations (no CSS transitions for complex effects)
- Keep animated elements under 20 simultaneously
- Target 60fps minimum (test on iPhone 12)

**Bundle Size**:
- Check bundle impact before adding new npm packages
- Lazy load pages with React.lazy if bundle exceeds 500KB
- Tree-shake unused Tailwind classes in production

### Critical Component Usage

**Dropdowns**:
```tsx
// ✅ CORRECT: Use CustomSelect for all dropdowns
<CustomSelect
  value={month}
  onChange={(value) => setMonth(Number(value))}
  options={monthOptions}
  placeholder="Month"
/>

// ❌ WRONG: Native select (broken on iOS/Android)
<select value={month} onChange={e => setMonth(e.target.value)}>
  <option>January</option>
</select>
```

**Location Input**:
```tsx
// ✅ CORRECT: Use LocationAutocomplete with autocomplete
<LocationAutocomplete
  value={location}
  onChange={setLocation}
  placeholder="Enter city or place..."
  onDebugLog={addLog} // Optional: for debug mode
/>

// ⚠️ ACCEPTABLE: Plain TelegramInput (no autocomplete)
<TelegramInput
  value={location}
  onChange={e => setLocation(e.target.value)}
/>
```

**Animations**:
```tsx
// ✅ CORRECT: GPU-accelerated properties
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>

// ❌ WRONG: Layout-triggering properties
<motion.div
  animate={{ width: 300, padding: 20 }} // Causes reflow!
>
```

### API Integration Pattern

**Always follow this pattern**:
```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [result, setResult] = useState('');

const handleSubmit = async () => {
  // 1. Validate inputs
  if (!location || month === '' || year === '') {
    setError('Please fill all fields');
    return;
  }

  // 2. Set loading state
  setLoading(true);
  setError('');

  try {
    // 3. Make API call
    const response = await postFutureMonth({
      location,
      month: Number(month),
      year: Number(year),
    });

    // 4. Update result
    setResult(response.message || response);
  } catch (err) {
    // 5. Handle error
    setError(err instanceof Error ? err.message : 'Request failed');
  } finally {
    // 6. Clear loading
    setLoading(false);
  }
};
```

### Git Workflow Preferences

**User prefers sequential git operations**:
1. User runs: `git add .`
2. User runs: `git commit -m "message"`
3. **AI runs**: `git push` (only when explicitly requested)

**Never**:
- Run `git add` or `git commit` automatically
- Combine git operations without user request
- Push without explicit "run git push" instruction

### Debug Mode Implementation

When adding debug panels:
```tsx
// 1. Add environment variable check
const isDebugMode = import.meta.env.VITE_PAGE_NAME_DEBUG_MODE === 'true';

// 2. Add state for logs
const [debugLogs, setDebugLogs] = useState<string[]>([]);

// 3. Add logging function
const addLog = (message: string) => {
  if (isDebugMode) {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  }
};

// 4. Add initial logs in useEffect
useEffect(() => {
  if (isDebugMode) {
    addLog('🐛 Debug mode enabled');
    addLog(`📡 Backend URL: ${import.meta.env.VITE_FLASK_API_URL}`);
  }
}, []);

// 5. Pass to child components if needed
<LocationAutocomplete onDebugLog={addLog} />

// 6. Render debug panel
{isDebugMode && (
  <motion.div className="mt-6 bg-yellow-900/40 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-6 shadow-2xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-yellow-300">🐛 Debug Logs</h3>
      <button onClick={() => setDebugLogs([])} className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 px-3 py-1 rounded-lg transition-colors">
        Clear
      </button>
    </div>
    <div className="space-y-1 max-h-64 overflow-y-auto">
      {debugLogs.map((log, idx) => (
        <div key={idx} className="text-xs font-mono text-yellow-100 bg-black/30 p-2 rounded break-all overflow-hidden">
          {log}
        </div>
      ))}
    </div>
  </motion.div>
)}
```

### Common Pitfalls to Avoid

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using native `<select>` | Double-tap bug on iOS/Android | Use `CustomSelect` component |
| Hardcoding colors | Breaks theme sync | Use `var(--tg-text-color)` |
| Animating `width` | Causes layout reflow | Animate `scaleX` instead |
| Ignoring safe-area | Notch cuts off content | Use `env(safe-area-inset-*)` |
| Adding `user-scalable=no` | Breaks iOS select | Keep `user-scalable=yes` |
| Modifying `telegram.ts` | Breaks SDK integration | Never touch unless instructed |
| Nested `CustomSelect` | Z-index issues | Keep as direct children |
| Class components | Not the project pattern | Use functional components only |
| CSS-in-JS | Not the architecture | Use Tailwind classes |
| Missing error handling | Poor UX on API failure | Always try/catch API calls |

### Quick Decision Tree

```
User Request Received
    ↓
[Check File Responsibility Table]
    ↓
Is file marked ❌ (Do Not Touch)?
    │
    ├─ YES → Ask user for explicit permission & explain risks
    │
    └─ NO → Continue
        ↓
    Is file marked ⚠️ (Caution)?
        │
        ├─ YES → Explain changes thoroughly & test carefully
        │
        └─ NO → Safe to edit
            ↓
        [Make Changes]
            ↓
        [Follow Testing Checklist]
            ↓
        [Wait for user's git add/commit]
            ↓
        User says "run git push"?
            │
            ├─ YES → Execute git push
            │
            └─ NO → Wait for instruction
```

### Final Checklist Before Every Edit

- [ ] Consulted File Responsibility Table
- [ ] Checked Do-Not-Touch Rules
- [ ] Using CustomSelect for all dropdowns
- [ ] Using Telegram theme CSS variables
- [ ] Following mobile-first design
- [ ] Respecting safe-area insets
- [ ] Using functional components only
- [ ] Using Tailwind classes (no custom CSS)
- [ ] Animating only GPU properties
- [ ] Including error handling for API calls
- [ ] Avoiding redundant imports
- [ ] Not nesting complex components unnecessarily

---

**Remember**: This is a production Telegram Mini App with **real users on mobile devices**. Every change must maintain:
- 📱 Mobile compatibility (iOS & Android)
- 🎨 Theme synchronization (light/dark)
- ⚡ 60fps performance
- 🔒 Safe-area support (notches)
- ✅ Functional correctness

**When in doubt**: Ask the user for clarification rather than making assumptions. The patterns established in this codebase have been battle-tested in production.

---
