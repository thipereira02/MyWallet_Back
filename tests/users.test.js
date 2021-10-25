import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import connection from "../src/database.js";

beforeEach(async () => {
    await connection.query(`TRUNCATE TABLE users RESTART IDENTITY;`);
});

afterAll(() => {
    connection.end();
});

const agent = supertest(app);

describe ("POST /signup", () => {
    it ("should return status 201 when data is ok", async () => {
        const body = {
            name: "Test",
			email: "test@email.com",
			password: "123456",
			confirmPassword: "123456"
        }

        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(201);
    });

    it ("should return status 400 when body has any data as invalid", async () => {
        const body = {
            name: "Test",
			email: "test",
			password: "123456",
			confirmPassword: "123456"
        }

        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(400);
    });

    it ("should return status 400 when body is empty", async () => {
        const body = {}

        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(400);
    });

    it ("should return status 409 when email is already registered", async () => {
        const body = {
            name: "Test",
			email: "test@email.com",
			password: "123456",
			confirmPassword: "123456"
        }

        await agent.post("/signup").send(body);
        const result = await agent.post("/signup").send(body);
        expect(result.status).toEqual(409);
    });
});