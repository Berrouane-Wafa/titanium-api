const validateProductUpdate = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;

    // 1. Vérifier qu'au moins un champ est fourni

    if(name == undefined && price == undefined){
        return res.status(400).json({
            "message" : "Aucune donnée à modifier"
        })
    }
    // 2. Si name existe, vérifier qu'il est valide

    if (name !== undefined) {
        if(typeof(name) !== "string" || name.trim().length < 3){
            return res.status(400).json({
                "message" : "Le nom est invalide "
            })
        }
        
    }
    // 3. Si price existe, vérifier qu'il est valide

    if (price !== undefined) {
        if (typeof(price) !== "number" || price <=0) {
            return res.status(400).json({
                "message" : " Le prix est invalide"
            })
        }
    }

    // 4. Tout est correct
    next();
};

module.exports = validateProductUpdate;