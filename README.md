# 🎵 Music Streaming App

A modern fullstack music streaming application built with Node.js, Express, and React, powered by the Deezer API.

## ✨ Features

- **Spotify-like UI**: Dark theme with modern design
- **Music Search**: Search for tracks, artists, and albums
- **Audio Player**: 30-second preview playback with controls
- **Trending Music**: Display chart-topping tracks
- **Queue Management**: Add tracks to queue and control playback
- **User Authentication**: Demo login system with HTTP-only cookies
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Saves user preferences like volume settings

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **Axios** for API calls
- **Cookie-parser** for session management
- **Helmet** for security
- **Compression** for performance

### Frontend
- **React.js** (JavaScript only, no TypeScript)
- **React Router** for navigation
- **Context API** for state management
- **Custom hooks** for Deezer API integration

### API
- **Deezer API** for music data

## 📁 Project Structure

```
music-streaming-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── musicController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── musicRoutes.js
│   ├── utils/
│   │   └── deezerService.js
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── build/                    # React build output
├── .env
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git access
   git clone <repository-url>
   cd music-streaming-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will automatically install both backend and frontend dependencies.

3. **Environment setup**
   ```bash
   # The .env file is already configured with default values
   # No additional setup needed for development
   ```

4. **Build the frontend**
   ```bash
   npm run build
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

### Development Mode

For development with hot reload:

```bash
# Terminal 1 - Start backend server
npm run dev

# Terminal 2 - Start frontend development server
cd frontend
npm start
```

## 🔐 Authentication

The app includes a demo authentication system:

- **Username**: `demo`
- **Password**: `demo`

Or use the "Quick Demo Login" button on the login page.

## 🎵 Using the App

1. **Login** with demo credentials
2. **Home Page**: Browse trending music and genres
3. **Search Page**: Search for tracks, artists, or albums
4. **Player Page**: View current track and manage your queue
5. **Audio Player**: Control playback from the bottom player bar

## 📱 Features Overview

### Home Page
- Trending/chart tracks
- Browse music genres
- Quick action cards

### Search Page
- Real-time search with debouncing
- Filter by tracks, artists, or albums
- Popular search suggestions

### Player Page
- Large album artwork display
- Current track information
- Queue management
- Playback statistics

### Audio Player (Bottom Bar)
- Play/pause controls
- Progress bar with seeking
- Volume control
- Previous/next track navigation

## 🔧 API Endpoints

### Music Routes (`/api/music`)
- `GET /search` - Search music
- `GET /track/:id` - Get track details
- `GET /album/:id` - Get album details
- `GET /artist/:id` - Get artist details
- `GET /chart` - Get trending tracks
- `GET /genres` - Get music genres

### Auth Routes (`/api/auth`)
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /session` - Check session status
- `POST /register` - User registration

## 🚀 Deployment

### Deploy to Render

1. **Connect your repository** to Render
2. **Configure build settings**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
3. **Set environment variables**:
   - `NODE_ENV=production`
   - `SESSION_SECRET=your-secure-secret-key`

### Deploy to Heroku

1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set SESSION_SECRET=your-secure-secret-key
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Other Platforms

The app is a standard Node.js application that:
- Serves static React files from the `/build` directory
- Provides API endpoints under `/api`
- Uses environment variables for configuration

## 🛡️ Security Features

- **HTTP-only cookies** for session management
- **Helmet.js** for security headers
- **Input validation** and error handling
- **CORS configuration** for cross-origin requests

## 🎨 Customization

### Styling
- Modify `frontend/src/App.css` for global styles
- Update color variables for theme changes
- Responsive design using CSS Grid and Flexbox

### Adding Features
- **Favorites**: Extend the player context to save favorite tracks
- **Playlists**: Add playlist management functionality
- **User Profiles**: Expand the authentication system
- **Social Features**: Add sharing capabilities

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules frontend/node_modules
   npm install
   ```

2. **Port already in use**
   ```bash
   # Change port in .env file
   PORT=3001
   ```

3. **API errors**
   - Check internet connection
   - Deezer API might be rate-limited
   - Try different search terms

### Development Tips

- Use browser dev tools to debug React components
- Check Network tab for API call failures
- Console logs are available in both frontend and backend

## 📄 License

This project is for educational purposes. Please respect Deezer's API terms of service.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Create an issue in the repository

---

**Enjoy your music! 🎵**