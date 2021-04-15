import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import RequestError from "./utils/RequestError";
import rootResolver from "./graphql/resolvers/root-resolver";
import rootSchema from "./graphql/schema/root-schema";
import { logger, ErrorHandler } from "./utils/logger";
import { ENV } from "./utils/constants";

const app = express();

app.use(express.json());
app.use(cors());

// Routes to be called when DB Connection was successful.
const loadRoutes = () => {
    app.use("/api/ping", async (_, res) => {
        res.json({
            status: "success",
            message: "Pinged!",
        });
    });

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: rootSchema,
            rootValue: rootResolver,
            graphiql: true,
            customFormatErrorFn(err) {
                throw err;
            },
        }),
    );

    // Unsupported Routes
    app.use(() => {
        throw new RequestError(404, "Cannot find this Route!");
    });
    // Error Handling for any other error
    app.use(ErrorHandler);
};

// Will redirect all routes to this if DB Connection fails
const loadErrorFallback = (internalError: Error) => {
    app.use(() => {
        logger.info("Received req while server crashed");
        throw internalError;
    });
    app.use(ErrorHandler);
};

if (process.env.NODE_ENV !== ENV.TEST) {
    const port = process.env.PORT || process.env.DEV_PORT || 8080;
    app.listen(port, async () => {
        logger.info(`Started server on Port: ${port}`);
        try {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            loadRoutes();
        } catch (err) {
            // Log error, redirect all routes to 500.
            loadErrorFallback(err);
            logger.error(`\nError connecting to DB:\n${err}`);
        }
    });
} else {
    loadRoutes();
}

export default app;
