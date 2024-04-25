const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// GET all users
router.get("/", userController.getUsers)

// POST create a new user
router.post("/", userController.createUser)

// GET a user by ID
router.get("/:id", userController.getUserById)

// PUT update a user by ID
router.put("/:id", userController.updateUserById)

// DELETE delete a user by ID
router.delete("/:id", userController.deleteUserById)

module.exports = router
