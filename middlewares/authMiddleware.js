const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const authMiddleware = (req,res,next) => {
    const header_auth = req.headers.authorization;

    //Header existe?
    if (!header_auth) {
        throw new AppError("Token manquant !",401);
    }

    const parts =header_auth.split(" ");

    //Header valide?
    if (parts.length !==2 || parts[0]!== "Bearer") {
        throw new AppError("Token invalide !",401); 
    }

    //Extraire le token
    const token = parts[1];

    //Verifier le token
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("Decoded : ",decoded);

        //Attacher les information de l'utilisateur à la requete
        //pour que le conntroleur sache :La requête actuelle appartient à l'utilisateur 4, qui a le rôle user.
        req.user=decoded;

        next()
        
    } catch (error) {
        throw new AppError("Token invalide ou expiré",401);
        
    }


}


module.exports = authMiddleware
