const AppError = require("../errors/AppError");

const validateProduct = (req, res, next) => {
    const name = req.body.name;
    const price = Number(req.body.price);

    
    //Vérifier que les champ sont disponibles
    if(name === undefined || price === undefined){
        throw new AppError("Champs manquants");
        
    }

    // vérifier name
if (typeof(name)!="string" || name.trim().length < 3) {
    throw new AppError("Le nom doit etre une chaine ayant au moins 3 caractères  ",400);
    
}
    // vérifier price
if (isNaN(price) || price <= 0) {
    throw new AppError("Le prix doit etre un nombre positif  ",400);
}
    // si tout est correct : « La requête peut continuer. »
    next();
};

module.exports = validateProduct;