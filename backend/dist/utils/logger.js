class Logger {
    formatEntry(level, message, context) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...context
        };
        return JSON.stringify(entry);
    }
    log(level, message, context) {
        console.log(this.formatEntry(level, message, context));
    }
    info(message, context) {
        this.log('info', message, context);
    }
    warn(message, context) {
        this.log('warn', message, context);
    }
    error(message, error, context) {
        this.log('error', message, {
            ...context,
            error: error.message,
            stack: error.stack
        });
    }
}
export const logger = new Logger();
export function requestLogger(req, res, next) {
    const start = Date.now();
    const requestId = crypto.randomUUID();
    req.requestId = requestId;
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info('Request completed', {
            requestId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration,
            ip: req.ip || req.socket.remoteAddress
        });
    });
    next();
}
//# sourceMappingURL=logger.js.map