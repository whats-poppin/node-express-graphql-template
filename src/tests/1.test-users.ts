/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import mocha from "mocha";
import chai from "chai";
import request from "supertest";
import app from "../index";

const { expect } = chai;

// Dummy test case.
describe("Ping server", () => {
    it("should ping and return 200", async () => {
        const res = await request(app).get("/api/ping");
        expect(res.status).to.equal(200);
    });
});
