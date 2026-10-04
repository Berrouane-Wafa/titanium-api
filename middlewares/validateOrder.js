const AppError = require('../errors/AppError');

const validateOrder = async (req,res,next) => {
    const items = req.body.items;
    const address = req.body.address;
    const deliveryFee = req.body.delivery_fee;

    if (!Array.isArray(items) || items.length ==0) {
        throw new AppError("items doit etre un tableau non vide",400);
    }

    items.forEach(item => {
            if (!item || !Number.isInteger(item.product_id) || item.product_id <=0) {
                throw new AppError("product_id doit etre un entier positif",400);
            }
            if (!Number.isInteger(item.quantity) || item.quantity <=0) {
                throw new AppError("quantity doit etre un entier positif",400);       
            }
    });


    if (typeof address !== "string" || address.trim().length == 0) {
        throw new AppError("address doit etre une chaine non vide",400);       
    }
    if (typeof deliveryFee !== "number" || !Number.isFinite(deliveryFee) || deliveryFee < 0) {
        throw new AppError("deliveryFee doit etre un entier positif ou nul",400);
    }
    const ids = items.map((item)=>item.product_id);
    const idSet = new Set(ids);

    if (ids.length !== idSet.size) {
        throw new AppError("Un même produit ne doit pas apparaître plusieurs fois dans la commande",400);
        
    }

    next();
}

module.exports = validateOrder