import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const createBookmarkSchema: z.ZodObject<{
    url: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    url: string;
    title: string;
    description?: string | undefined;
    tags?: string[] | undefined;
}, {
    url: string;
    title: string;
    description?: string | undefined;
    tags?: string[] | undefined;
}>;
export declare const updateBookmarkSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
}, {
    url?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    tags?: string[] | undefined;
}>;
export declare function validateCreateBookmark(req: Request, _res: Response, next: NextFunction): void;
export declare function validateUpdateBookmark(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=validation.middleware.d.ts.map