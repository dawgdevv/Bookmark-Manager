# BM-77 Bookmark Manager

> **Deployment Note**: Backend is deployed on Render free tier. Free tier instances spin down after 15 minutes of inactivity and take 30-60 seconds to wake up on the first request.

A bookmark manager to save, organize, and search your favorite links.

![Screenshot](image.png)

## Setup Instructions

1. Install dependencies:
```bash
npm run install:all
```

2. Start development servers:
```bash
npm run dev
```

3. Access the app:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express + TypeScript
- **Storage**: In-memory JSON file
- **Styling**: Custom CSS (brutalist-industrial theme)
- **Validation**: Zod

## AI Tools Used

- **Opencode** (with kimi k2.5) - Code generation, debugging, and README documentation

## Time Spent

- Initial setup and implementation: ~30 minutes
- Deployment and testing: ~15 minutes
- Total: ~45 minutes

## Assumptions Made

- Single-user application (no authentication)
- In-memory storage is sufficient (data resets on redeploy)
- Modern browsers only (Chrome, Firefox, Safari, Edge)
- Local development on ports 3001 (backend) and 5173 (frontend)

## Features

- Save bookmarks with title, URL, description, and tags
- Search by title, URL, or tags
- Filter by clicking tags
- Create, edit, delete bookmarks
- Responsive dark theme UI

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | List all bookmarks |
| POST | `/api/bookmarks` | Create bookmark |
| PUT | `/api/bookmarks/:id` | Update bookmark |
| DELETE | `/api/bookmarks/:id` | Delete bookmark |

## License

MIT
