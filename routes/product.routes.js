const express = require("express");

//spécialisée dans les routes des produits.
const router = express.Router();

const db = require("../config/database");

const productController = require("../controllers/product.controller")

//GET
router.get('/',productController.getAllProducts)


//GET id
router.get('/:id',productController.getProductById)


//POST
router.post('/', productController.createProduct);

//PATCH
router.patch('/:id',productController.updateProduct)

//DELETE
router.delete('/:id', productController.deleteProduct );

module.exports = router;
