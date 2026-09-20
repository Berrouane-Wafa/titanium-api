const express = require("express");

//Mini-application spécialisée dans les routes des produits.
const router = express.Router();

const db = require("../config/database");

const productController = require("../controllers/product.controller")
//GET
router.get('/',productController.getAllProducts)


//GET id
router.get('/:id',productController.getProductById)


//POST
router.post('/', productController.createProduct);

//PATCH
router.patch('/:id',(req,res)=>{
    let fields = [];
    let values = [];

    // récupérer et vérifier l'id
    const prod_id = parseInt(req.params.id)

    //CHekch if the id is correct
    if (isNaN(prod_id)) {
        return res.status(400).json({
            "message" : "Id req.params.id invalde"
        })
    }

    // récupérer name et price
    const name = req.body.name
    const price = req.body.price

    // vérifier qu'au moins un des deux est fourni
    if(name == undefined && price == undefined){
        return res.status(400).json({
            "message" : "Aucune donnée à modifier"
        })
    }

    // valider les champs fournis
    //valider le nom
    if (name !== undefined) {
        if(typeof(name) !== "string" || name.trim() === ""){
            return res.status(400).json({
                "message" : "Le nom est invalide "
            })
        }
        
    }
    
    //Valider le prix
    if (price !== undefined) {
        if (typeof(price) !== "number" || price <=0) {
            return res.status(400).json({
                "message" : " Le prix est invalide"
            })
        }
    }

    // UPDATE MySQL
    if (name!==undefined) {
        fields.push("name = ?");
        values.push(name);
    }
    if (price!=undefined) {
        fields.push("price = ?");
        values.push(price);
    }

    values.push(prod_id);
        db.query(
            `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
            values,
            (err, results) => {

                // gérer l'erreur
                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        "message" : "Erreur lors du modification du produit"
                    })
                    
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Produit " + prod_id + " n'existe pas"
                    });
                }
                // retourner results

                   res.status(200).json({
                    "message" : "Produit modifié avec succés",
                    "product" : {
                        "id" :prod_id,
                        "name" : name,
                        "price" : price
                    }
                })
            }
        );
  

})

//DELETE
router.delete('/:id', (req, res) => {

    // 1. récupérer l'id
    const id_prod=parseInt(req.params.id)

    // 2. vérifier que l'id est valide
    if(isNaN(id_prod)){
        return res.status(400).json({
            "message" :"request mal formé",

        })
    }
    // DELETE MySQL
    db.query(
        "DELETE FROM products WHERE id = ?",
        [id_prod],
        (err, results) => {

            // gérer l'erreur
            if (err) {
                console.error(err);

                return res.status(500).json({
                    "message" : "Une erreur lors du suppression du produit"
                })
            }

            // vérifier si le produit existe
            if (results.affectedRows===0) {
                return res.status(404).json({
                    "message" : "produit n'existe pas"
                })
            }

            // retourner 204
            res.status(204).send()
        }
    );
  




    

});

module.exports = router;
