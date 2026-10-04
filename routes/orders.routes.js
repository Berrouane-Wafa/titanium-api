const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orders.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');
const validateOrder = require("../middlewares/validateOrder");
const validateId = require('../middlewares/validateId');

router.post('/',authMiddleware, authorizeRoles("user"), validateOrder,orderController.createOrder);

router.get('/',authMiddleware, authorizeRoles("user"), orderController.getOrdersByUserId)

router.get("/:id/items",authMiddleware,authorizeRoles("user"),validateId,orderController.getOrderItems
);
router.get('/:id',authMiddleware, authorizeRoles("user"), validateId,orderController.getOrderById)

module.exports = router;
