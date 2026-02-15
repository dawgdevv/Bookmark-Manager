import express from 'express'
import cors from 'cors'
import { InMemoryBookmarkRepository } from './repositories/bookmark.repository.js'
import { BookmarkService } from './services/bookmark.service.js'
import { createBookmarkRouter } from './routes/bookmark.routes.js'
import { errorHandler } from './middleware/error.middleware.js'
import { rateLimit } from './middleware/rateLimit.middleware.js'
import { requestLogger } from './utils/logger.js'
import { seedBookmarks } from './utils/seed.js'

const app = express()
const PORT = process.env.PORT || 3001

// CORS configuration for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://bookmark-manager-tau-two.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(requestLogger)
app.use(rateLimit)

const bookmarkRepository = new InMemoryBookmarkRepository()
bookmarkRepository.seed(seedBookmarks)

const bookmarkService = new BookmarkService(bookmarkRepository)

app.use('/api/bookmarks', createBookmarkRouter(bookmarkService))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
