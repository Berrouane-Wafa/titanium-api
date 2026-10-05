const express = require("express");

//spécialisée dans les routes des produits.
const router = express.Router();

const productController = require("../controllers/product.controller")

const validateProduct = require("../middlewares/validationProduct");
const validateProductUpdate = require("../middlewares/validateProductUpdate");
const validateId = require("../middlewares/validateId");

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

const upload = require('../middlewares/uploadImages');
//GET
router.get('/',productController.getAllProducts)


//GET id
router.get('/:id',validateId,productController.getProductById)

router.get("/:id/images",validateId,productController.getProductImages);

//POST
router.post('/',authMiddleware,authorizeRoles("admin"),upload.array("images", 5),validateProduct, productController.createProduct);

//PATCH
router.patch('/:id',validateId, validateProductUpdate ,productController.updateProduct)

//DELETE
router.delete('/:id',authMiddleware,authorizeRoles("admin") ,validateId, productController.deleteProduct );

module.exports = router;
