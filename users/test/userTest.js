const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../src/index")
const User = require("../src/models/userModel")

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
})

describe("User API", () => {
    let userId

    test("POST /api/users - Create a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "John Doe", email: "john@example.com" })
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("_id")
        userId = response.body._id
    })

    test("GET /api/users - Get all users", async () => {
        const response = await request(app).get("/api/users")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)
    })

    test("GET /api/users/:id - Get user by ID", async () => {
        const response = await request(app).get(`/api/users/${userId}`)
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toBe(userId)
    })

    test("PUT /api/users/:id - Update user by ID", async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({ name: "Jane Doe", email: "jane@example.com" })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("Jane Doe")
    })

    test("DELETE /api/users/:id - Delete user by ID", async () => {
        const response = await request(app).delete(`/api/users/${userId}`)
        expect(response.statusCode).toBe(200)
    })
})
