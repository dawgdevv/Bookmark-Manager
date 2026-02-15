# BM-77 Bookmark Manager

A production-grade bookmark manager with a **brutalist-industrial themed** React frontend and Express backend.

![Architecture](architecture.png)

## Quick Start

### Option 1: Using the Start Script (Recommended)

```bash
# Make sure dependencies are installed first
npm run install:all

# Start both frontend and backend
./start.sh
```

This will start:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173

### Option 2: Manual Start

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## Project Structure

```
bookmark-manager/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── api/          # API client
│   │   └── styles/       # CSS variables
│   └── package.json
├── backend/               # Express + TypeScript API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Seed data
│   └── package.json
├── start.sh              # Quick start script
├── test-connection.sh    # Connection test
└── package.json          # Root package with scripts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | Get all bookmarks (optional `?tag=` filter) |
| GET | `/api/bookmarks/:id` | Get bookmark by ID |
| POST | `/api/bookmarks` | Create new bookmark |
| PUT | `/api/bookmarks/:id` | Update bookmark |
| DELETE | `/api/bookmarks/:id` | Delete bookmark |
| GET | `/api/health` | Health check |

## Frontend Features

### Design: Brutalist-Industrial
- **Colors**: Black (#0a0a0a) with electric yellow (#FFD700) accents
- **Typography**: JetBrains Mono monospace for terminal aesthetic
- **Effects**: Scanlines, noise textures, glitch animations
- **Layout**: Sharp corners, exposed borders, asymmetric composition

### Functionality
- **Real-time Search**: Filter by title, URL, or tags
- **Tag Filtering**: Click any tag to filter the list
- **Create/Edit**: Modal forms with validation
- **Delete**: Confirmation dialog with warning styling
- **Responsive**: Works on desktop and mobile

## Testing the Connection

After starting both servers:

```bash
# Run the connection test
./test-connection.sh

# Or test manually:
curl http://localhost:3001/api/health
curl http://localhost:3001/api/bookmarks
```

## Development

### Available Scripts

Root level:
```bash
npm run install:all     # Install all dependencies
npm run dev             # Start both services
npm run dev:frontend    # Start frontend only
npm run dev:backend     # Start backend only
npm run build           # Build both services
npm start               # Start production mode
```

### Environment Variables

Backend (`.env` in `/backend`):
```env
PORT=3001
```

Frontend (proxy configured in `vite.config.ts`):
- API requests to `/api/*` are proxied to `http://localhost:3001`

## Troubleshooting

### Port Already in Use

```bash
# Kill processes on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill processes on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Or use the start script which handles this automatically
./start.sh
```

### CORS Issues

The backend is configured to accept requests from:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

If you're accessing from a different origin, update `backend/src/index.ts`:
```typescript
app.use(cors({
  origin: ['http://your-origin:port'],
  credentials: true
}))
```

### API Response Format

Backend returns:
```json
{
  "success": true,
  "data": { ... }
}
```

Frontend API client automatically extracts the `data` field.

## Design Choices

### Frontend
- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **CSS Variables** for consistent theming
- **No external CSS framework** - custom brutalist design
- **CSS-only animations** for performance

### Backend
- **Express** with TypeScript
- **In-memory storage** (no database setup required)
- **Zod** for validation
- **UUID** for unique IDs
- **5 seed bookmarks** included

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## License

MIT License
