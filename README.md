# hyprclub-backend
- A very modern backend service

## Info

- If using test MongoDb from Github Actions etc. set env.TEST_MONGO to "true". Otherwise Mocha will set up an in-memory mongodb on server start.
- Backend uses Express v4 with the `express-async-errors` library to wrap routes inside `next(err)` if an error is thrown. This will become obsolete once Express v5 is released and will be done by express itself and so the library may cause problems. So remove `express-async-errors` if upgrading to Express v5.
- Backend uses sophisticated logging which the team is very proud of.
- Set env.NODE_ENV to "PROD" when push to production. (As of now, `DEV`, `PROD` and undefined dont make a difference, NODE_ENV is set to `TEST` when running mocha tests)