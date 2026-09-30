const AppError = require('../errors/AppError');
const validateRegister =  (req,res,next) => {
    const name =req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name == undefined || email == undefined || password== undefined) {
        throw new AppError("Les identifiants sont obligatoires",400);
    }

    if (typeof(name)!== "string" || name.trim().length <3) {
        throw new AppError("Le nom doit etre une chaine de 3 caractères ou plus",400);
    }

    if (typeof password !== "string" || password.length < 6) {
        throw new AppError("Le mot de passe soit contenir au moins 6 caracters",400);
    }

    // Validate format d'email 
    if (!emailRegex.test(email.trim())) {
        throw new AppError("Format d'Email invalide !",400);
        
    }
    // tout est correct
    next()
}

module.exports = validateRegister;