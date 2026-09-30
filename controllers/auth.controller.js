const  authService= require('../services/auth.service');

const asyncHandler = require('../middlewares/asyncHandler');

const AppError = require('../errors/AppError');

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req,res) => {
    const name = req.body.name;
    const email =req.body.email;
    const password = req.body.password;

    console.log("Name : "+name);
    console.log("Email : "+email);
    console.log("Password : "+password);

    const result = await authService.findUserByEmail(email.trim());

    if (result.length > 0) {
        throw new AppError("Email déja utilisé",409);  
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result2 = await authService.createUser(name.trim(),email.trim(),passwordHash)


    res.status(201).json({
        message : "User register succesfully",
        user : {
            "id" :result2.insertId,
            name : name,
            email: email
        }
    })

    
})

const login = asyncHandler(async (req,res) => {
    const email =req.body.email;
    const password = req.body.password;

    const result = await authService.findUserByEmail(email.trim());

    if (result.length === 0) {
        throw new AppError("Email ou mot de passe incorrect",401);  
    }

    const isValide = await bcrypt.compare(password,result[0].password);

    if (!isValide) {
        throw new AppError("Email ou mot de passe incorrect",401);
    }

    const token = jwt.sign(
        {
            userId : result[0].id,
            role : result[0].role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRES_IN
        }

    );
    res.status(200).json({
        "message": "Connexion réussie",
        "token": token
    });
}

);

module.exports = {register,login}