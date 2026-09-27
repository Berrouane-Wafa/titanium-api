const express = require("express");

//spécialisée dans les routes des produits.
const router = express.Router();

const db = require("../config/database");

const productController = require("../controllers/product.controller")

const validateProduct = require("../middlewares/validationProduct");
const validateProductUpdate = require("../middlewares/validateProductUpdate");
const validateId = require("../middlewares/validateId");

//GET
router.get('/',productController.getAllProducts)


//GET id
router.get('/:id',validateId,productController.getProductById)


//POST
router.post('/', validateProduct, productController.createProduct);

//PATCH
router.patch('/:id',validateId, validateProductUpdate ,productController.updateProduct)

//DELETE
router.delete('/:id',validateId, productController.deleteProduct );

module.exports = router;
