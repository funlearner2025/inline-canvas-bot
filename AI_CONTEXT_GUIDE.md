# AI Context Guide for Telegram Mini App

> **For AI Assistants**: This document provides a complete technical blueprint of this Telegram Mini App project. Use this as your primary reference when analyzing, modifying, or extending the codebase.

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
