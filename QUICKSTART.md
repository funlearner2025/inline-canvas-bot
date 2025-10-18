# Quick Start Guide

Get your Telegram Mini App running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

This installs all required packages including:
- `@telegram-apps/telegram-ui` ✅ Installed
- `framer-motion` ✅ Installed
- All other dependencies ✅ Ready

### 2. Create Environment File

Create `.env` in the project root:

```env
VITE_FLASK_API_URL=https://your-backend-api.vercel.app
```

**Note**: Replace with your actual Flask backend URL

### 3. Run Development Server

```bash
npm run dev
```

Opens at: `http://localhost:5173`

### 4. Test in Browser

Visit `http://localhost:5173` and test:
- ✅ Home page loads with cosmic animations
- ✅ Navigate to Daily Astro
- ✅ Navigate to Future Month
- ✅ Navigate to Future Day

---

## 🔧 Backend Setup (Quick)

Your Flask backend needs these endpoints:

### Required Endpoints:

1. **POST /dailyastro**
   ```json
   Request: { "lat": 37.7749, "lon": -122.4194 }
   Response: { "message": "Your daily insights..." }
   ```

2. **POST /futuremonth**
   ```json
   Request: { "location": "San Francisco", "month": 12, "year": 2025 }
   Response: { "message": "Future month insights..." }
   ```

3. **POST /futureday**
   ```json
   Request: { "location": "San Francisco", "day": 25, "month": 12, "year": 2025 }
   Response: { "message": "Future day insights..." }
   ```

4. **GET /autocomplete?query=san**
   ```json
   Response: { "predictions": ["San Francisco, CA", "San Diego, CA"] }
   ```

**Full details**: See `BACKEND_INTEGRATION.md`

---

## 📱 Test in Telegram

### Option 1: Telegram Test Environment
1. Deploy to Vercel (or any host)
2. Open [@BotFather](https://t.me/BotFather)
3. Create Mini App: `/newapp`
4. Enter your deployment URL
5. Test in Telegram app

### Option 2: Local Testing with ngrok
```bash
# In one terminal
npm run dev

# In another terminal
ngrok http 5173
```

Use the ngrok URL in BotFather for testing

---

## ✅ Verify Everything Works

### Frontend Checklist:
- [ ] Dev server runs without errors
- [ ] Home page displays cosmic background
- [ ] All three cards are visible and clickable
- [ ] Navigation works between pages
- [ ] Animations are smooth
- [ ] No console errors

### Backend Checklist:
- [ ] Flask server is running
- [ ] CORS is configured
- [ ] All 4 endpoints respond correctly
- [ ] Google Maps API key is set (for autocomplete)

---

## 🎨 Project Structure Overview

```
src/
├── components/
│   ├── CosmicBackground.tsx      # Animated starfield
│   ├── CosmicCard.tsx            # Animated cards
│   ├── LocationAutocomplete.tsx  # Location search
│   ├── LoadingSpinner.tsx        # Loading indicator
│   └── TelegramThemeProvider.tsx # Theme sync
├── pages/
│   ├── Index.tsx          # Home page
│   ├── DailyAstro.tsx     # Daily insights
│   ├── FutureMonth.tsx    # Future month
│   └── FutureDay.tsx      # Future day
├── lib/
│   ├── api.ts             # Backend API calls
│   └── telegram.ts        # Telegram utilities
└── App.tsx                # Main app with routes
```

---

## 🎯 Key Features Implemented

### 1. **Cosmic UI**
- Animated starfield background
- Gradient cards with hover effects
- Smooth page transitions
- Mobile-optimized animations

### 2. **Location Services**
- Telegram location API
- Browser geolocation fallback
- Google Maps autocomplete
- Error handling

### 3. **Theme Support**
- Auto dark/light mode
- Telegram theme sync
- CSS variable customization

### 4. **Cross-Platform**
- iOS safe areas
- Android navigation bar
- Telegram Desktop responsive
- 60fps and 120fps optimized

---

## 🔥 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Kill process on port 5173
npx kill-port 5173
```

### TypeScript errors in IDE?
1. Restart VS Code
2. Run: `npx tsc --noEmit`
3. Check `tsconfig.json` is valid

### API not responding?
1. Check `.env` file exists
2. Verify `VITE_FLASK_API_URL` is correct
3. Ensure backend CORS allows your domain
4. Check browser console for errors

### Location not working?
1. Enable location in browser/Telegram
2. Check HTTPS (required for geolocation)
3. Allow permissions when prompted

### Animations stuttering?
1. Check Chrome DevTools Performance tab
2. Reduce number of stars in CosmicBackground
3. Disable animations for testing

---

## 📦 What's Included

### ✅ Pages (4)
- Index (Home)
- Daily Astro
- Future Month
- Future Day

### ✅ Components (5)
- CosmicBackground
- CosmicCard
- LocationAutocomplete
- LoadingSpinner
- TelegramThemeProvider

### ✅ Utilities (2)
- API client (lib/api.ts)
- Telegram helpers (lib/telegram.ts)

### ✅ Documentation (4)
- README.md
- BACKEND_INTEGRATION.md
- IMPLEMENTATION_SUMMARY.md
- This Quick Start Guide

---

## 🎉 Ready to Deploy?

### Vercel Deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial Telegram Mini App"
   git push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variable: `VITE_FLASK_API_URL`
   - Deploy!

3. **Configure Telegram Bot**
   - Open [@BotFather](https://t.me/BotFather)
   - `/newapp`
   - Enter your Vercel URL
   - Upload icon and configure

4. **Test in Telegram**
   - Open your bot
   - Click "Open App"
   - Test all features

---

## 💡 Pro Tips

1. **Test on real devices** - Emulators don't show everything
2. **Use Vercel preview deployments** - Test before production
3. **Monitor performance** - Use Lighthouse and Chrome DevTools
4. **Check Telegram logs** - Debug panel shows errors
5. **Version your API** - Use `/v1/` in backend URLs

---

## 📚 Additional Resources

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🤝 Need Help?

1. Check `IMPLEMENTATION_SUMMARY.md` for details
2. Read `BACKEND_INTEGRATION.md` for API setup
3. Review console errors in DevTools
4. Open an issue on GitHub

---

**You're all set! Happy coding! 🚀✨**
