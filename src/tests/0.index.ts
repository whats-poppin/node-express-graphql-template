/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import mocha from "mocha";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

const mongod = new MongoMemoryServer();

// Setup connection to test-db
before(async () => {
    let uri = "mongodb://127.0.0.1:27017/testdb";

    // If using test MongoDb from GithubAction etc. set env.TEST_MONGO to "true"
    if (!process.env.TEST_MONGO) {
        uri = await mongod.getUri();
    }
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`Connected to TEST-MongoDB at uri: ${uri}`);
    } catch (err) {
        // Log error, redirect all routes to 500.
        console.error(`\nError connecting to TEST-DB:\n${err}`);
    }
});

// Close all connections after executing all tests.
after(async () => {
    console.log("Stopping Tests");
    await mongod.stop();
    await mongoose.disconnect();
});
