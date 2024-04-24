// products/src/routes/productRoutes.js
const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")

// GET all products
router.get("/", productController.getProducts)

// POST create a new product
router.post("/", productController.createProduct)

// GET a product by ID
router.get("/:id", productController.getProductById)

// PUT update a product by ID
router.put("/:id", productController.updateProductById)

// DELETE delete a product by ID
router.delete("/:id", productController.deleteProductById)

module.exports = router
