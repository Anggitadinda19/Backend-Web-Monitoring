const request = require("supertest");
const app = require("../app");

describe("Test Endpoint Sederhana", () => {
  it("GET /hello harus mengembalikan Hello World", async () => {
    const res = await request(app).get("/hello");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World");
  });
});
