import { Router } from 'express';
import { validateCreateBookmark, validateUpdateBookmark } from '../middleware/validation.middleware.js';
export function createBookmarkRouter(bookmarkService) {
    const router = Router();
    router.get('/', async (req, res, next) => {
        try {
            const filters = {};
            if (req.query.tag && typeof req.query.tag === 'string') {
                filters.tag = req.query.tag;
            }
            if (req.query.search && typeof req.query.search === 'string') {
                filters.search = req.query.search;
            }
            const bookmarks = await bookmarkService.getAllBookmarks(filters);
            res.json({ success: true, data: bookmarks });
        }
        catch (error) {
            next(error);
        }
    });
    router.get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const bookmark = await bookmarkService.getBookmarkById(id);
            res.json({ success: true, data: bookmark });
        }
        catch (error) {
            next(error);
        }
    });
    router.post('/', validateCreateBookmark, async (req, res, next) => {
        try {
            const bookmark = await bookmarkService.createBookmark(req.body);
            res.status(201).json({ success: true, data: bookmark });
        }
        catch (error) {
            next(error);
        }
    });
    router.put('/:id', validateUpdateBookmark, async (req, res, next) => {
        try {
            const id = req.params.id;
            const bookmark = await bookmarkService.updateBookmark(id, req.body);
            res.json({ success: true, data: bookmark });
        }
        catch (error) {
            next(error);
        }
    });
    router.delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            await bookmarkService.deleteBookmark(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
    return router;
}
//# sourceMappingURL=bookmark.routes.js.map