const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoute")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/userDB")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message)
    })


// Routes
app.use("/api/users", userRoutes)

// Server
app.listen(PORT, () => {
    console.log(`User microservice is running on port ${PORT}`)
})
