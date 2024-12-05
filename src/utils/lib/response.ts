import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

export interface ISuccessResponse {
    success: true;
    message: string;
    payload: {
        [key: string]: any;
    };
}

export interface IErrorResponse {
    success: false;
    error: {
        type: string;
        code: number;
        message: string;
    };
}

/**
 * HTTP success response
 * @param res The response object
 * @param message The success message
 * @param payload The payload (default: empty object)
 * @param statusCode HTTP status code (default: 200)
 * @returns Response<ISuccessResponse>
 */
export const successResponse = (
    res: Response,
    message: string,
    payload?: any,
    statusCode: number = 200
): Response<ISuccessResponse> => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload,
    });
};

/**
 * HTTP error response
 * @param res The response object
 * @param message The error message (string or Error object)
 * @param statusCode HTTP status code
 * @returns Response<IErrorResponse>
 */
export const errorResponse = (
    res: Response,
    message: string | Error,
    statusCode: number
): Response<IErrorResponse> => {
    const reason = getReasonPhrase(statusCode);
    return res.status(statusCode).json({
        success: false,
        error: {
            type: reason,
            code: statusCode,
            message
        },
    });
};

