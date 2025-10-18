# Telegram Mini App - Cosmic Insights

A beautiful, cross-platform Telegram Mini App built with React, TypeScript, Tailwind CSS, and Framer Motion. Provides cosmic and astrological insights with stunning animations optimized for mobile devices.

## 🌟 Features

- **Daily Astro**: Get personalized cosmic insights based on your location
- **Future Month**: Explore cosmic predictions for any month ahead
- **Future Day**: Plan your perfect day with celestial guidance
- **Cross-Platform**: Optimized for iOS, Android, and Telegram Desktop
- **Smooth Animations**: GPU-accelerated Framer Motion animations (60fps & 120fps)
- **Theme Sync**: Automatic dark/light mode sync with Telegram
- **Safe Area Support**: Proper handling of notch and bottom bar on mobile devices
- **Location Services**: Seamless integration with Telegram location API

## 🛠️ Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **UI Components**: shadcn-ui (Radix UI + Tailwind CSS)
- **Animations**: Framer Motion
- **Telegram Integration**: @telegram-apps/sdk & @telegram-apps/telegram-ui
- **Styling**: Tailwind CSS with custom cosmic theme
- **Backend**: Flask API (configured via environment variable)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd inline-canvas-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_FLASK_API_URL=https://your-backend-api.com
```

4. **Run development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variable: `VITE_FLASK_API_URL`
3. Deploy!

### Other Platforms

Build the project and deploy the `dist` folder to any static hosting service.

## 📱 Telegram Bot Setup

1. Create a bot using [@BotFather](https://t.me/BotFather)
2. Set up Mini App:
   - `/newapp` in BotFather
   - Enter your deployed URL
   - Upload app icon and configure settings

## 🎨 UI Components

### Pages
- **Index**: Home page with navigation cards
- **DailyAstro**: Location-based daily insights
- **FutureMonth**: Month selection with location autocomplete
- **FutureDay**: Date selection with location autocomplete
- **DailyPanchangam**: Traditional Panchangam view

### Reusable Components
- **CosmicBackground**: Animated starfield background
- **CosmicCard**: Interactive card with Framer Motion
- **LocationAutocomplete**: Smart location search with Google Maps API
- **TelegramThemeProvider**: Theme synchronization

## 🔌 Backend API Endpoints

Your Flask backend should provide these endpoints:

### POST /dailyastro
```json
{
  "lat": 37.7749,
  "lon": -122.4194
}
```

### POST /futuremonth
```json
{
  "location": "San Francisco, CA",
  "month": 12,
  "year": 2025
}
```

### POST /futureday
```json
{
  "location": "San Francisco, CA",
  "day": 25,
  "month": 12,
  "year": 2025
}
```

### GET /autocomplete?query=san+francisco
Returns location suggestions from Google Maps API

## 🎯 Performance Optimizations

### Animations
- GPU-accelerated transforms only (translate, scale, opacity)
- No layout thrashing or box-shadow animations
- Optimized for 60fps and 120fps displays
- Uses `will-change` for performance hints

### Mobile Optimization
- Safe area insets for notch and bottom bar
- Responsive design (mobile-first)
- Optimized bundle size
- Lazy loading for routes

### Cross-Platform
- Works on iOS Safari (Telegram)
- Works on Android Chrome (Telegram)
- Works on Telegram Desktop
- Fallback geolocation if Telegram location unavailable

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn-ui components
│   ├── CosmicBackground.tsx
│   ├── CosmicCard.tsx
│   ├── LocationAutocomplete.tsx
│   └── TelegramThemeProvider.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useTelegram.ts
├── lib/
│   ├── api.ts          # Backend API calls
│   ├── telegram.ts     # Telegram SDK utilities
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   ├── DailyAstro.tsx
│   ├── FutureMonth.tsx
│   ├── FutureDay.tsx
│   ├── DailyPanchangam.tsx
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Customization

### Colors
Edit `src/index.css` to customize cosmic theme colors:
```css
--cosmic-orange: 25 95% 53%;
--cosmic-purple: 280 80% 60%;
--celestial-blue: 240 75% 45%;
```

### Animations
Modify Framer Motion animations in components:
```tsx
<motion.div
  animate={{ ... }}
  transition={{ duration: 0.3 }}
/>
```

### Tailwind Config
Extend `tailwind.config.ts` for additional utilities.

## 🐛 Troubleshooting

### Location not working
- Enable location permissions in Telegram settings
- Check browser location permissions as fallback
- Verify Telegram SDK initialization

### Theme not syncing
- Ensure TelegramThemeProvider wraps your app
- Check Telegram SDK is properly initialized
- Verify theme CSS variables in index.css

### Animations stuttering
- Check GPU acceleration is enabled
- Reduce number of animated elements
- Use `will-change` sparingly

## 📝 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
