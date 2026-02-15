# BM-77 Bookmark Manager

A production-grade bookmark manager application featuring a **brutalist-industrial aesthetic** frontend built with React + TypeScript + Vite, and a REST API backend.

![Frontend Preview](frontend-preview.png)

## Design Philosophy

### Aesthetic Direction: Brutalist-Industrial

The frontend embraces a **brutalist-industrial terminal aesthetic** that stands apart from generic web designs:

- **Visual Identity**: Sharp geometry, high-contrast black/yellow color palette, exposed grid structures
- **Typography**: JetBrains Mono monospace font creates a code-terminal feel, perfect for a tool that manages URLs
- **Atmosphere**: Scanlines, noise textures, and corner decorations evoke vintage industrial control panels
- **Interaction**: Glitch animations, hover states with yellow accents, and precise micro-interactions

### Key Design Decisions

1. **Color Palette**: Dominant black (#0a0a0a) with electric yellow (#FFD700) accents - industrial warning colors
2. **Spatial Composition**: Asymmetric layouts with exposed corner decorations and visible borders
3. **Motion**: Glitch effects on the logo, smooth hover transitions, and loading spinners
4. **Details**: All-caps labels, bracket-wrapped text, monospace throughout for data-display aesthetic

## Features

### Frontend
- **Responsive Grid Layout**: Cards adapt from 2-column to 1-column on mobile
- **Real-time Search**: Instant filtering by title, URL, or tags
- **Tag Filtering**: Click any tag to filter; active filter state with clear option
- **Modal Forms**: Create and edit bookmarks with validation
- **Delete Confirmation**: Red-accented warning modal with scanline animation
- **Empty States**: Context-aware messaging with grid decoration
- **Tag Cloud**: Browse all tags with usage counts
- **Error Handling**: Connection errors displayed in warning banners

### Backend Integration
- RESTful API consumption with proper error handling
- Loading states during data fetch
- Proxy configuration for development
- Type-safe API client with TypeScript

## Project Structure

```
bookmark-manager/
├── frontend/              # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.tsx           # Sticky header with clock
│   │   │   ├── FilterBar.tsx        # Search and filter controls
│   │   │   ├── BookmarkCard.tsx     # Individual bookmark display
│   │   │   ├── BookmarkForm.tsx     # Create/edit modal form
│   │   │   ├── DeleteConfirmation.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── api/          # API client
│   │   ├── types/        # TypeScript interfaces
│   │   ├── styles/       # Global CSS variables
│   │   ├── App.tsx       # Main application
│   │   └── main.tsx      # Entry point
│   └── public/
│       └── favicon.svg
├── backend/               # Express + TypeScript API
│   └── src/
│       ├── index.ts      # Express server setup
│       └── routes/
│           └── bookmarks.ts
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 20+ (with npm/pnpm)
- Backend API running on port 3001

### Installation

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

### Development

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
npm run dev:frontend  # Port 5173
npm run dev:backend   # Port 3001
```

### Production Build

```bash
# Build frontend and backend
npm run build

# Start production servers
npm start
```

## API Endpoints

The frontend expects these backend endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/bookmarks` | GET | Get all bookmarks (optional `?tag=` filter) |
| `/bookmarks` | POST | Create new bookmark |
| `/bookmarks/:id` | PUT | Update bookmark |
| `/bookmarks/:id` | DELETE | Delete bookmark |

## Frontend Configuration

### Vite Proxy (Development)

The `vite.config.ts` includes a proxy to forward API requests:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### CSS Variables

Custom properties for consistent theming:

```css
--color-bg: #0a0a0a;
--color-surface: #111111;
--color-accent: #FFD700;
--color-error: #ff3333;
--color-success: #00ff88;
--font-mono: 'JetBrains Mono', monospace;
```

## Component Architecture

### State Management
- React hooks (useState, useEffect, useCallback, useMemo)
- No external state library needed for this scale
- Optimistic UI with loading states

### Key Components

1. **Header**: Sticky navigation with real-time clock, status indicators
2. **FilterBar**: Search input, active filters, bookmark count, add button
3. **BookmarkCard**: Bookmark display with hover effects, edit/delete actions
4. **BookmarkForm**: Modal with validation (URL format, char limits)
5. **DeleteConfirmation**: Red-themed confirmation with warning styling

### Validation Rules

- **URL**: Required, must be valid URL format
- **Title**: Required, max 200 characters
- **Description**: Optional, max 500 characters
- **Tags**: Optional, max 5 tags (comma-separated)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Performance Considerations

- CSS-only animations (no JS animation libraries)
- Memoized filtered lists with useMemo
- Component-level lazy loading ready (React.lazy)
- Optimized images and SVG icons

## Future Improvements

- [ ] Keyboard shortcuts (Ctrl+K for search, Ctrl+N for new)
- [ ] Drag-and-drop bookmark reordering
- [ ] Import/export bookmarks (JSON/HTML)
- [ ] Dark/light theme toggle (currently always dark)
- [ ] Bookmark favicon fetching and display
- [ ] Pagination for large bookmark collections

## License

MIT License - See LICENSE file for details

## Credits

- Fonts: JetBrains Mono, Space Grotesk (Google Fonts)
- Icons: Custom SVG icons
- Built with: React 19, TypeScript 5, Vite 7
