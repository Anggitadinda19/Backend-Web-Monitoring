const request = require("supertest");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Import route login
const loginRouter = require("../../routes/web/User"); // sesuaikan path
app.use("/api", loginRouter);

// Setup test database (bisa pakai test DB atau in-memory MongoDB)
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("POST /api/loginweb", () => {
  beforeAll(async () => {
    // Tambah user dummy untuk testing valid login
    const User = require("src/routers/web/User");
    await User.create({
      username: "user1",
      password: "1234", // bakal di-hash sesuai pre-save hook
      nama: "User Test",
      idClient: "client1",
      perusahaan: "Perusahaan A",
      role: "user",
      menu: ["dashboard"],
    });
  });

  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/api/loginweb").send({
      username: "Dinda",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.username).toBe("user1");
  });

  it("should fail login with invalid password", async () => {
    const res = await request(app).post("/api/loginweb").send({
      username: "user1",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Username atau Password anda salah");
  });

  it("should fail login with non-existing user", async () => {
    const res = await request(app).post("/api/loginweb").send({
      username: "notexist",
      password: "1234",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Username atau Password anda salah");
  });
});
