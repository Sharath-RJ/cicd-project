// products/test/product.test.js
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../src/index")
const Product = require("../src/models/productModel")

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

afterAll(async () => {
    await Product.deleteMany({})
    await mongoose.connection.close()
})

describe("Product API", () => {
    let productId

    test("POST /api/products - Create a new product", async () => {
        const response = await request(app)
            .post("/api/products")
            .send({ name: "Product 1", price: 10, description: "Test product" })
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("_id")
        productId = response.body._id
    })

    test("GET /api/products - Get all products", async () => {
        const response = await request(app).get("/api/products")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)
    })

    test("GET /api/products/:id - Get product by ID", async () => {
        const response = await request(app).get(`/api/products/${productId}`)
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toBe(productId)
    })

    test("PUT /api/products/:id - Update product by ID", async () => {
        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({
                name: "Updated Product",
                price: 20,
                description: "Updated test product",
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("Updated Product")
    })

    test("DELETE /api/products/:id - Delete product by ID", async () => {
        const response = await request(app).delete(`/api/products/${productId}`)
        expect(response.statusCode).toBe(200)
    })
})
