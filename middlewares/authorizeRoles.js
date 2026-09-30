const AppError = require("../errors/AppError");

const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        // vérifier le rôle
        if (!allowedRoles.includes(req.user.role)) {
            // si rôle non autorisé → 403
             throw new AppError("Unauthorized",403);
        }
        // sinon → next()
        next()
    };

};

module.exports = authorizeRoles;