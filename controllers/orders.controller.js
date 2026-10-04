const asyncHandler = require("../middlewares/asyncHandler");

const AppError = require('../errors/AppError');

const productService = require("../services/product.service");

const orderService = require("../services/orders.service")

const createOrder = asyncHandler(async (req,res) => {
    const items = req.body.items;
    const ids = items.map(item=> item.product_id);
    const userId = req.user.userId;
    const address = req.body.address;
    const deliveryFee = req.body.delivery_fee;

    const results = await productService.getProductsByIds(ids)
    
    
    
    // . Vérifier si aucun produit n'a été trouvé
        if (results.length===0) {
            throw new AppError("Aucun produit trouvé ",404);
        }
        if (results.length !== items.length) {
            throw new AppError("Un ou plusieurs produits sont introuvables ",404);
        }

           
        let subtotal = 0;

        for (const item of items) {

        const product = results.find(
            product => product.id === item.product_id
        );
        if(product === undefined){
            throw new AppError("Produit introuvvable",404);
        }
        
        if (typeof product.price !== "number" || !Number.isFinite(product.price) || product.price <=0) {
                throw new AppError("prix produit invalide",500);
        }
        
        console.log(product.price, typeof product.price);
        // ton calcul ici
        subtotal = subtotal + item.quantity * product.price;

        }


    const total = subtotal + deliveryFee ;




try {
    const db = await orderService.startTransaction();

        const result= await orderService.createOrder(db,userId,deliveryFee,total,address);
        const orderId =result.insertId;
        console.log({orderId});

        for (const item of items) {
        // retrouver le produit
        const product = results.find(product => product.id == item.product_id);

        // appeler orderService.createOrderItem(...)
        const result = await orderService.createOrderItem(db,orderId,item.product_id,item.quantity,product.price);
        console.log({
        "orderId":orderId,
        "prodcutId":item.product_id,
        "quantity" : item.quantity,
        "unit_price":product.price
        });
        const orderItemId = result.insertId;
        console.log({orderItemId});
        }

        await db.commit();
            return res.status(201).json({
        message: "Commande créée avec succès",
        orderId,
        subtotal,
        deliveryFee,
        total
    });
} catch (error) {
    try {
        await db.rollback();
    } catch (rollbackError) {
        console.error("Erreur lors du rollback :", rollbackError);
    }

    throw error;
    
}


   
})

const getOrdersByUserId = asyncHandler(async (req,res) => {
    const userId = req.user.userId;
    const results = await orderService.getOrdersByUserId(userId);

        return res.status(200).json({
            message : "Liste des commandes",
            orders : results});

})

const getOrderById = asyncHandler(async (req,res) => {
    const userId = req.user.userId;
    const id_order=parseInt(req.params.id);
    const result = await orderService.getOrderById(id_order,userId);

    if (result.length === 0) {
        throw new AppError("Aucune commande trouvée",404);
        
    }
    return res.status(200).json({
        message : "order demandé",
        "order_id" : id_order,
        "user_id":userId,
        order : result[0]
    })
})

const getOrderItems = asyncHandler(async (req,res) => {
    const order_id = parseInt(req.params.id);
    const userId = req.user.userId;

    //Vérifier que la commande appartient à l'utisateur
    const order = await orderService.getOrderById(order_id, userId);

    if (order.length === 0) {
        throw new AppError("Commande introuvable", 404);
    }
    
    const results = await orderService.getOrderItems(order_id);

    return res.status(200).json({
        message : "Order Items",
        order_items : results
    })
})
module.exports = {createOrder,getOrdersByUserId,getOrderById,getOrderItems}