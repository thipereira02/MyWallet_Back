import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import connection from "../src/database.js";

beforeEach(async () => {
    await connection.query(`TRUNCATE TABLE users RESTART IDENTITY;`);
});

afterAll(() => {
    await connection.end();
});