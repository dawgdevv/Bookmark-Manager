# BM-77 Bookmark Manager

> **Deployment Note**: Backend is deployed on Render free tier. Free tier instances spin down after 15 minutes of inactivity and take 30-60 seconds to wake up on the first request.

A bookmark manager to save, organize, and search your favorite links.

![Screenshot](image.png)

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express + TypeScript
- **Storage**: In-memory (JSON file)
- **Styling**: Custom CSS (brutalist-industrial theme)

## Features

- Save bookmarks with title, URL, description, and tags
- Search by title, URL, or tags
- Filter by clicking tags
- Create, edit, delete bookmarks
- Responsive dark theme UI

## Quick Start

```bash
npm run install:all
npm run dev
```

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | List all bookmarks |
| POST | `/api/bookmarks` | Create bookmark |
| PUT | `/api/bookmarks/:id` | Update bookmark |
| DELETE | `/api/bookmarks/:id` | Delete bookmark |

## License

MIT
