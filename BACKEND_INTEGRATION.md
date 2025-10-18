# Backend Integration Guide

This document explains how to connect the Telegram Mini App frontend to your Flask backend API.

## Environment Setup

1. Create a `.env` file in the project root:
```env
VITE_FLASK_API_URL=https://your-backend-api.vercel.app
```

2. The frontend will automatically use this URL for all API calls.

## API Endpoints Required

Your Flask backend must implement the following endpoints:

### 1. Daily Astro Endpoint

**Endpoint**: `POST /dailyastro`

**Request Body**:
```json
{
  "lat": 37.7749,
  "lon": -122.4194,
  "chat_id": "optional_telegram_chat_id"
}
```

**Response**:
```json
{
  "message": "Your daily cosmic insights text here...",
  "nakshatra": "Rohini",
  "tithi": "Shukla Paksha Navami",
  "yoga": "Vishkumbha",
  "karana": "Bava"
}
```

**Frontend Usage**: Called when user clicks "Get Today's Astro" on Daily Astro page.

---

### 2. Future Month Endpoint

**Endpoint**: `POST /futuremonth`

**Request Body**:
```json
{
  "location": "San Francisco, CA, USA",
  "month": 12,
  "year": 2025,
  "chat_id": "optional_telegram_chat_id"
}
```

**Response**:
```json
{
  "message": "Future month predictions text...",
  "location": "San Francisco, CA, USA",
  "month": 12,
  "year": 2025,
  "insights": [
    "Key cosmic event 1",
    "Key cosmic event 2"
  ]
}
```

**Frontend Usage**: Called when user submits location + month/year on Future Month page.

---

### 3. Future Day Endpoint

**Endpoint**: `POST /futureday`

**Request Body**:
```json
{
  "location": "San Francisco, CA, USA",
  "day": 25,
  "month": 12,
  "year": 2025,
  "chat_id": "optional_telegram_chat_id"
}
```

**Response**:
```json
{
  "message": "Future day predictions text...",
  "location": "San Francisco, CA, USA",
  "date": "2025-12-25",
  "insights": {
    "favorable_time": "10:00 AM - 2:00 PM",
    "avoid_time": "6:00 PM - 8:00 PM",
    "lucky_color": "Blue"
  }
}
```

**Frontend Usage**: Called when user submits location + date on Future Day page.

---

### 4. Location Autocomplete Endpoint

**Endpoint**: `GET /autocomplete?query={search_term}`

**Query Parameters**:
- `query`: User's search input (minimum 3 characters)

**Response**:
```json
{
  "predictions": [
    "San Francisco, CA, USA",
    "San Francisco International Airport, CA, USA",
    "San Francisco Bay, CA, USA"
  ]
}
```

**Frontend Usage**: Called as user types in location input fields (debounced 300ms).

**Important**: This endpoint should use Google Maps Places API on the backend. Do NOT expose API keys to frontend.

---

## CORS Configuration

Your Flask backend must allow CORS requests from your frontend domain:

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# For development
CORS(app, origins=["http://localhost:5173"])

# For production (add your Vercel domain)
CORS(app, origins=[
    "https://your-mini-app.vercel.app",
    "http://localhost:5173"
])
```

---

## Error Handling

The frontend expects consistent error responses:

**Error Response Format**:
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

**HTTP Status Codes**:
- `200`: Success
- `400`: Bad request (missing/invalid parameters)
- `404`: Resource not found
- `500`: Internal server error

**Frontend Error Handling**: All errors are caught and displayed to users in a friendly format.

---

## Testing API Endpoints

### Using cURL

**Daily Astro**:
```bash
curl -X POST https://your-backend-api.vercel.app/dailyastro \
  -H "Content-Type: application/json" \
  -d '{"lat": 37.7749, "lon": -122.4194}'
```

**Future Month**:
```bash
curl -X POST https://your-backend-api.vercel.app/futuremonth \
  -H "Content-Type: application/json" \
  -d '{"location": "San Francisco, CA", "month": 12, "year": 2025}'
```

**Autocomplete**:
```bash
curl https://your-backend-api.vercel.app/autocomplete?query=san+francisco
```

---

## Frontend API Client

The frontend uses `src/lib/api.ts` for all API calls:

```typescript
// Example: How the frontend calls your API
import { postDailyAstro } from '@/lib/api';

const data = await postDailyAstro(37.7749, -122.4194);
console.log(data.message);
```

**Key Functions**:
- `postDailyAstro(lat, lon)`: Daily astro predictions
- `postFutureMonth({ location, month, year })`: Future month predictions
- `postFutureDay({ location, day, month, year })`: Future day predictions
- `searchLocation(query)`: Location autocomplete

---

## Google Maps API Integration

**Backend Implementation Required**:

```python
import googlemaps

gmaps = googlemaps.Client(key='YOUR_GOOGLE_MAPS_API_KEY')

@app.route('/autocomplete')
def autocomplete():
    query = request.args.get('query', '')
    
    if len(query) < 3:
        return jsonify({'predictions': []})
    
    # Call Google Maps Places API
    result = gmaps.places_autocomplete(query)
    
    predictions = [place['description'] for place in result]
    
    return jsonify({'predictions': predictions[:5]})  # Limit to 5 results
```

**Security**: Never expose your Google Maps API key to the frontend. Always proxy requests through your backend.

---

## Vercel Deployment

### Frontend (This Project)

1. Connect GitHub repo to Vercel
2. Add environment variable: `VITE_FLASK_API_URL`
3. Deploy

### Backend (Flask API)

1. Create `vercel.json` in Flask project:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ]
}
```

2. Add environment variable: `GOOGLE_MAPS_API_KEY`
3. Deploy to Vercel

---

## Request Flow

```
User Action (Frontend)
    ↓
Framer Motion Animation (UI Feedback)
    ↓
API Call via fetch (src/lib/api.ts)
    ↓
Flask Backend (Your API)
    ↓
Google Maps API (for autocomplete)
    ↓
Response to Frontend
    ↓
Display Results with Animations
```

---

## Development Tips

1. **Test locally**: Run backend on `localhost:5000` and frontend on `localhost:5173`
2. **Use proxy**: Configure Vite proxy for local development
3. **Check CORS**: Ensure CORS is properly configured
4. **Monitor errors**: Check browser console and network tab
5. **Test on mobile**: Use Telegram's test environment

---

## Troubleshooting

### API not responding
- Check `VITE_FLASK_API_URL` in `.env` file
- Verify backend is deployed and running
- Check CORS configuration
- Inspect network tab in browser DevTools

### Autocomplete not working
- Ensure backend Google Maps API key is valid
- Check query is at least 3 characters
- Verify `/autocomplete` endpoint is working
- Check backend logs for errors

### Location not sending
- Verify user granted location permissions
- Check Telegram SDK is initialized
- Look for errors in browser console
- Test with browser geolocation fallback

---

## Next Steps

1. Deploy your Flask backend to Vercel
2. Update `.env` with production API URL
3. Test all endpoints with production data
4. Deploy frontend to Vercel
5. Configure Telegram Bot with Mini App URL

---

For questions or issues, refer to the main README.md or open a GitHub issue.
