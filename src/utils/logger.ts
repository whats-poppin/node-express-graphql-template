/* eslint-disable max-len */
import { STATUS_CODES } from "http";
import { NextFunction, Request, Response } from "express";
import Logger from "pino";
import * as fs from "fs";
import { GraphQLError } from "graphql";
import RequestError from "./RequestError";

export const logger = Logger();

// eslint-disable-next-line no-unused-vars
export const ErrorHandler = (error: RequestError | any, req: Request, res: Response, next: NextFunction) => {
    let body = req.body || {};
    if (req.query) body = { ...body, ...req.query };
    // include params in /tracking/<id:string>
    if (req.params) body = { ...body, ...req.params };

    if (req.file) {
        fs.unlink(req.file.path, (err: any) => {
            logger.error(`Error while unlinking file: ${err}`);
        });
    }

    // eslint-disable-next-line no-param-reassign
    if (error instanceof GraphQLError) error = error.originalError as RequestError; // Will it cause problems?

    let code = error.code || error.status || 500;
    if (typeof code !== "number") code = 500;

    // capture type errors
    if (error instanceof TypeError || typeof error.code === "undefined") {
        // TypeErrors are caused by faulty code.
        // It is the responsibility of a dev to fix them
        // Sentry allows us to manage errors and assign them to team members
        // in order to fix/debug them etc.

        // Use Sentry only when working on a big project.
        // Sentry is paid.

        // Sentry.captureException(error, {
        //     extra: {
        //         path: mPath,
        //         params: { ...req.body, ...req.query },
        //     },
        // });
    }
    res.status(code).send({
        code,
        error: error.message || "unknown",
        message: STATUS_CODES[code],
    });
    const method = code >= 400 ? "error" : "info";
    const mPath = `${req.method} ${req.path}`;
    logger[method]({
        path: mPath,
        headers: req.headers,
        body,
        error: error.message,
        trace: error?.stack?.toString(),
        ip: req.ip,
    });
};
