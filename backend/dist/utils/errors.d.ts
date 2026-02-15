export declare class ApiError extends Error {
    statusCode: number;
    message: string;
    isOperational: boolean;
    constructor(statusCode: number, message: string, isOperational?: boolean);
}
//# sourceMappingURL=errors.d.ts.map