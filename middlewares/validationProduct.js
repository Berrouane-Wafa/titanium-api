const validateProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;

    
    //Vérifier que les champ sont disponibles
    if(name === undefined || price === undefined){
        return res.status(400).json({
            "message" : "Champs manquants"
        })
    }

    // vérifier name
if (typeof(name)!="string" || name.trim().length < 3) {
    return res.status(400).json({
        message : "Le nom doit etre une chaine ayant au moins 3 caractères  "

    })
}
    // vérifier price
if (typeof(price)!="number" || price <= 0) {
    return res.status(400).json({
        message : "Le prix doit etre un nombre positif  "

    })
}
    // si tout est correct : « La requête peut continuer. »
    next();
};

module.exports = validateProduct;