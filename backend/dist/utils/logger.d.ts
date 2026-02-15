import type { Request, Response, NextFunction } from 'express';
export interface LogContext {
    requestId?: string;
    userId?: string;
    method?: string;
    path?: string;
    statusCode?: number;
    duration?: number;
    [key: string]: unknown;
}
declare class Logger {
    private formatEntry;
    log(level: 'info' | 'warn' | 'error', message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, error: Error, context?: LogContext): void;
}
export declare const logger: Logger;
export declare function requestLogger(req: Request, res: Response, next: NextFunction): void;
export {};
//# sourceMappingURL=logger.d.ts.map