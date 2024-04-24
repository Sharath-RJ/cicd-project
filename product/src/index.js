// products/src/index.js
const express = require("express")
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoute")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/productsDB")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message)
    })

// Routes
app.use("/api/products", productRoutes)

// Server
app.listen(PORT, () => {
    console.log(`Product microservice is running on port ${PORT}`)
})
