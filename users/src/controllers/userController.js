const User = require("../models/userModel")

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).send("User deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
}
