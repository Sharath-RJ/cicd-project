// products/src/controllers/productController.js
const Product = require("../models/productModel")

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send("Product not found")
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Update a product by ID
const updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!product) {
            return res.status(404).send("Product not found")
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).send("Product not found")
        }
        res.status(200).send("Product deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
}
