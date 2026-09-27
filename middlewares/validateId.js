const validateId = (req,res,next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            message : "Id : "+req.params.id+" invalide !"
        })
    }

    //If it's correct
    next();

}

module.exports = validateId;